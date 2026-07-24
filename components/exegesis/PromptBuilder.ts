import { ExegesisRequest } from "./types";

export function buildExegesisPrompt(
  data: ExegesisRequest,
  idioma: "es" | "en"
) {
  if (idioma === "en") {
    return `
You are an expert biblical scholar specializing in historical-grammatical exegesis.

Prepare a complete biblical exegesis.

## Information

Bible Passage:
${data.pasaje}

Bible Version:
${data.version}

Audience:
${data.audiencia}

Depth:
${data.nivel}

---

The response MUST follow exactly this Markdown structure:

# Biblical Exegesis

## Main Theme

## Historical Context

## Literary Context

## Key Words

Explain the most important terms found in the passage.

## Verse-by-Verse Analysis

Provide a careful explanation of the text.

## Theological Principles

## Practical Application

## Conclusion

Keep the interpretation faithful to Scripture.

Do not invent doctrines or speculative interpretations.

Base your analysis on sound biblical hermeneutics.
`;
  }

  return `
Eres un erudito bíblico especializado en exégesis histórico-gramatical.

Realiza una exégesis bíblica completa.

## Información

Pasaje Bíblico:
${data.pasaje}

Versión Bíblica:
${data.version}

Audiencia:
${data.audiencia}

Nivel de profundidad:
${data.nivel}

---

La respuesta debe contener exactamente el siguiente formato en Markdown:

# Exégesis Bíblica

## Tema Principal

## Contexto Histórico

## Contexto Literario

## Palabras Clave

Explica los términos más importantes del pasaje.

## Análisis Versículo por Versículo

Realiza una explicación cuidadosa del texto.

## Principios Teológicos

## Aplicación Práctica

## Conclusión

Mantén una interpretación fiel a las Escrituras.

No inventes doctrinas ni interpretaciones especulativas.

Fundamenta el análisis utilizando una hermenéutica bíblica sólida.
`;
}