import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const customers = await stripe.customers.list({
      email: user.email!,
      limit: 1,
    });

    if (!customers.data.length) {
      return NextResponse.json(
        {
          error: `No se encontró un cliente de Stripe con el correo ${user.email}`,
        },
        {
          status: 404,
        }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/configuracion`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error desconocido al abrir el portal de Stripe.",
      },
      {
        status: 500,
      }
    );
  }
}