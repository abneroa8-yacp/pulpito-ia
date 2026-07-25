"use client";

import { useEffect, useState } from "react";
import { languages } from "@/lib/i18n";

export default function ConfiguracionPage() {
  const [idioma, setIdioma] = useState<"es" | "en">("es");
  const [loadingPortal, setLoadingPortal] = useState(false);

  useEffect(() => {
    const guardado = localStorage.getItem("idioma");

    if (guardado === "es" || guardado === "en") {
      setIdioma(guardado);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("idioma", idioma);
  }, [idioma]);

 const t = idioma === "es" ? languages.es : languages.en;

  async function administrarSuscripcion() {
    try {
      setLoadingPortal(true);

      const res = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert(t.subscriptionError);
    } finally {
      setLoadingPortal(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-green-400">
            ⚙️ {t.settings}
          </h1>

          <a
            href="/dashboard"
            className="text-green-400 hover:text-green-300 font-semibold"
          >
            {t.backDashboard}
          </a>
        </div>

        {/* Idioma */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
  🌐 {t.language}
</h2>

          <div className="space-y-3">
            <button
              onClick={() => setIdioma("es")}
              className={`w-full rounded-xl py-3 transition ${
                idioma === "es"
                  ? "bg-green-600"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              🇲🇽 Español
            </button>

            <button
              onClick={() => setIdioma("en")}
              className={`w-full rounded-xl py-3 transition ${
                idioma === "en"
                  ? "bg-green-600"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              🇺🇸 English
            </button>
          </div>
        </div>

        {/* Suscripción */}
        <div className="bg-slate-800 rounded-2xl border border-green-700 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {t.manageSubscription.split(" ")[0]} {t.subscription}
          </h2>

          <p className="text-slate-300 mb-5">
            {t.subscriptionDescription}
          </p>

          <button
            onClick={administrarSuscripcion}
            disabled={loadingPortal}
            className="w-full rounded-xl bg-green-600 hover:bg-green-700 transition py-3 font-semibold disabled:opacity-60"
          >
            {loadingPortal
              ? t.opening
              : t.manageSubscription}
          </button>
        </div>

        {/* Acerca de */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            ℹ️ {t.about}
          </h2>

          <p className="text-slate-300">Púlpito IA</p>

          <p className="text-slate-400">
            {t.version} 1.0.0
          </p>
        </div>
      </div>
    </main>
  );
}