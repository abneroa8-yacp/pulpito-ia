"use client";

import { useState } from "react";
import HebreoForm from "./HebreoForm";
import { HebrewRequest } from "./types";
import ResultViewer from "@/components/common/ResultViewer";
import { saveDocument } from "@/lib/storage/library";
import { useLanguage } from "@/hooks/useLanguage";

export default function HebreoWorkspace() {
  const { t, idioma } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const [data, setData] = useState<HebrewRequest>({
    palabra: "",
    version: "RVR1960",
    nivel: "Intermedio",
    incluirStrong: true,
    incluirMorfologia: true,
  });

  async function generar() {
    if (!data.palabra.trim()) {
      alert(
        idioma === "en"
          ? "Please enter a Hebrew word or Bible passage."
          : "Escribe una palabra hebrea o un pasaje bíblico."
      );
      return;
    }

    const referencia = data.palabra.trim();
console.log("REFERENCIA:", referencia);

const soloCapitulo =
  /^([1-3]\s+)?[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*\s+\d+$/.test(referencia);

console.log("SOLO CAPITULO:", soloCapitulo);

    if (soloCapitulo) {
      alert(
        idioma === "en"
          ? "Hebrew analysis currently supports a single word, one verse, or a maximum of two verses."
          : "El análisis de Hebreo Bíblico solo admite una palabra, un versículo o un máximo de dos versículos."
      );
      return;
    }

    // Bloquear rangos mayores a 2 versículos
    const rango = referencia.match(/:(\d+)-(\d+)$/);

    if (rango) {
      const inicio = Number(rango[1]);
      const fin = Number(rango[2]);

      if (fin - inicio > 1) {
        alert(
          idioma === "en"
            ? "Only up to two verses are allowed."
            : "Solo se permite analizar hasta dos versículos."
        );
        return;
      }
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
          tipo: "hebreo",
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

      setResult(contenido);

      saveDocument({
        title: data.palabra,
        type: "hebreo",
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
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">
        🇮🇱 {t.hebrewTitle}
      </h1>

      <HebreoForm
        value={data}
        onChange={setData}
      />

      <div className="flex flex-wrap gap-4">

        <button
          onClick={generar}
          disabled={loading}
          className="rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed px-8 py-4 text-white font-semibold transition"
        >
          {loading
            ? `⏳ ${t.generatingHebrew}`
            : `🇮🇱 ${t.generateHebrew}`}
        </button>

        <button
          onClick={generar}
          disabled={loading || !result}
          className="rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed px-8 py-4 text-white font-semibold transition"
        >
          🔄 {t.regenerate}
        </button>

        <button
          onClick={() => {
            setResult("");

            setData({
              palabra: "",
              version: "RVR1960",
              nivel: "Intermedio",
              incluirStrong: true,
              incluirMorfologia: true,
            });
          }}
          className="rounded-xl bg-slate-700 hover:bg-slate-600 px-8 py-4 text-white font-semibold transition"
        >
          🆕 {t.newHebrew}
        </button>

      </div>

      <ResultViewer
        loading={loading}
        content={result}
        title="Hebreo Bíblico"
      />
    </div>
  );
}
