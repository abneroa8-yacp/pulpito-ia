"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { languages } from "@/lib/i18n";
import { rutas } from "@/lib/search";
import UserMenu from "./UserMenu";

export default function Topbar() {
  const [idioma, setIdioma] = useState<"es" | "en">("es");
  const [busqueda, setBusqueda] = useState("");

  const router = useRouter();

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
    <header className="border-b border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:px-8 md:h-20">

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
  w-full
  md:w-96
  bg-slate-900
  rounded-xl
  px-5
  py-3
  outline-none
  text-white
  border
  border-slate-800
  focus:border-green-500
"
        
      />

      <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-3">

        <button
          onClick={() => router.push("/premium")}
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            font-semibold
            px-4
py-2
            rounded-xl
            transition
          "
        >
          ⭐ Premium
        </button>

        <UserMenu />

      </div>

    </header>
  );
}