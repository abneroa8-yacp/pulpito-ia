"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { languages } from "@/lib/i18n";

import {
  Home,
  BookOpen,
  GraduationCap,
  BookMarked,
  Heart,
  Languages,
  ScrollText,
  Library,
  Lightbulb,
  Settings,
  Crown,
} from "lucide-react";

export default function Sidebar() {
  const [idioma, setIdioma] = useState<"es" | "en">("es");

  useEffect(() => {
    const guardado = localStorage.getItem("idioma") as "es" | "en" | null;
    if (guardado) setIdioma(guardado);
  }, []);

  const t = languages[idioma];

  return (
    <aside className="hidden md:flex w-72 h-screen bg-slate-950 border-r border-slate-800 text-white flex-col">
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-green-500">
          Púlpito IA
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          {t.assistant}
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-5 space-y-2">
        <MenuItem
          href="/dashboard"
          icon={<Home size={20} />}
          title={t.home}
        />

        <MenuItem
          href="/sermones"
          icon={<BookOpen size={20} />}
          title={t.sermons}
        />

        <MenuItem
          href="/estudios"
          icon={<GraduationCap size={20} />}
          title={t.studies}
        />

        <MenuItem
          href="/exegesis"
          icon={<BookMarked size={20} />}
          title={t.exegesis}
        />

        <MenuItem
          href="/devocionales"
          icon={<Heart size={20} />}
          title={t.devotionals}
        />

        <MenuItem
          href="/griego"
          icon={<Languages size={20} />}
          title={t.greek}
        />

        <MenuItem
          href="/hebreo"
          icon={<ScrollText size={20} />}
          title={t.hebrew}
        />

        <MenuItem
          href="/ilustraciones"
          icon={<Lightbulb size={20} />}
          title={t.illustrations}
        />

        <MenuItem
          href="/biblioteca"
          icon={<Library size={20} />}
          title={t.library}
        />

        {/* Premium */}
        <MenuItem
          href="/premium"
          icon={<Crown size={20} />}
          title="⭐ Go Premium"
        />
      </nav>

      <div className="border-t border-slate-800 p-5">
        <MenuItem
          href="/configuracion"
          icon={<Settings size={20} />}
          title={t.settings}
        />
      </div>
    </aside>
  );
}

function MenuItem({
  href,
  icon,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-900 hover:text-green-400 transition"
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}