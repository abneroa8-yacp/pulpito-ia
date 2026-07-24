"use client";

import { HebrewRequest } from "./types";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
  value: HebrewRequest;
  onChange: (data: HebrewRequest) => void;
}

export default function HebreoForm({ value, onChange }: Props) {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">

      <div>
        <label className="block mb-2 font-semibold text-white">
  🇮🇱 {t.hebrewWord}
</label>

        <input
          type="text"
          value={value.palabra}
          onChange={(e) =>
            onChange({
              ...value,
              palabra: e.target.value,
            })
          }
          placeholder={t.hebrewWordPlaceholder}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-white">
          📚 {t.bibleVersion}
        </label>

      <select
  value={value.version}
  onChange={(e) =>
    onChange({
      ...value,
      version: e.target.value,
    })
  }
  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white focus:border-cyan-500 focus:outline-none"
>
  <option>RVR1960</option>
  <option>NVI</option>
  <option>NTV</option>
  <option>NBLA</option>
</select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-white">
          🎓 {t.level}
        </label>

        <select
          value={value.nivel}
          onChange={(e) =>
            onChange({
              ...value,
              nivel: e.target.value,
            })
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white focus:border-cyan-500 focus:outline-none"
        >
          <option>{t.basic}</option>
<option>{t.intermediate}</option>
<option>{t.advanced}</option>
<option>{t.academic}</option>
        </select>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            className="accent-cyan-500"
            checked={value.incluirStrong}
            onChange={(e) =>
              onChange({
                ...value,
                incluirStrong: e.target.checked,
              })
            }
          />
          {t.includeStrong}
        </label>

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            className="accent-cyan-500"
            checked={value.incluirMorfologia}
            onChange={(e) =>
              onChange({
                ...value,
                incluirMorfologia: e.target.checked,
              })
            }
          />
          {t.includeMorphology}
        </label>

      </div>

    </div>
  );
}