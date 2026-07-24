"use client";

import { IllustrationRequest } from "./types";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
  data: IllustrationRequest;
  setData: React.Dispatch<React.SetStateAction<IllustrationRequest>>;
  onGenerate: () => void;
  loading: boolean;
}

export default function IlustracionesForm({
  data,
  setData,
  onGenerate,
  loading,
}: Props) {
  const { t } = useLanguage();
  return (
    <div className="space-y-4 rounded-xl border p-6 bg-white dark:bg-zinc-900">
      <div>
        <label className="block mb-2 font-medium">
  {t.illustrationTheme}
</label>
        <input
          type="text"
          value={data.tema}
          onChange={(e) =>
            setData({ ...data, tema: e.target.value })
          }
          placeholder={t.illustrationThemePlaceholder}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
  {t.illustrationPassage}
</label>
        <input
          type="text"
          value={data.pasaje}
          onChange={(e) =>
            setData({ ...data, pasaje: e.target.value })
          }
          placeholder={t.illustrationPassagePlaceholder}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
  <label className="block mb-2 font-medium">
    {t.audience}
  </label>

  <select
    value={data.audiencia}
    onChange={(e) =>
      setData({ ...data, audiencia: e.target.value })
    }
    className="w-full rounded-lg border p-2"
  >
   <option>{t.generalChurch}</option>
<option>{t.children}</option>
<option>{t.youth}</option>
<option>{t.adults}</option>
<option>{t.marriages}</option>
<option>{t.leaders}</option>
<option>{t.evangelistic}</option>
  </select>
</div>

      <div>
        <label className="block mb-2 font-medium">
  {t.illustrationType}
</label>
        <select
          value={data.tipo}
          onChange={(e) =>
            setData({ ...data, tipo: e.target.value })
          }
          className="w-full rounded-lg border p-2"
        >
          <option>{t.biblicalIllustration}</option>
<option>{t.realStory}</option>
<option>{t.historicalStory}</option>
<option>{t.everydayAnalogy}</option>
<option>{t.natureObjects}</option>
<option>{t.powerfulIntroduction}</option>
<option>{t.memorableConclusion}</option>
<option>{t.emotionalApplication}</option>
<option>{t.cleanHumor}</option>
        </select>
      </div>

      <div>
       <label className="block mb-2 font-medium">
  {t.illustrationLength}
</label>
        <select
          value={data.longitud}
          onChange={(e) =>
            setData({ ...data, longitud: e.target.value })
          }
          className="w-full rounded-lg border p-2"
        >
          <option>{t.veryShort}</option>
<option>{t.short}</option>
<option>{t.medium}</option>
<option>{t.long}</option>
        </select>
      </div>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
  ? t.generatingIllustration
  : "✨ " + t.generateIllustration}
      </button>

      <p className="text-sm text-gray-500">
       {t.illustrationDisclaimer}
      </p>
    </div>
  );
}