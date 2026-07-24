"use client";

import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";
import { languages } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import { rutas } from "@/lib/search";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";

export default function Dashboard() {
  const { idioma } = useLanguage();
  const t = languages[idioma];

  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  const supabase = createClient();

  async function cerrarSesion() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  function buscar() {
    const texto = busqueda.toLowerCase().trim();

    const ruta = rutas[texto];

    if (ruta) {
      router.push(ruta);
      setBusqueda("");
    }
  }

  return (
    <AppLayout>
      <div className="max-w-7xl">

        <h1 className="text-5xl font-bold text-white">
          {t.dashboardTitle}
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          {t.dashboardSubtitle}
        </p>

        <div className="mt-6">
          <button
            onClick={cerrarSesion}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-5
              py-2
              rounded-xl
              transition
            "
          >
            Logout
          </button>
        </div>

        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              buscar();
            }
          }}
          placeholder={t.dashboardSearchPlaceholder}
          className="
            w-full
            mt-8
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-5
            text-white
            outline-none
            focus:border-green-500
          "
        />

        <h2 className="text-white text-2xl font-bold mt-12 mb-6">
          {t.quickAccess}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

          <Card title={t.quickSermons} href="/sermones" />
          <Card title={t.quickStudies} href="/estudios" />
          <Card title={t.quickExegesis} href="/exegesis" />
          <Card title={t.quickGreek} href="/griego" />
          <Card title={t.quickHebrew} href="/hebreo" />
          <Card title={t.quickDevotionals} href="/devocionales" />
          <Card title={t.quickIllustrations} href="/ilustraciones" />
          <Card title={t.quickLibrary} href="/biblioteca" />

        </div>

      </div>
    </AppLayout>
  );
}

function Card({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        bg-slate-900
        hover:bg-slate-800
        border
        border-slate-800
        hover:border-green-500
        rounded-2xl
        p-8
        text-white
        transition
        text-left
        block
      "
    >
      <h3 className="text-xl font-semibold">
        {title}
      </h3>
    </Link>
  );
}