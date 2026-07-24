"use client";

import { DevotionalRequest } from "./types";
import { useEffect, useState } from "react";
import { languages } from "@/lib/i18n";

type Props = {
  data: DevotionalRequest;
  onChange: (data: DevotionalRequest) => void;
};

export default function DevocionalesForm({
  data,
  onChange,
}: Props) {
  const [idioma, setIdioma] = useState<"es" | "en">("es");

useEffect(() => {
  const guardado = localStorage.getItem("idioma");

  if (guardado === "es" || guardado === "en") {
    setIdioma(guardado);
  }
}, []);

const t = languages[idioma];
  function update<K extends keyof DevotionalRequest>(
    field: K,
    value: DevotionalRequest[K]
  ) {
    onChange({
      ...data,
      [field]: value,
    });
  }

  return (
    <div className="space-y-6">

      {/* Tipo */}
      <div>
        <label className="block mb-2 font-semibold text-white">
          ❤️ {t.devotionalType}
        </label>

        <select
          value={data.tipo}
          onChange={(e) => update("tipo", e.target.value)}
   className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option>🌅 {t.dailyDevotional}</option>
<option>📅 {t.sevenDaySeries}</option>
<option>📖 {t.thirtyDaySeries}</option>
<option>📚 {t.yearSeries}</option>
<option>👨 {t.forMen}</option>
<option>👩 {t.forWomen}</option>
<option>👥 {t.forYouth}</option>
<option>👨‍👩‍👧 {t.family}</option>
<option>🎯 {t.byTopic}</option>
        </select>
      </div>

      {/* Tema */}
      <div>
        <label className="block mb-2 font-semibold text-white">
          📖 {t.devotionalTheme}
        </label>

        <input
          value={data.tema}
          onChange={(e) => update("tema", e.target.value)}
          placeholder={t.devotionalThemePlaceholder}
         className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Objetivo */}
      <div>
        <label className="block mb-2 font-semibold text-white">
          🎯 {t.devotionalObjective}
        </label>

        <input
          value={data.objetivo}
          onChange={(e) => update("objetivo", e.target.value)}
          placeholder={t.devotionalObjectivePlaceholder}
  className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Audiencia */}
      <div>
        <label className="block mb-2 font-semibold text-white">
          👥 {t.audience}
        </label>

        <select
          value={data.audiencia}
          onChange={(e) => update("audiencia", e.target.value)}
className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option>{t.generalChurch}</option>
<option>{t.newBelievers}</option>
<option>{t.youth}</option>
<option>{t.couples}</option>
<option>{t.forWomen}</option>
<option>{t.forMen}</option>
<option>{t.leaders}</option>
<option>{t.pastors}</option>
        </select>
      </div>

      {/* Tiempo */}
      <div>
        <label className="block mb-2 font-semibold text-white">
          ⏱️ {t.readingTime}
        </label>

        <select
          value={data.tiempo}
          onChange={(e) => update("tiempo", e.target.value)}
className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option>{t.minutes5}</option>
<option>{t.minutes10}</option>
<option>{t.minutes15}</option>
<option>{t.minutes20}</option>
        </select>
      </div>

      {/* Versión */}
      <div>
        <label className="block mb-2 font-semibold text-white">
          📖 {t.bibleVersion}
        </label>

        <select
          value={data.version}
          onChange={(e) => update("version", e.target.value)}
className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option>RVR1960</option>
          <option>NTV</option>
          <option>NVI</option>
          <option>NBLA</option>
        </select>
      </div>

      {/* Tono */}
      <div>
        <label className="block mb-2 font-semibold text-white">
          🎨 {t.devotionalTone}
        </label>

        <select
          value={data.tono}
          onChange={(e) => update("tono", e.target.value)}
className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option>{t.devotionalToneOption}</option>
<option>{t.pastoral}</option>
<option>{t.inspirational}</option>
<option>{t.academic}</option>
        </select>
      </div>

    </div>
  );
}