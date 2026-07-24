"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function updatePassword() {
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Contraseña actualizada correctamente.");

    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-8">

        <h1 className="text-3xl font-bold text-white mb-2">
          Restablecer contraseña
        </h1>

        <p className="text-slate-400 mb-6">
          Escribe tu nueva contraseña.
        </p>

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white mb-6"
        />

        <button
          onClick={updatePassword}
          disabled={loading}
          className="w-full rounded-xl bg-green-600 hover:bg-green-700 p-4 text-white font-bold"
        >
          {loading
            ? "Actualizando..."
            : "Guardar nueva contraseña"}
        </button>

      </div>
    </div>
  );
}