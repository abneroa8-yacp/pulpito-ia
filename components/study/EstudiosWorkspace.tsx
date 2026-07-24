"use client";

import { useState } from "react";
import EstudiosForm from "./EstudiosForm";
import { SermonRequest } from "./types";
import ResultViewer from "@/components/common/ResultViewer";
import { saveDocument } from "@/lib/storage/library";

export default function EstudiosWorkspace() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState("");

  async function generar(data: SermonRequest) {
    setLoading(true);

    try {
      const idioma = localStorage.getItem("idioma") || "es";

      const res = await fetch("/api/sermon/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          tipo: "estudio",
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
        type: "estudio",
        content: contenido,
      });

    } catch (error) {
      console.error(error);
      alert("❌ Error al conectar con la IA.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <EstudiosForm
        tipo="estudio"
        onGenerate={generar}
      />

      <ResultViewer
        loading={loading}
        title="Estudio Bíblico"
        content={resultado}
      />
    </>
  );
}