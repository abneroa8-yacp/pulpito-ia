"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";

export default function UserMenu() {
  const supabase = createClient();
  const router = useRouter();

  const { idioma } = useLanguage();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<"free" | "premium">("free");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function cargarUsuario() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      if (user.email) {
        setEmail(user.email);
      }

      const { data } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single();

      if (data?.plan === "premium") {
        setPlan("premium");
      }
    }

    cargarUsuario();
  }, []);

  useEffect(() => {
    function cerrar(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", cerrar);

    return () =>
      document.removeEventListener("mousedown", cerrar);
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const inicial = email
    ? email.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-full bg-green-600 text-white font-bold hover:bg-green-700 transition"
      >
        {inicial}
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-72
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            shadow-2xl
            overflow-hidden
            z-50
          "
        >
          <div className="p-5 border-b border-slate-800">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                {inicial}
              </div>

              <div>

                <p className="text-white font-semibold">
                  {email.split("@")[0]}
                </p>

                <p className="text-slate-400 text-sm break-all">
                  {email}
                </p>

              </div>

            </div>

          </div>

          <button
            onClick={() => router.push("/perfil")}
            className="w-full text-left px-5 py-4 hover:bg-slate-800 text-white transition"
          >
            👤 {idioma === "es" ? "Mi perfil" : "My Profile"}
          </button>

          {plan === "premium" ? (
  <button
    onClick={() => router.push("/configuracion")}
    className="w-full text-left px-5 py-4 hover:bg-slate-800 text-white transition"
  >
    👑 {idioma === "es" ? "Administrar suscripción" : "Manage subscription"}
  </button>
) : (
  <button
    onClick={() => router.push("/premium")}
    className="w-full text-left px-5 py-4 hover:bg-slate-800 text-white transition"
  >
    ⭐ {idioma === "es" ? "Hazte Premium" : "Upgrade to Premium"}
  </button>
)}

          <button
            onClick={logout}
            className="w-full text-left px-5 py-4 hover:bg-red-600 text-white transition"
          >
            🚪 {idioma === "es" ? "Cerrar sesión" : "Sign Out"}
          </button>

        </div>
      )}
    </div>
  );
}