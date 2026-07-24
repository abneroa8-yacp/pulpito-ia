"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import AppLayout from "@/components/layout/AppLayout";
import SermonForm from "@/components/sermon/SermonForm";
import ResultToolbar from "@/components/common/ResultToolbar";
import { SermonRequest } from "@/components/sermon/types";
import { saveDocument } from "@/lib/storage/library";
import { languages } from "@/lib/i18n";

export default function SermonesPage() {
  const [tipo, setTipo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState("");

const [idioma, setIdioma] = useState<"es" | "en">("es");

useEffect(() => {
  const guardado = localStorage.getItem("idioma");

  if (guardado === "es" || guardado === "en") {
    setIdioma(guardado);
  }
}, []);

const t = languages[idioma];

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
          idioma,
        }),
      });

    const json = await res.json();

if (!res.ok) {
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
  type: "sermon",
  content: contenido,
});
    } catch (error) {
      console.error(error);
      setResultado("❌ Error al conectar con la IA.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold text-white">
  🎙 {t.sermonGenerator}
</h1>
        <p className="text-slate-400 mt-3">
      {t.sermonGeneratorDescription}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
<Card
  titulo={t.expository}
  descripcion={t.expositoryDescription}
  activo={tipo === "expositivo"}
  onClick={() => {
    console.log("CLICK");
    setTipo("expositivo");
  }}
/>

          <Card
titulo={t.thematic}
descripcion={t.thematicDescription}
            activo={tipo === "tematico"}
            onClick={() => setTipo("tematico")}
          />

          <Card
titulo={t.textual}
descripcion={t.textualDescription}
            activo={tipo === "textual"}
            onClick={() => setTipo("textual")}
          />

<Card
  titulo={t.sermonEvangelistic}
  descripcion={t.sermonEvangelisticDescription}
  activo={tipo === "evangelistico"}
  onClick={() => setTipo("evangelistico")}
/>
        </div>

{tipo && (
  <SermonForm
    tipo={tipo}
    onGenerate={generar}
  />
)}

        {loading && (
          <div className="mt-8 rounded-xl bg-slate-900 border border-slate-800 p-4 text-green-400">
            ⏳ {t.generatingSermon}
          </div>
        )}

        {resultado && (
          <div className="mt-10 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-800 px-6 py-4">
              <h2 className="text-xl font-bold text-white">
               📖 {t.generatedSermon}
              </h2>

              <ResultToolbar
             titulo={resultado.match(/^# (.*)$/m)?.[1] || t.sermon}
                contenido={resultado}
              />
            </div>

            <div id="sermon-content" className="p-8 bg-slate-950">
              <article
                className="prose prose-invert max-w-none
                !text-white
                prose-headings:!text-white
                prose-p:!text-white
                prose-li:!text-white
                prose-strong:!text-yellow-300
                prose-blockquote:!text-cyan-200
                prose-code:!text-pink-300"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {resultado}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function Card({
  titulo,
  descripcion,
  activo,
  onClick,
}: {
  titulo: string;
  descripcion: string;
  activo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-6 text-left transition ${
        activo
          ? "bg-green-600 border-green-500"
          : "bg-slate-900 border-slate-800 hover:border-green-500 hover:bg-slate-800"
      }`}
    >
      <h2 className="text-xl font-bold text-white">{titulo}</h2>

      <p className="text-slate-300 mt-3">{descripcion}</p>
    </button>
  );
}