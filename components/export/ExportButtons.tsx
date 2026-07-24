"use client";

type Props = {
  text: string;
};

export default function ExportButtons({ text }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginTop: "20px",
        flexWrap: "wrap",
      }}
    >
      <button
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        📄 Word
      </button>

      <button
        style={{
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        📕 PDF
      </button>

      <button
        style={{
          background: "#16a34a",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        📋 Copiar
      </button>
    </div>
  );
}