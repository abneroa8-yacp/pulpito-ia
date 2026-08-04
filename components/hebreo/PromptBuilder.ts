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

Explain how the word or passage is pronounced.

# 📖 Meaning

Describe the primary meaning and important nuances of the Hebrew terms.

# 🔢 Strong's Number

Include this section only if requested.

# 📝 Morphology

Include this section only if requested.

If the user enters a complete passage, analyze ONLY the 5–10 most important Hebrew words or expressions.

Do NOT analyze every word of long passages.

If the user enters a single Hebrew word, provide a complete morphological analysis.

# 📚 Usage in the Old Testament

Mention where the word appears and how it is used throughout the Old Testament.

# 🔍 Exegetical Observations

Explain the significance of the passage within its biblical context.

# ❤️ Application for Study and Preaching

Develop practical pastoral applications.

## Practical Applications

Include several concrete applications useful for teaching and preaching.

## Homiletical Conclusion

Conclude with a pastoral summary appropriate for sermons.

Provide a clear, academically sound, and well-organized response.

IMPORTANT:

If the input is a complete passage, limit the morphology table to a maximum of 10 key terms.

Prioritize completing the sections:
- Exegetical Observations
- Application for Study and Preaching
- Practical Applications
- Homiletical Conclusion

Do not spend most of the response analyzing every Hebrew word.
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

Describe el significado principal y los matices más importantes del término o pasaje.

# 🔢 Número Strong

Inclúyelo únicamente si fue solicitado.

# 📝 Morfología

Inclúyela únicamente si fue solicitada.

# 📚 Uso en el Antiguo Testamento

Menciona dónde aparece y cómo se utiliza a lo largo del Antiguo Testamento.

# 🔍 Observaciones Exegéticas

Explica la importancia del texto dentro de su contexto bíblico.

# ❤️ Aplicación para el estudio y la predicación

Desarrolla aplicaciones pastorales y ministeriales.

## Aplicaciones prácticas

Incluye varias aplicaciones concretas útiles para enseñar y predicar.

## Conclusión homilética

Concluye con un resumen pastoral apropiado para la predicación.

Entrega una respuesta clara, académica, bien estructurada y útil para predicadores, maestros y estudiantes de la Biblia.

IMPORTANTE:

Si el usuario introduce un pasaje completo, limita la tabla morfológica a un máximo de 10 términos clave.

Prioriza completar siempre las siguientes secciones:

- Observaciones Exegéticas
- Aplicación para el estudio y la predicación
- Aplicaciones prácticas
- Conclusión homilética

No dediques la mayor parte de la respuesta a analizar todas las palabras hebreas.
`;
}
