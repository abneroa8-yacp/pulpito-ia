"use client";

import { exportToWord } from "@/lib/export/word";
import { exportToPDF } from "@/lib/export/pdf";
import { exportToPowerPoint } from "@/lib/export/powerpoint";

type Props = {
  titulo: string;
  contenido: string;
};

export default function ResultToolbar({
  titulo,
  contenido,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">

      <button
        onClick={() => navigator.clipboard.writeText(contenido)}
        className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
      >
        📋 Copiar
      </button>

      <button
        onClick={() => exportToWord(titulo, contenido)}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
      >
        📄 Word
      </button>

      <button
        onClick={() => exportToPDF(titulo, contenido)}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
      >
        📕 PDF
      </button>

      <button
        onClick={() => exportToPowerPoint(titulo, contenido)}
        className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
      >
        📊 PowerPoint
      </button>

      <button
        onClick={() => window.print()}
        className="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
      >
        🖨️ Imprimir
      </button>

    </div>
  );
}