"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "@/components/auth/LanguageSelector";

export default function RegisterPage() {
  const supabase = createClient();
  const router = useRouter();

  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }
if (data.user) {
  await supabase.from("profiles").insert({
    id: data.user.id,
    full_name: "",
    username: null,
    avatar_url: null,
  });
}
    // Si el usuario ya quedó autenticado, entrar directamente
    if (data.session) {
      router.push("/dashboard");
      return;
    }

    // Solo mostrar este mensaje si el proyecto requiere confirmar el correo
    alert(t.checkEmail);
  }

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center">

      <LanguageSelector />

      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <h1 className="text-3xl font-bold text-white">
          {t.registerTitle}
        </h1>

        <p className="text-slate-400 mt-2 mb-8">
          {t.registerSubtitle}
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.email}
          className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white mb-4"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.password}
          className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white mb-6"
        />

        <button
          onClick={register}
          disabled={loading}
          className="w-full rounded-xl bg-green-600 hover:bg-green-700 p-4 font-bold text-white"
        >
          {loading ? t.creatingAccount : t.createAccount}
        </button>

        <div className="mt-6 text-center text-slate-400">
          {t.alreadyAccount}

          <Link
            href="/login"
            className="ml-2 text-green-400 hover:text-green-300"
          >
            {t.login}
          </Link>
        </div>

      </div>

    </div>
  );
}