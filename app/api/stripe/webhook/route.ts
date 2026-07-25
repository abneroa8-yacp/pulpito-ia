import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Firma no encontrada." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook inválido:", err);

    return NextResponse.json(
      { error: "Webhook inválido." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.client_reference_id;

      if (!userId) break;

      await supabase
        .from("profiles")
        .update({
          plan: "premium",
          stripe_customer_id: session.customer?.toString() ?? null,
          stripe_subscription_id: session.subscription?.toString() ?? null,
        })
        .eq("id", userId);

      console.log("Usuario actualizado a Premium:", userId);

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      await supabase
        .from("profiles")
        .update({
          plan: "free",
          stripe_subscription_id: null,
        })
        .eq("stripe_subscription_id", subscription.id);

      console.log("Suscripción cancelada:", subscription.id);

      break;
    }

    default:
      console.log("Evento recibido:", event.type);
  }

  return NextResponse.json({
    received: true,
  });
}