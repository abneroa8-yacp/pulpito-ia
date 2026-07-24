import { buildDevotionalPrompt } from "@/components/devocionales/PromptBuilder";
import { buildExegesisPrompt } from "@/components/exegesis/PromptBuilder";
import { buildGreekPrompt } from "@/components/griego/PromptBuilder";
import { buildHebrewPrompt } from "@/components/hebreo/PromptBuilder";
import { buildIllustrationPrompt } from "@/components/ilustraciones/PromptBuilder";
import { generateAIResponse } from "@/lib/ai/generate";
import { buildSermonPrompt } from "@/lib/prompts/sermon";
import { buildStudyPrompt } from "@/lib/prompts/study";
import { createClient } from "@/lib/supabase/server";
import { checkUsage } from "@/lib/usage/checkUsage";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const idioma = data.idioma || "es";

    console.log("IDIOMA RECIBIDO:", idioma);

    console.log("=== DATA ===");
    console.log(data);
    console.log("TIPO:", data.tipo);
    console.log("TEMA:", data.tema);
    console.log("OBJETIVO:", data.objetivo);
    console.log("AUDIENCIA:", data.audiencia);
    console.log("TIEMPO:", data.tiempo);
    console.log("VERSION:", data.version);
    console.log("TONO:", data.tono);

    let prompt = "";

    switch (data.tipo) {
      case "estudio":
        prompt = buildStudyPrompt(data, idioma);
        break;

      case "devocional":
       prompt = buildDevotionalPrompt(data, idioma);
        break;

      case "exegesis":
        prompt = buildExegesisPrompt(data, idioma);
        break;

      case "griego":
        prompt = buildGreekPrompt(data, idioma);
        break;

      case "hebreo":
        prompt = buildHebrewPrompt(data, idioma);
        break;

      case "ilustracion":
        prompt = buildIllustrationPrompt(data, idioma);
        break;

      default:
        prompt = buildSermonPrompt(data);
        break;
    }

    const idiomaPrompt =
      idioma === "en"
        ? `
IMPORTANT:
Generate the ENTIRE response in fluent English.

- Write every heading in English.
- Write every explanation in English.
- Write every outline point in English.
- Write every application in English.
- Write every prayer in English.
- Quote Bible verses in English.
`
        : `
IMPORTANTE:

Genera TODA la respuesta en español.

- Todos los títulos en español.
- Todas las explicaciones en español.
- Todos los puntos en español.
- Todas las aplicaciones en español.
- Todas las oraciones en español.
- Cita los versículos en español.
`;

    prompt = `${idiomaPrompt}

${prompt}`;

    console.log("=== PROMPT ===");
    console.log(prompt);
    console.log("LONGITUD DEL PROMPT:", prompt.length);

    // ===========================
    // VERIFICAR LÍMITES ANTES DE OPENAI
    // ===========================

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("API USER:", user);

    if (user) {
      await checkUsage(user.id, idioma);
    }

    console.log("ANTES DE OPENAI");

    const respuesta = await generateAIResponse(prompt);

    console.log("DESPUÉS DE OPENAI");

    if (user) {
      const { error } = await supabase.from("sermones").insert({
        user_id: user.id,
        titulo: data.tema,
        tema: data.tema,
        contenido: respuesta,
      });

      console.log("INSERT ERROR:", error);
    } else {
      console.log("NO USER IN API");
    }

    console.log("LONGITUD RESPUESTA:", respuesta.length);

    console.log("=========== RESPUESTA IA ===========");
    console.log(respuesta);
    console.log("===================================");

    return Response.json({
      result: respuesta,
    });

  } catch (error) {
    console.error("ERROR COMPLETO:");
    console.error(error);

    const mensaje =
      error instanceof Error
        ? error.message
        : "Error interno del servidor.";

    const status =
      mensaje.toLowerCase().includes("límite") ||
      mensaje.toLowerCase().includes("limit")
        ? 429
        : 500;

    return Response.json(
      {
        error: mensaje,
      },
      {
        status,
      }
    );
  }
}