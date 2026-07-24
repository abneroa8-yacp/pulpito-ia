"use client";

import { useEffect, useState } from "react";
import { languages } from "@/lib/i18n";

export default function Navbar() {
  const [idioma, setIdioma] = useState<"es" | "en">("es");

  useEffect(() => {
    const guardado = localStorage.getItem("idioma") as "es" | "en" | null;
    if (guardado) setIdioma(guardado);
  }, []);

  const t = languages[idioma];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 60px",
        background: "#07111f",
        borderBottom: "1px solid #1f2f4d",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <h2
        style={{
          color: "#22c55e",
          margin: 0,
          fontSize: "30px",
        }}
      >
        📖 Púlpito IA
      </h2>

      <div
        style={{
          display: "flex",
          gap: "30px",
          fontSize: "18px",
        }}
      >
        <a href="/" style={{ color: "white", textDecoration: "none" }}>
          {t.home}
        </a>

        <a href="/herramientas" style={{ color: "white", textDecoration: "none" }}>
          Herramientas
        </a>

        <a href="/sermones" style={{ color: "white", textDecoration: "none" }}>
          {t.sermons}
        </a>

        <a href="/ebooks" style={{ color: "white", textDecoration: "none" }}>
          eBooks
        </a>

        <a href="/contacto" style={{ color: "white", textDecoration: "none" }}>
          Contacto
        </a>
      </div>

      <button
        style={{
          background: "#16a34a",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {idioma === "es" ? "Iniciar sesión" : "Sign in"}
      </button>
    </nav>
  );
}