"use client";

import { useEffect, useState } from "react";
import {
  getLibraryFromSupabase,
  LibraryDocument,
} from "@/lib/storage/library";
import { exportToWord } from "@/lib/export/word";
import { exportToPDF } from "@/lib/export/pdf";
import { exportToPowerPoint } from "@/lib/export/powerpoint";
import { languages } from "@/lib/i18n";
import { eliminarSermon } from "@/lib/supabase/sermones";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BibliotecaWorkspace() {
  const [documents, setDocuments] = useState<LibraryDocument[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<LibraryDocument | null>(null);

  const [idioma, setIdioma] = useState<"es" | "en">("es");

  useEffect(() => {
    const guardado = localStorage.getItem("idioma");

    if (guardado === "es" || guardado === "en") {
      setIdioma(guardado);
    }

    getLibraryFromSupabase().then((docs) => {
      setDocuments(docs);
    });
  }, []);

  const t = languages[idioma];

const filteredDocuments = documents.filter((doc) => {
  const title = doc.title ?? "";
  const content = doc.content ?? "";
  const query = search.toLowerCase();

  return (
    title.toLowerCase().includes(query) ||
    content.toLowerCase().includes(query)
  );
});

  async function deleteDocument(id: string) {
    await eliminarSermon(id);

    setDocuments((prev) => prev.filter((doc) => doc.id !== id));

    if (selected?.id === id) {
      setSelected(null);
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-white">
        📚 {t.library}
      </h1>

      <p className="mt-3 text-slate-400">
        {t.libraryDescription}
      </p>

      <input
        type="text"
        placeholder={t.searchDocument}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-6 mb-8 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-green-500"
      />

      {filteredDocuments.length === 0 ? (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-400">
          {t.noDocuments}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-7 shadow-lg transition hover:border-green-500"
            >
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {doc.title}
              </h2>

              <div className="mt-3 flex items-center gap-4">
                <span className="rounded-full bg-green-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-400">
                  {idioma === "es" ? "Documento" : "Document"}
                </span>

                <span className="text-sm text-slate-400">
                  {new Date(doc.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-5">
                <pre className="whitespace-pre-wrap text-base leading-7 text-slate-300">
                  {doc.content.substring(0, 160)}
                  {doc.content.length > 160 ? "..." : ""}
                </pre>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setSelected(doc)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  👁 {t.view}
                </button>

                <button
                  onClick={() => navigator.clipboard.writeText(doc.content)}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                >
                  📋 {t.copy}
                </button>

                <button
                  onClick={() => exportToWord(doc.title, doc.content)}
                  className="rounded-lg bg-blue-700 px-4 py-2 text-white transition hover:bg-blue-800"
                >
                  📄 {t.word}
                </button>

                <button
                  onClick={() => exportToPDF(doc.title, doc.content)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                >
                  📕 {t.pdf}
                </button>

                <button
                  onClick={() => exportToPowerPoint(doc.title, doc.content)}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-white transition hover:bg-orange-700"
                >
                  📊 {t.powerPoint}
                </button>

                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                >
                  🗑 {t.delete}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="max-h-[90vh] w-[92%] max-w-5xl overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-10 shadow-2xl">

            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="rounded-full bg-green-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-400">
{doc.type === "sermon"
  ? "Sermón"
  : doc.type === "estudio"
  ? "Estudio"
  : doc.type === "exegesis"
  ? "Exégesis"
  : doc.type === "devocional"
  ? "Devocional"
  : doc.type === "griego"
  ? "Griego"
  : doc.type === "hebreo"
  ? "Hebreo"
  : doc.type === "ilustracion"
  ? "Ilustración"
  : "Documento"}
</span>

                <h2 className="mt-3 text-5xl font-extrabold tracking-tight text-sky-400">
  {selected.title}
</h2>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-10 shadow-inner">
<article
  className="
    max-w-none

    text-white

    [&_h1]:text-cyan-400
    [&_h1]:text-2xl
    [&_h1]:font-extrabold
    [&_h1]:mb-5

    [&_h2]:text-emerald-400
    [&_h2]:text-xl
    [&_h2]:font-bold
    [&_h2]:mt-7
    [&_h2]:mb-3

    [&_h3]:text-sky-300
    [&_h3]:text-xl
    [&_h3]:font-semibold
    [&_h3]:mt-5
    [&_h3]:mb-2

    [&_p]:text-white
    [&_p]:text-lg
    [&_p]:leading-9
    [&_p]:mb-3

    [&_strong]:text-white
    [&_strong]:font-bold

    [&_li]:text-white

    [&_hr]:border-slate-700
    [&_hr]:my-8
  "
>
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {selected.content}
  </ReactMarkdown>
</article>
</div>
            </div>
          </div>
      )}
    </>
  );
}
