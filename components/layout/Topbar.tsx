"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { languages } from "@/lib/i18n";
import { rutas } from "@/lib/search";

export default function Topbar() {
  const [idioma, setIdioma] = useState<"es" | "en">("es");
  const router = useRouter();
const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const guardado = localStorage.getItem("idioma");

    if (guardado === "es" || guardado === "en") {
      setIdioma(guardado);
    }
  }, []);

  const t = languages[idioma];

  function buscar() {
    
  const texto = busqueda.toLowerCase().trim();

  const ruta = rutas[texto];

  if (ruta) {
    router.push(ruta);
    setBusqueda("");
  }
}

  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-8">

      <input
  value={busqueda}
  onChange={(e) => setBusqueda(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      buscar();
    }
  }}
  placeholder={t.search}
  className="
    w-96
    bg-slate-900
    rounded-xl
    px-5
    py-3
    outline-none
    text-white
  "
/>

      <div className="flex items-center gap-4">

        <button className="bg-green-600 px-4 py-2 rounded-lg">
          Premium
        </button>

        <div className="w-11 h-11 rounded-full bg-slate-700" />

      </div>

    </header>
  );
}