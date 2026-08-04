import { HebrewRequest } from "./types";

export function buildHebrewPrompt(
  data: HebrewRequest,
  idioma: "es" | "en"
) {
  if (idioma === "en") {
    return `
Act as a Biblical Hebrew professor, expert in Old Testament exegesis, Hebrew linguistics, and theology.

Analyze the following word or passage:

Word or Passage:
${data.palabra}

Bible Version:
${data.version}

Level:
${data.nivel}

${
  data.incluirStrong
    ? "Include the corresponding Strong's numbers."
    : ""
}

${
  data.incluirMorfologia
    ? "Include a complete morphological analysis."
    : ""
}

The response MUST be written in Markdown and thoroughly develop each section.

# 🇮🇱 Hebrew Text

Present the corresponding Hebrew text when applicable.

# 🔤 Transliteration

Provide the correct transliteration.

# 🗣 Pronunciation

Explain how the word is pronounced.

# 📖 Meaning

Describe the primary meaning and important nuances of the term.

# 🔢 Strong's Number

Include this section only if requested.

# 📝 Morphology

Include this section only if requested.

# 📚 Usage in the Old Testament

Mention where the word appears and how it is used.

# 🔍 Exegetical Observations

Explain the significance of the term within its biblical context.

# ❤️ Practical Application

Conclude with a practical application for Bible study and preaching.

Provide a clear, academically sound, and well-organized response.
`;
  }

  return `
Actúa como un profesor de Hebreo Bíblico, experto en exégesis del Antiguo Testamento, lingüística hebrea y teología.

Analiza la siguiente palabra o pasaje:

Palabra o pasaje:
${data.palabra}

Versión Bíblica:
${data.version}

Nivel:
${data.nivel}

${
  data.incluirStrong
    ? "Incluye los números Strong correspondientes."
    : ""
}

${
  data.incluirMorfologia
    ? "Incluye un análisis morfológico completo."
    : ""
}

La respuesta debe estar en formato Markdown y desarrollar ampliamente cada sección.

# 🇮🇱 Texto Hebreo

Presenta el texto hebreo correspondiente si aplica.

# 🔤 Transliteración

Incluye la transliteración correcta.

# 🗣 Pronunciación

Explica cómo se pronuncia.

# 📖 Significado

Describe el significado principal y los matices del término.

# 🔢 Número Strong

Inclúyelo únicamente si fue solicitado.

# 📝 Morfología

Inclúyela únicamente si fue solicitada.

# 📚 Uso en el Antiguo Testamento

Menciona dónde aparece y cómo se utiliza.

# 🔍 Observaciones Exegéticas

Explica la importancia del término dentro del contexto bíblico.

# ❤️ Aplicación

Concluye con una aplicación práctica para el estudio y la predicación.

Entrega una respuesta clara, académica y bien estructurada.
`;
}
