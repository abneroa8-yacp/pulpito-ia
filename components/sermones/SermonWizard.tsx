"use client";

import { useEffect, useState } from "react";
import { saveDocument } from "@/lib/storage/library";
import ResultViewer from "@/components/common/ResultViewer";
import { guardarSermon } from "@/lib/supabase/sermones";

type Props = {
  tipo: string;
};

export default function SermonWizard({ tipo }: Props) {
  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    setTema("");
    setResultado("");
  }, [tipo]);

  async function generarSermon() {
    if (!tema.trim()) {
      alert("Escribe un tema o un pasaje.");
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
          tema: `${tipo}: ${tema}`,
        }),
      });

const data = await res.json();

const contenido =
  data.result ??
  data.sermon ??
  data.respuesta ??
  "No hubo respuesta.";

setResultado(contenido);
alert("Voy a guardar en Supabase");
await guardarSermon(
  tema,
  `${tipo}: ${tema}`,
  contenido
);

saveDocument({
  title: tema,
  type: "sermon",
  content: contenido,
});
    } catch (error) {
  console.error(error);

  if (error instanceof Error) {
    alert(error.message);
  } else {
    alert(JSON.stringify(error));
  }

  setResultado("❌ Ocurrió un error al guardar el sermón.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-3xl font-bold text-white">
        {tipo}
      </h2>

      <p className="text-slate-400 mt-2">
        Completa la información para generar tu sermón.
      </p>

      <div className="mt-8">

        <label className="text-slate-300 font-medium">
          {tipo === "Temático"
            ? "Tema"
            : tipo === "Evangelístico"
            ? "Tema Evangelístico"
            : "Pasaje Bíblico"}
        </label>

        <input
          className="w-full mt-2 rounded-xl bg-slate-950 border border-slate-700 p-4 text-white"
          placeholder={
            tipo === "Temático"
              ? "Ej. La fe que vence al mundo"
              : tipo === "Evangelístico"
              ? "Ej. La salvación en Cristo"
              : "Ej. Romanos 8:1-17"
          }
          value={tema}
          onChange={(e) => setTema(e.target.value)}
        />

      </div>

      <button
        onClick={generarSermon}
        disabled={loading}
        className="mt-8 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 transition px-8 py-4 rounded-xl font-bold"
      >
        {loading ? "Generando..." : "Generar Sermón"}
      </button>

   <ResultViewer
  loading={loading}
  title={`${tipo} Sermón`}
  content={resultado}
/>

    </div>
  );
}