"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageSelector() {
  const { idioma, cambiarIdioma } = useLanguage();

  return (
    <div className="absolute top-6 right-6">
      <select
        value={idioma}
        onChange={(e) =>
          cambiarIdioma(e.target.value as "es" | "en")
        }
        className="
          bg-slate-900
          border
          border-slate-700
          rounded-xl
          px-4
          py-2
          text-white
          outline-none
        "
      >
        <option value="es">🇲🇽 Español</option>
        <option value="en">🇺🇸 English</option>
      </select>
    </div>
  );
}