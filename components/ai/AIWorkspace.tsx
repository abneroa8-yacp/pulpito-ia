"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  mode: string;
  title: string;
  placeholder: string;
  extraPrompt?: string;
};

export default function AIWorkspace({
  mode,
  title,
  placeholder,
  extraPrompt = "",
}: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function generate() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/sermon/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          tema: prompt,
          extraPrompt,
        }),
      });

      const data = await res.json();

      setResponse(
        data.sermon ||
          data.respuesta ||
          "No hubo respuesta."
      );
    } catch {
      setResponse("❌ Error al conectar con la IA.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">

      <h1 className="text-4xl font-bold text-white">
        {title}
      </h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-8 h-40 rounded-2xl bg-slate-900 border border-slate-800 p-5 text-white outline-none resize-none"
      />

      <button
        onClick={generate}
        disabled={loading}
        className="mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-xl px-8 py-4 font-bold"
      >
        {loading ? "Generando..." : "Generar"}
      </button>

      {response && (
        <div className="mt-10 rounded-2xl bg-slate-900 border border-slate-800 p-8">

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {response}
            </ReactMarkdown>
          </div>

        </div>
      )}

    </div>
  );
}