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

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.content.toLowerCase().includes(search.toLowerCase())
  );

async function deleteDocument(id: string) {
  await eliminarSermon(id);

  setDocuments((prev) =>
    prev.filter((doc) => doc.id !== id)
  );

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
        <div className="space-y-5">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="rounded-xl border border-slate-700 bg-slate-900 p-6"
            >
              <h2 className="text-xl font-bold text-white">
                {doc.title}
              </h2>

              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="font-medium text-green-400">
                  {doc.type}
                </span>

                <span className="text-slate-500">
                  {new Date(doc.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="mt-5 rounded-lg bg-slate-950 p-4">
                <pre className="whitespace-pre-wrap text-sm text-slate-300">
                  {doc.content.substring(0, 120)}
                  {doc.content.length > 120 ? "..." : ""}
                </pre>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => setSelected(doc)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  👁 {t.view}
                </button>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(doc.content)
                  }
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  📋 {t.copy}
                </button>

                <button
                  onClick={() => exportToWord(doc.title, doc.content)}
                  className="rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
                >
                  📄 {t.word}
                </button>

                <button
                  onClick={() => exportToPDF(doc.title, doc.content)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  📕 {t.pdf}
                </button>

                <button
                  onClick={() => exportToPowerPoint(doc.title, doc.content)}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                  📊 {t.powerPoint}
                </button>

                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  🗑 {t.delete}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="max-h-[90vh] w-[90%] max-w-5xl overflow-y-auto rounded-2xl bg-slate-900 p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">
                {selected.title}
              </h2>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                ✕
              </button>
            </div>

            <pre className="whitespace-pre-wrap leading-8 text-slate-200">
              {selected.content}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}