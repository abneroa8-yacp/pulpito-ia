"use client";

import Link from "next/link";
import { Check, Crown } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

export default function PremiumPage() {
  const [loading, setLoading] = useState(false);

async function checkout() {
  try {
    setLoading(true);

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    if (!stripe) {
      throw new Error("Stripe no pudo cargarse");
    }

   window.location.href = data.url;

  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al iniciar el pago.");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full">

        <div className="text-center mb-14">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500/20 p-5 rounded-full">
              <Crown className="text-green-400" size={42} />
            </div>
          </div>

          <h1 className="text-5xl font-bold">
            Púlpito IA Premium
          </h1>

          <p className="text-slate-400 mt-5 text-lg max-w-2xl mx-auto">
            Desbloquea todo el potencial de Púlpito IA con generaciones
            ilimitadas y acceso prioritario a las nuevas funciones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* FREE */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

            <h2 className="text-3xl font-bold mb-3">
              Free
            </h2>

            <p className="text-slate-400 mb-8">
              Ideal para comenzar.
            </p>

            <div className="text-5xl font-bold mb-10">
              $0
              <span className="text-xl text-slate-400">
                /mes
              </span>
            </div>

            <div className="space-y-5">

              <Feature text="2 generaciones por día" />

              <Feature text="9 generaciones por mes" />

              <Feature text="Todas las herramientas disponibles" />

              <Feature text="Biblioteca personal" />

            </div>

          </div>

          {/* PREMIUM */}

          <div className="rounded-3xl border-2 border-green-500 bg-slate-900 p-10 relative overflow-hidden">

            <div className="absolute top-5 right-5 bg-green-500 text-black px-4 py-1 rounded-full text-sm font-bold">
              MÁS POPULAR
            </div>

            <h2 className="text-3xl font-bold mb-3 flex items-center gap-2">
              <Crown className="text-green-400" />
              Premium
            </h2>

            <p className="text-slate-400 mb-8">
              Para pastores, maestros y líderes que usan Púlpito IA todos los días.
            </p>

            <div className="text-5xl font-bold mb-10">
              $129
              <span className="text-xl text-slate-400">
                MXN / mes
              </span>
            </div>

            <div className="space-y-5">

              <Feature text="Generaciones ilimitadas" />

              <Feature text="Todas las herramientas IA" />

              <Feature text="Acceso prioritario" />

              <Feature text="Nuevas funciones antes que nadie" />

              <Feature text="Soporte prioritario" />

            </div>

            <button
  onClick={checkout}
  disabled={loading}
  className="mt-12 w-full rounded-2xl bg-green-500 hover:bg-green-600 transition py-4 text-xl font-bold text-black disabled:opacity-60"
>
  {loading ? "Conectando..." : "🚀 Actualizar a Premium"}
</button>

          </div>

        </div>

        <div className="text-center mt-12">

          <Link
            href="/dashboard"
            className="text-green-400 hover:text-green-300"
          >
            ← Volver al panel
          </Link>

        </div>

      </div>
    </div>
  );
}

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Check className="text-green-400" size={20} />
      <span>{text}</span>
    </div>
  );
}