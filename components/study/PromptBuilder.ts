import { SermonRequest } from "./types";

export function buildStudyPrompt(data: SermonRequest) {
  return `
Eres un pastor pentecostal, teólogo y maestro de Biblia.

Genera un estudio bíblico profundo, claro, práctico y completamente original.

Información:

• Tipo de estudio: ${data.tipo}
• Tema o Pasaje: ${data.tema}
• Objetivo: ${data.objetivo}
• Audiencia: ${data.audiencia}
• Duración aproximada: ${data.duracion}
• Versión bíblica: ${data.version}
• Tono: ${data.tono}

Estructura el estudio exactamente así en Markdown:

# 📌 Título

## 🎯 Objetivo

## 📖 Texto Base

## 📚 Introducción

## 🔎 Contexto Histórico y Bíblico

## 📖 Desarrollo

Desarrolla el estudio en varios puntos bien explicados.

## 💡 Aplicación Práctica

Explica cómo aplicar esta enseñanza hoy.

## ❓ Preguntas para Reflexionar

Incluye entre 5 y 8 preguntas.

## 🙏 Conclusión

Resume la enseñanza principal.

## 🤲 Oración Final

Escribe una oración relacionada con el tema.

IMPORTANTE:

- Todo debe ser completamente original.
- No omitas ninguna sección.
- Usa un lenguaje pastoral y fácil de entender.
- Responde únicamente en Markdown.
`;
}