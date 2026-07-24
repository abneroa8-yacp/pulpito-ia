import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

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