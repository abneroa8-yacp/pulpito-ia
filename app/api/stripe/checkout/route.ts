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
        {
          error: "No autorizado",
        },
        {
          status: 401,
        }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      client_reference_id: user.id,

      customer_email: user.email ?? undefined,

      payment_method_types: ["card"],

      payment_method_collection: "always",

      phone_number_collection: {
        enabled: false,
      },

      line_items: [
        {
          price: process.env.STRIPE_PRICE_MXN!,
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/premium?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/premium?canceled=true`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo crear la sesión de pago.",
      },
      {
        status: 500,
      }
    );
  }
}