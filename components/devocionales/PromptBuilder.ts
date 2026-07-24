import { DevotionalRequest } from "./types";

export function buildDevotionalPrompt(
  data: DevotionalRequest,
  idioma: "es" | "en"
) {
  if (idioma === "en") {
    return `
You are a Pentecostal pastor, theologian, and Christian writer.

Generate a completely original, practical, biblical, and inspiring devotional.

Information:

• Type: ${data.tipo}
• Topic or Passage: ${data.tema}
• Objective: ${data.objetivo}
• Audience: ${data.audiencia}
• Reading Time: ${data.tiempo}
• Bible Version: ${data.version}
• Tone: ${data.tono}

Adjust the length according to the selected reading time:

- 5 minutes → 300–500 words
- 10 minutes → 500–700 words
- 15 minutes → 700–900 words
- 20 minutes → 900–1200 words

The response MUST follow EXACTLY this Markdown structure:

# 📌 Title

## 📖 Key Scripture

## 📜 Bible Reading

## 🔎 Context

Briefly explain the historical and biblical context of the passage.

## ❤️ Reflection

Develop the main teaching in a clear, practical, and spiritually enriching way.

## ✅ Practical Application

How can a believer live out this truth today?

## 🙏 Prayer

Write a prayer related to the topic.

## 💬 Memory Verse

Include one key verse to memorize.

## ✍️ Today's Challenge

Suggest one practical action to apply today's teaching.

IMPORTANT:

- Everything must be completely original.
- Do not omit any section.
- Maintain a pastoral, biblical, and encouraging tone.
- Respond ONLY in Markdown.
`;
  }

  return `
Eres un pastor pentecostal, teólogo y escritor cristiano.

Genera un devocional completamente original, profundo, práctico y edificante.

Información:

• Tipo: ${data.tipo}
• Tema o Pasaje: ${data.tema}
• Objetivo: ${data.objetivo}
• Audiencia: ${data.audiencia}
• Tiempo de lectura: ${data.tiempo}
• Versión bíblica: ${data.version}
• Tono: ${data.tono}

La extensión debe ajustarse al tiempo de lectura:

- 5 minutos → 300–500 palabras.
- 10 minutos → 500–700 palabras.
- 15 minutos → 700–900 palabras.
- 20 minutos → 900–1200 palabras.

El resultado debe estar perfectamente estructurado en Markdown utilizando exactamente este formato:

# 📌 Título

## 📖 Texto Base

## 📜 Lectura Bíblica

## 🔎 Contexto

Explica brevemente el contexto histórico y bíblico del pasaje.

## ❤️ Reflexión

Desarrolla la enseñanza principal de forma clara y práctica.

## ✅ Aplicación Práctica

¿Cómo puede vivir esta enseñanza un creyente hoy?

## 🙏 Oración

Escribe una oración relacionada con el tema.

## 💬 Versículo para Memorizar

Incluye un versículo clave.

## ✍️ Desafío del Día

Propón una acción concreta para realizar hoy.

IMPORTANTE:

- Todo debe ser completamente original.
- No omitas ninguna sección.
- Mantén un tono pastoral y profundamente bíblico.
- Responde únicamente en Markdown.
`;
}