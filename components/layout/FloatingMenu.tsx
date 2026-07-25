"use client";
import { useEffect, useState } from "react";
import { languages } from "@/lib/i18n";
import Link from "next/link";
import {
  Home,
  Library,
  Settings,
  Crown,
  PenSquare,
  X,
  BookOpen,
  GraduationCap,
  BookMarked,
  Heart,
  Languages,
  ScrollText,
  Lightbulb,
} from "lucide-react";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const [idioma, setIdioma] = useState<"es" | "en">("es");

useEffect(() => {
  const guardado = localStorage.getItem("idioma") as "es" | "en" | null;
  if (guardado) setIdioma(guardado);
}, []);

const t = languages[idioma];

const items = [
  { href: "/dashboard", icon: <Home size={20} />, label: t.home },
  { href: "/biblioteca", icon: <Library size={20} />, label: t.library },

  { href: "/sermones", icon: <BookOpen size={20} />, label: t.sermons },
  { href: "/estudios", icon: <GraduationCap size={20} />, label: t.studies },
  { href: "/exegesis", icon: <BookMarked size={20} />, label: t.exegesis },
  { href: "/devocionales", icon: <Heart size={20} />, label: t.devotionals },
  { href: "/griego", icon: <Languages size={20} />, label: t.greek },
  { href: "/hebreo", icon: <ScrollText size={20} />, label: t.hebrew },
  { href: "/ilustraciones", icon: <Lightbulb size={20} />, label: t.illustrations },

{ href: "/premium", icon: <Crown size={20} />, label: `⭐ ${t.premium}` },
  { href: "/configuracion", icon: <Settings size={20} />, label: t.settings },
];

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex max-h-[70vh] flex-col gap-3 overflow-y-auto md:hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-white shadow-lg hover:bg-slate-800"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-xl md:hidden"
      >
        {open ? <X size={28} /> : <PenSquare size={28} />}
      </button>
    </>
  );
}