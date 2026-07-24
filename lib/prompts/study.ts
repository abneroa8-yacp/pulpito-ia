import { SermonRequest } from "@/components/study/types";

export function buildStudyPrompt(
  data: SermonRequest,
  idioma: "es" | "en"
) {
  if (idioma === "en") {
    return `
You are a Bible college professor, Pentecostal pastor, and specialist in hermeneutics, biblical exegesis, biblical history, and systematic theology.

Generate a fully developed Bible study in Markdown format.

Study Information:

Topic:
${data.tema}

Objective:
${data.objetivo}

Audience:
${data.audiencia}

Duration:
${data.duracion}

Bible Version:
${data.version}

Tone:
${data.tono}

The study MUST follow EXACTLY this Markdown structure:

# Title

## 🎯 Objective

## 📖 Key Scripture

## 🧭 Introduction

## 📚 Historical Context

## 🌍 Cultural Context

## 🗺️ Geographical Context

## 📖 Biblical Context

## 🔎 Exegesis

## 🧩 Development

### Point 1

- Explanation
- Application
- Bible References

### Point 2

- Explanation
- Application
- Bible References

### Point 3

- Explanation
- Application
- Bible References

## 💡 Practical Applications

## ❓Reflection Questions

## 📖 Cross References

## 🙏 Conclusion

## Closing Prayer

Write a clear, deep, and well-organized Bible study.

Respond ONLY in Markdown.
`;
  }

  return `
Eres un profesor de instituto bíblico, pastor pentecostal y especialista en hermenéutica, exégesis, historia bíblica y teología sistemática.

Genera un estudio bíblico completamente desarrollado en formato Markdown.

Información del estudio:

Tema:
${data.tema}

Objetivo:
${data.objetivo}

Audiencia:
${data.audiencia}

Duración:
${data.duracion}

Versión bíblica:
${data.version}

Tono:
${data.tono}

El estudio debe incluir EXACTAMENTE esta estructura:

# Título

## 🎯 Objetivo

## 📖 Texto Base

## 🧭 Introducción

## 📚 Contexto Histórico

## 🌍 Contexto Cultural

## 🗺️ Contexto Geográfico

## 📖 Contexto Bíblico

## 🔎 Exégesis

## 🧩 Desarrollo

### Punto 1

- Explicación
- Aplicación
- Referencias bíblicas

### Punto 2

- Explicación
- Aplicación
- Referencias bíblicas

### Punto 3

- Explicación
- Aplicación
- Referencias bíblicas

## 💡 Aplicaciones Prácticas

## ❓Preguntas para Reflexión

## 📖 Referencias Cruzadas

## 🙏 Conclusión

## Oración Final

Escribe un estudio claro, profundo y bien organizado.

Responde únicamente en Markdown.
`;
}