"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "@/components/auth/LanguageSelector";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center">

      <LanguageSelector />

      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <h1 className="text-3xl font-bold text-white">
          {t.login}
        </h1>

        <p className="text-slate-400 mt-2 mb-8">
  {t.loginWelcome}
</p>

        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder={t.email}
          className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white mb-4"
        />

        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder={t.password}
          className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white mb-6"
        />
<div className="mb-6 text-right">
  <Link
    href="/forgot-password"
    className="text-sm text-green-400 hover:text-green-300"
  >
    {t.forgotPassword}
  </Link>
</div>
        <button
          onClick={login}
          disabled={loading}
          className="w-full rounded-xl bg-green-600 hover:bg-green-700 p-4 font-bold text-white"
        >
          {loading ? (t.loadingLogin ?? "Entrando...") : t.login}
        </button>

        <div className="mt-6 text-center text-slate-400">

  {t.dontHaveAccount}

  <Link
    href="/register"
    className="ml-2 text-green-400 hover:text-green-300"
  >
    {t.createAccount}
  </Link>

</div>

      </div>

    </div>
  );
}