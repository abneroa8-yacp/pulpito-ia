"use client";

import { useState } from "react";
import GriegoForm from "./GriegoForm";
import ResultViewer from "@/components/common/ResultViewer";
import { GreekRequest } from "./types";
import { saveDocument } from "@/lib/storage/library";
import { useLanguage } from "@/hooks/useLanguage";

export default function GriegoWorkspace() {
  const { t, idioma } = useLanguage();

  const [data, setData] = useState<GreekRequest>({
    palabra: "",
    version: "RVR1960",
    nivel: "Intermedio",
    incluirStrong: true,
    incluirMorfologia: true,
  });

  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState("");

  async function generarGriego() {
    if (!data.palabra.trim()) {
      alert(
        idioma === "en"
          ? "Please enter a Greek word or Bible passage."
          : "Escribe una palabra griega o un pasaje bíblico."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/sermon/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          tipo: "griego",
          idioma,
        }),
      });

      const json = await res.json();

      if (json.error) {
        alert(json.error);
        return;
      }

      const contenido =
        json.result ||
        json.sermon ||
        "No hubo respuesta.";

      setResultado(contenido);

      saveDocument({
        title: data.palabra,
        type: "griego",
        content: contenido,
      });

    } catch (error) {
      console.error(error);

      alert(
        idioma === "en"
          ? "Error connecting to the AI."
          : "❌ Error al conectar con la IA."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 space-y-8">
      <h1 className="text-4xl font-bold text-white">
        🇬🇷 {t.greekTitle}
      </h1>

      <GriegoForm
        data={data}
        onChange={setData}
      />

      <div className="flex flex-wrap gap-4">

        <button
          onClick={generarGriego}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl px-8 py-4 font-bold text-white transition"
        >
          {loading
            ? `⏳ ${t.generatingGreek}`
            : `🇬🇷 ${t.generateGreek}`}
        </button>

        <button
          onClick={generarGriego}
          disabled={loading || !resultado}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl px-8 py-4 font-bold text-white transition"
        >
          🔄 {t.regenerate}
        </button>

        <button
          onClick={() => {
            setResultado("");

            setData({
              palabra: "",
              version: "RVR1960",
              nivel: "Intermedio",
              incluirStrong: true,
              incluirMorfologia: true,
            });
          }}
          className="bg-slate-700 hover:bg-slate-600 rounded-xl px-8 py-4 font-bold text-white transition"
        >
          🆕 {t.newGreek}
        </button>

      </div>

      <ResultViewer
        loading={loading}
        title="Griego Bíblico"
        content={resultado}
      />
    </div>
  );
}