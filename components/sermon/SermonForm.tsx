"use client";

import { useState } from "react";
import { SermonRequest } from "./types";
import { useLanguage } from "@/hooks/useLanguage";

type Props = {
  tipo: string;
  onGenerate: (data: SermonRequest) => void;
};

export default function SermonForm({
  tipo,
  onGenerate,
}: Props) {
  const [tema, setTema] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [audiencia, setAudiencia] = useState("Iglesia General");
  const [duracion, setDuracion] = useState("45 minutos");
  const [version, setVersion] = useState("RVR1960");
  const [tono, setTono] = useState("Pastoral");

  const { idioma, t } = useLanguage();

const tituloCampo =
  tipo === "tematico"
    ? t.topic
    : tipo === "evangelistico"
    ? t.evangelisticTopic
    : t.biblePassage;

const placeholder =
  tipo === "tematico"
    ? t.topicPlaceholder
    : tipo === "evangelistico"
    ? t.evangelisticPlaceholder
    : t.passagePlaceholder;

  function generar() {
    if (!tema.trim()) {
     alert(t.fillTopic);
      return;
    }

    onGenerate({
      tipo,
      tema,
      objetivo,
      audiencia,
      duracion,
      version,
      tono,
    });
  }

  return (
    <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">

<h2 className="text-3xl font-bold text-white">
  {t.sermonConfig}
</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <div className="md:col-span-2">
<label className="block text-slate-300 mb-2">
  {tituloCampo}
</label>

<input
  value={tema}
  onChange={(e) => setTema(e.target.value)}
  placeholder={placeholder}
  className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white"
/>
        </div>

        <div>
<label className="block text-slate-300 mb-2">
  {t.objective}
</label>

          <input
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
           placeholder={
  idioma === "en"
    ? "What do you want to accomplish with this sermon?"
    : "¿Qué deseas lograr con la predicación?"
}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white"
          />
        </div>

        <div>
         <label className="block text-slate-300 mb-2">
  {t.audience}
</label>

          <select
            value={audiencia}
            onChange={(e) => setAudiencia(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white"
          >
<option>{t.generalChurch}</option>
<option>{t.youth}</option>
<option>{t.children}</option>
<option>{t.couples}</option>
<option>{t.leaders}</option>
<option>{t.evangelistic}</option>
          </select>
        </div>

        <div>
         <label className="block text-slate-300 mb-2">
  {t.duration}
</label>

          <select
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white"
          >
<option>{t.minutes15}</option>
<option>{t.minutes30}</option>
<option>{t.minutes45}</option>
<option>{t.minutes60}</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 mb-2">
  {t.bibleVersion}
</label>

          <select
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white"
          >
            <option>RVR1960</option>
            <option>NVI</option>
            <option>NBLA</option>
            <option>DHH</option>
            <option>NTV</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 mb-2">
  {t.tone}
</label>

          <select
            value={tono}
            onChange={(e) => setTono(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 p-4 text-white"
          >
          <option>{t.pastoral}</option>
<option>{t.inspirational}</option>
<option>{t.academic}</option>
<option>{t.evangelistic}</option>
          </select>
        </div>

      </div>

      <button
        onClick={generar}
        className="mt-8 rounded-xl bg-green-600 hover:bg-green-700 px-8 py-4 font-bold text-white transition"
      >
        {t.generateSermon}
      </button>

    </div>
  );
}