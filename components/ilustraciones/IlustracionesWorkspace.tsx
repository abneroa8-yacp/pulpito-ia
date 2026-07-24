"use client";

import { useState } from "react";

import IlustracionesForm from "./IlustracionesForm";
import ResultViewer from "@/components/common/ResultViewer";
import { saveDocument } from "@/lib/storage/library";

import { IllustrationRequest } from "./types";
import { useLanguage } from "@/hooks/useLanguage";

export default function IlustracionesWorkspace() {
  const { idioma } = useLanguage();

  const [data, setData] = useState<IllustrationRequest>({
    tema: "",
    pasaje: "",
    audiencia: "General",
    tipo: "Ilustración Bíblica",
    longitud: "Media",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function generate() {
    if (!data.tema.trim()) {
      alert(
        idioma === "en"
          ? "Please enter a topic."
          : "Escribe un tema."
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
          tipo: "ilustracion",
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
        title: data.tema || "Ilustración",
        type: "ilustracion",
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
    <>
      <IlustracionesForm
        data={data}
        setData={setData}
        onGenerate={generate}
        loading={loading}
      />

      <ResultViewer
        loading={loading}
        title="Ilustración"
        content={result}
      />
    </>
  );
}