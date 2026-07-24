"use client";

import { useEffect, useState } from "react";
import { languages } from "@/lib/i18n";

export function useLanguage() {
  const [idioma, setIdioma] = useState<"es" | "en">("es");

  useEffect(() => {
    const guardado = localStorage.getItem("idioma");

    if (guardado === "es" || guardado === "en") {
      setIdioma(guardado);
      return;
    }

    // Primera visita: detectar idioma del navegador
    const navegador = navigator.language.toLowerCase();

    if (navegador.startsWith("en")) {
      setIdioma("en");
      localStorage.setItem("idioma", "en");
    } else {
      setIdioma("es");
      localStorage.setItem("idioma", "es");
    }
  }, []);

function cambiarIdioma(nuevo: "es" | "en") {
  localStorage.setItem("idioma", nuevo);
  setIdioma(nuevo);

  window.location.reload();
}

  return {
    idioma,
    t: languages[idioma],
    cambiarIdioma,
  };
}