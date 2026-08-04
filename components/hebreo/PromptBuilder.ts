import { HebrewRequest } from "./types";

export function buildHebrewPrompt(
  data: HebrewRequest,
  idioma: "es" | "en"
) {
  if (idioma === "en") {
    return `
You are an expert professor in Biblical Hebrew, the Old Testament, biblical exegesis, and Hebrew linguistics.

Provide an extremely thorough analysis of:

"${data.palabra}"

Reference Bible Version:
${data.version}

Requested Level:
${data.nivel}

${data.incluirStrong ? "- Include the corresponding Strong's numbers." : ""}

${data.incluirMorfologia ? "- Include a detailed morphological analysis of each word." : ""}

The response MUST be perfectly organized in Markdown and contain the following sections:

# 🇮🇱 Hebrew Text

Present the original Hebrew text accurately.

# 🔤 Transliteration

Provide the complete transliteration.

# 🗣 Pronunciation

Explain how the text is pronounced.

# 📖 Literal Translation

Provide a word-for-word translation.

# 🔍 Lexical Meaning

Explain the meaning of each important term.

# 🔢 Strong's Numbers

Include Strong's numbers when requested.

# 📝 Morphology

Analyze:

- Root
- Gender
- Number
- State
- Person
- Verb Tense
- Verbal Aspect
- Grammatical Function

# 📚 Usage in the Old Testament

Explain where the word or expression appears elsewhere and how its meaning develops.

# 🌍 Historical and Cultural Context

Explain the Hebrew cultural and historical background that helps interpret the passage.

# ✝️ Theological Observations

Develop the main doctrinal principles.

# 🔎 Exegetical Observations

Provide a deep exegetical analysis of the passage.

# ❤️ Practical Application

Explain how this text should be applied today.

# 📚 Recommended Bibliography

Recommend lexicons, dictionaries, and scholarly commentaries.

The response should be academically rigorous, well-structured, and highly useful for pastors, Bible teachers, seminarians, and serious students of Scripture.
`;
  }

  return `
Eres un profesor experto en Hebreo Bíblico, Antiguo Testamento, exégesis y lingüística hebrea.

Realiza un análisis extremadamente completo de:

"${data.palabra}"

Versión bíblica de referencia:
${data.version}

Nivel solicitado:
${data.nivel}

${data.incluirStrong ? "- Incluye los números Strong correspondientes." : ""}

${data.incluirMorfologia ? "- Incluye un análisis morfológico detallado de cada palabra." : ""}

La respuesta debe estar perfectamente organizada utilizando Markdown y contener las siguientes secciones:

# 🇮🇱 Texto Hebreo

Presenta el texto original correctamente.

# 🔤 Transliteración

Escribe la transliteración completa.

# 🗣 Pronunciación

Explica cómo se pronuncia.

# 📖 Traducción literal

Ofrece una traducción palabra por palabra.

# 🔍 Significado léxico

Para cada palabra utiliza EXACTAMENTE este formato:

## Palabra

**Hebreo:**
...

**Transliteración:**
...

**Significado:**
...

**Strong:**
...

**Explicación:**
...

Nunca escribas una línea larga como:

נֶפֶשׁ — nephesh — "alma"

Cada dato debe ir en una línea diferente.

# 🔢 Números Strong

Incluye los números Strong cuando corresponda.

# 📝 Morfología

Analiza:

- Raíz
- Género
- Número
- Estado
- Persona
- Tiempo verbal
- Aspecto verbal
- Función gramatical

# 📚 Uso en el Antiguo Testamento

Explica dónde vuelve a aparecer esa palabra o expresión y cómo cambia su significado.

# 🌍 Contexto histórico y cultural

Explica el contexto hebreo que ayuda a comprender el texto.

# ✝️ Observaciones teológicas

Desarrolla los principios doctrinales principales.

# 🔎 Observaciones exegéticas

Realiza un análisis profundo del pasaje.

# ❤️ Aplicación práctica

Explica cómo aplicar correctamente el texto hoy.

# 📚 Bibliografía recomendada

Sugiere léxicos, diccionarios y comentarios especializados.

La respuesta debe ser muy profunda, académica, bien estructurada y útil para predicadores, maestros y estudiantes de seminario.
`;
}
