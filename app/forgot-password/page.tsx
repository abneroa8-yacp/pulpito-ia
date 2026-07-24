"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "@/components/auth/LanguageSelector";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function resetPassword() {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(t.recoveryEmailSent);
  }

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center">

      <LanguageSelector />

      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <h1 className="text-3xl font-bold text-white">
          {t.resetPassword}
        </h1>

        <p className="text-slate-400 mt-2 mb-8">
          {t.sendRecoveryEmail}
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.email}
          className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white mb-6"
        />

        <button
          onClick={resetPassword}
          disabled={loading}
          className="w-full rounded-xl bg-green-600 hover:bg-green-700 p-4 font-bold text-white"
        >
          {loading ? "..." : t.sendRecoveryEmail}
        </button>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-green-400 hover:text-green-300"
          >
            {t.backToLogin}
          </Link>
        </div>

      </div>
    </div>
  );
}