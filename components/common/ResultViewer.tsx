"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ResultToolbar from "./ResultToolbar";

type Props = {
  loading: boolean;
  title: string;
  content: string;
};

export default function ResultViewer({
  loading,
  title,
  content,
}: Props) {
  if (loading) {
    return (
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-white">
        Generando contenido...
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="mt-10 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">

      <div className="flex justify-between items-center border-b border-slate-800 px-6 py-4">

        <h2 className="text-xl font-bold text-white">
          📖 {title}
        </h2>

        <ResultToolbar
          titulo={
            content.match(/^# (.*)$/m)?.[1] || title
          }
          contenido={content}
        />

      </div>

      <div className="p-8 bg-slate-950">

<article className="text-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </article>

      </div>

    </div>
  );
}