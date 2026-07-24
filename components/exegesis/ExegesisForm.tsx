"use client";

import { useEffect, useState } from "react";
import { ExegesisRequest } from "./types";
import { languages } from "@/lib/i18n";

type Props = {
  data: ExegesisRequest;
  onChange: (data: ExegesisRequest) => void;
};

export default function ExegesisForm({
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

  function update<K extends keyof ExegesisRequest>(
    field: K,
    value: ExegesisRequest[K]
  ) {
    onChange({
      ...data,
      [field]: value,
    });
  }

  return (
    <div className="space-y-6">

      {/* Pasaje */}
      <div>
       <label className="block mb-2 font-semibold text-white">
  📖 {t.exegesisPassage}
</label>

        <input
          value={data.pasaje}
          onChange={(e) => update("pasaje", e.target.value)}
          placeholder={t.exegesisPassagePlaceholder}
          className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Versión */}
      <div>
        <label className="block mb-2 font-semibold text-white">
          📚 {t.bibleVersion}
        </label>

        <select
          value={data.version}
          onChange={(e) => update("version", e.target.value)}
          className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option>RVR1960</option>
          <option>NVI</option>
          <option>NTV</option>
          <option>NBLA</option>
        </select>
      </div>

      {/* Nivel */}
      <div>
        <label className="block mb-2 font-semibold text-white">
  🎓 {t.level}
</label>

        <select
          value={data.nivel}
          onChange={(e) => update("nivel", e.target.value)}
          className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option>{t.basic}</option>
<option>{t.intermediate}</option>
<option>{t.advanced}</option>
<option>{t.academicLevel}</option>
        </select>
      </div>

      {/* Audiencia */}
      <div>
        <label className="block mb-2 font-semibold text-white">
          👥 {t.audience}
        </label>

        <select
          value={data.audiencia}
          onChange={(e) => update("audiencia", e.target.value)}
          className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option>{t.generalChurch}</option>
<option>{t.leaders}</option>
<option>{idioma === "es" ? "Pastores" : "Pastors"}</option>
<option>{idioma === "es" ? "Instituto Bíblico" : "Bible Institute"}</option>
        </select>
      </div>

      {/* Enfoque */}
      <div>
        <label className="block mb-2 font-semibold text-white">
  🎯 {t.focus}
</label>

        <select
          value={data.enfoque}
          onChange={(e) => update("enfoque", e.target.value)}
          className="w-full rounded-xl bg-slate-800 border border-slate-600 p-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option>{t.exegetical}</option>
<option>{t.hermeneutical}</option>
<option>{t.homiletical}</option>
<option>{t.theological}</option>
<option>{t.devotionalFocus}</option>
        </select>
      </div>

    </div>
  );
}