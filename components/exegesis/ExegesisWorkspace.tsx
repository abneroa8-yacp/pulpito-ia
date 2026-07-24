"use client";

import ExegesisForm from "./ExegesisForm";
import ResultViewer from "@/components/common/ResultViewer";
import { ExegesisRequest } from "./types";
import { saveDocument } from "@/lib/storage/library";
import { useEffect, useState } from "react";
import { languages } from "@/lib/i18n";

export default function ExegesisWorkspace() {
  const [idioma, setIdioma] = useState<"es" | "en">("es");

  useEffect(() => {
    const guardado = localStorage.getItem("idioma");

    if (guardado === "es" || guardado === "en") {
      setIdioma(guardado);
    }
  }, []);

  const t = languages[idioma];

  const [data, setData] = useState<ExegesisRequest>({
    pasaje: "",
    version: "RVR1960",
    nivel: "Intermedio",
    audiencia: "General",
    enfoque: "Exegético",
  });

  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState("");

  async function generarExegesis() {
    if (!data.pasaje.trim()) {
      alert(
        idioma === "en"
          ? "Please enter a Bible passage."
          : "Escribe un pasaje bíblico."
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
          tipo: "exegesis",
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
        title: data.pasaje,
        type: "exegesis",
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
        📙 {t.exegesisTitle}
      </h1>

      <ExegesisForm
        data={data}
        onChange={setData}
      />

      <div className="flex flex-wrap gap-4">

        <button
          onClick={generarExegesis}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl px-8 py-4 font-bold text-white transition"
        >
          {loading
            ? `⏳ ${t.generatingExegesis}`
            : `📗 ${t.generateExegesis}`}
        </button>

        <button
          onClick={generarExegesis}
          disabled={loading || !resultado}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl px-8 py-4 font-bold text-white transition"
        >
          🔄 {t.regenerate}
        </button>

        <button
          onClick={() => {
            setResultado("");

            setData({
              pasaje: "",
              version: "RVR1960",
              nivel: "Intermedio",
              audiencia: "General",
              enfoque: "Exegético",
            });
          }}
          className="bg-slate-700 hover:bg-slate-600 rounded-xl px-8 py-4 font-bold text-white transition"
        >
          🆕 {t.newExegesis}
        </button>

      </div>

      <ResultViewer
        loading={loading}
        title="Exégesis Bíblica"
        content={resultado}
      />
    </div>
  );
}