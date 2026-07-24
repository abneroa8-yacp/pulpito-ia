"use client";

import { GreekRequest } from "./types";
import { useLanguage } from "@/hooks/useLanguage";

type Props = {
  data: GreekRequest;
  onChange: (data: GreekRequest) => void;
};

export default function GriegoForm({
  data,
  onChange,
}: Props) {
  const { t } = useLanguage();
  function update<K extends keyof GreekRequest>(
    field: K,
    value: GreekRequest[K]
  ) {
    onChange({
      ...data,
      [field]: value,
    });
  }

  return (
    <div className="space-y-6">

      {/* Palabra */}
      <div>
        <label className="block mb-2 font-semibold text-white">
          🇬🇷 {t.greekWord}
        </label>

        <input
          value={data.palabra}
          onChange={(e) => update("palabra", e.target.value)}
          placeholder={t.greekWordPlaceholder}
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
<option>{t.academic}</option>
        </select>
      </div>

      {/* Opciones */}
      <div className="space-y-3">

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={data.incluirStrong}
            onChange={(e) =>
              update("incluirStrong", e.target.checked)
            }
          />
         {t.includeStrong}
        </label>

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={data.incluirMorfologia}
            onChange={(e) =>
              update("incluirMorfologia", e.target.checked)
            }
          />
         {t.includeMorphology}
        </label>

      </div>

    </div>
  );
}