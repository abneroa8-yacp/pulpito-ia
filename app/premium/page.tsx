"use client";

import Link from "next/link";
import { Check, Crown } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function PremiumPage() {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

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
        throw new Error("Stripe failed to load");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert(t.paymentError);
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
            {t.premiumTitle}
          </h1>

          <p className="text-slate-400 mt-5 text-lg max-w-2xl mx-auto">
            {t.premiumSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* FREE */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

            <h2 className="text-3xl font-bold mb-3">
              {t.freePlan}
            </h2>

            <p className="text-slate-400 mb-8">
              {t.freeDescription}
            </p>

            <div className="text-5xl font-bold mb-10">
              $0
              <span className="text-xl text-slate-400">
                {t.perMonth}
              </span>
            </div>

            <div className="space-y-5">

              <Feature text={t.twoPerDay} />

              <Feature text={t.fourPerWeek} />

              <Feature text={t.sevenPerMonth} />

              <Feature text={t.allAITools} />

            </div>

          </div>

          {/* PREMIUM */}

          <div className="rounded-3xl border-2 border-green-500 bg-slate-900 p-10 relative overflow-hidden">

            <div className="absolute top-5 right-5 bg-green-500 text-black px-4 py-1 rounded-full text-sm font-bold">
              {t.mostPopular}
            </div>

            <h2 className="text-3xl font-bold mb-3 flex items-center gap-2">
              <Crown className="text-green-400" />
              Premium
            </h2>

            <p className="text-slate-400 mb-8">
              {t.premiumDescription}
            </p>

            <div className="text-5xl font-bold mb-10">
              $129
              <span className="text-xl text-slate-400">
                MXN {t.perMonth}
              </span>
            </div>

            <div className="space-y-5">

              <Feature text={t.unlimited} />

              <Feature text={t.allAITools} />

              <Feature text={t.personalLibrary} />

              <Feature text={t.priorityAccess} />
              <Feature text={t.earlyAccess} />

              <Feature text={t.prioritySupport} />

            </div>

            <button
              onClick={checkout}
              disabled={loading}
              className="mt-12 w-full rounded-2xl bg-green-500 hover:bg-green-600 transition py-4 text-xl font-bold text-black disabled:opacity-60"
            >
              {loading
                ? t.connecting
                : t.upgradePremium}
            </button>

          </div>

        </div>

        <div className="text-center mt-12">

          <Link
            href="/dashboard"
            className="text-green-400 hover:text-green-300"
          >
            {t.backDashboard}
          </Link>

        </div>

      </div>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <Check className="text-green-400" size={20} />
      <span>{text}</span>
    </div>
  );
}