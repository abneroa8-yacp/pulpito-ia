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
    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

    <div className="flex flex-col gap-4 border-b border-slate-800 px-4 py-4 md:flex-row md:items-start md:justify-between">

  <h2 className="text-xl font-bold text-white">
    📖 {title}
  </h2>

  <div className="w-full">
    <ResultToolbar
      titulo={content.match(/^# (.*)$/m)?.[1] || title}
      contenido={content}
    />
  </div>

</div>

      <div className="overflow-x-auto bg-slate-950 p-4 md:p-8">
<article className="prose prose-invert max-w-none break-all overflow-hidden">

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
           components={{
  h1: ({ children }) => (
    <div className="mt-6 mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
      <h1 className="text-2xl md:text-3xl font-extrabold text-green-400 break-words whitespace-normal">
        {children}
      </h1>
    </div>
  ),

  h2: ({ children }) => (
  <div className="mt-8 mb-4 border-l-4 border-green-500 pl-4 overflow-hidden">
    <h2 className="text-xl md:text-2xl font-bold text-white break-words whitespace-normal">
      {children}
    </h2>
  </div>
),

              h3: ({ children }) => (
                <h3 className="mt-6 text-xl font-semibold text-green-300">
                  {children}
                </h3>
              ),

              p: ({ children }) => (
              <p className="mb-5 whitespace-pre-wrap break-words break-all overflow-hidden leading-8 text-slate-200">
                  {children}
                </p>
              ),

              ul: ({ children }) => (
                <ul className="mb-6 list-disc space-y-2 pl-6 text-slate-200">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="mb-6 list-decimal space-y-2 pl-6 text-slate-200">
                  {children}
                </ol>
              ),

              blockquote: ({ children }) => (
                <blockquote className="my-6 overflow-hidden break-all whitespace-pre-wrap rounded-lg border-l-4 border-green-500 bg-slate-900 p-4 italic text-slate-300">
                  {children}
                </blockquote>
              ),

              strong: ({ children }) => (
                <strong className="font-bold text-white">
                  {children}
                </strong>
              ),

              hr: () => (
                <hr className="my-10 border-slate-700" />
              ),

            code: ({ children }) => (
  <code className="whitespace-pre-wrap break-all rounded bg-slate-800 px-1 py-0.5 text-green-300">
    {children}
  </code>
),
table: ({ children }) => (
  <div className="my-6 w-full overflow-x-auto">
    <table className="min-w-full border-collapse text-sm">
      {children}
    </table>
  </div>
),

thead: ({ children }) => (
  <thead className="bg-slate-800">
    {children}
  </thead>
),

tbody: ({ children }) => (
  <tbody>
    {children}
  </tbody>
),

tr: ({ children }) => (
  <tr className="border-b border-slate-700">
    {children}
  </tr>
),

th: ({ children }) => (
  <th className="whitespace-nowrap px-4 py-2 text-left font-bold text-white">
    {children}
  </th>
),

td: ({ children }) => (
  <td className="px-4 py-2 whitespace-nowrap text-slate-200">
    {children}
  </td>
),
            }}
          >
            {content}
          </ReactMarkdown>

        </article>

      </div>

    </div>
  );
}
