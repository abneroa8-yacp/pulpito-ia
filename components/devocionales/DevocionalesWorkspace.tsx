"use client";

import { useEffect, useState } from "react";
import DevocionalesForm from "./DevocionalesForm";
import ResultViewer from "@/components/common/ResultViewer";
import { DevotionalRequest } from "./types";
import { saveDocument } from "@/lib/storage/library";
import { languages } from "@/lib/i18n";

export default function DevocionalesWorkspace() {
  const [idioma, setIdioma] = useState<"es" | "en">("es");

  useEffect(() => {
    const guardado = localStorage.getItem("idioma");

    if (guardado === "es" || guardado === "en") {
      setIdioma(guardado);
    }
  }, []);

  const t = languages[idioma];

  const [data, setData] = useState<DevotionalRequest>({
    tipo: "🌅 Devocional del Día",
    tema: "",
    objetivo: "",
    audiencia: "General",
    tiempo: "10 minutos",
    version: "RVR1960",
    tono: "Devocional",
  });

  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState("");

  async function generarDevocional() {
    if (!data.tema.trim()) {
      alert(
        idioma === "en"
          ? "Please enter a topic or Bible passage."
          : "Escribe un tema o un pasaje bíblico."
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
          tipo: "devocional",
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
        title: data.tema,
        type: "devocional",
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
        ❤️ {t.devotionalTitle}
      </h1>

      <DevocionalesForm
        data={data}
        onChange={setData}
      />

      <div className="flex flex-wrap gap-4">

        <button
          onClick={generarDevocional}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl px-8 py-4 font-bold text-white transition"
        >
          {loading
            ? `⏳ ${t.generatingDevotional}`
            : `❤️ ${t.generateDevotional}`}
        </button>

        <button
          onClick={generarDevocional}
          disabled={loading || !resultado}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl px-8 py-4 font-bold text-white transition"
        >
          🔄 {t.regenerate}
        </button>

        <button
          onClick={() => {
            setResultado("");

            setData({
              tipo: "🌅 Devocional del Día",
              tema: "",
              objetivo: "",
              audiencia: "General",
              tiempo: "10 minutos",
              version: "RVR1960",
              tono: "Devocional",
            });
          }}
          className="bg-slate-700 hover:bg-slate-600 rounded-xl px-8 py-4 font-bold text-white transition"
        >
          📄 {t.newDevotional}
        </button>

      </div>

      <ResultViewer
        loading={loading}
        title="Devocional"
        content={resultado}
      />
    </div>
  );
}