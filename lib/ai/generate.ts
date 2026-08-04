import { openai } from "./openai";

export async function generateAIResponse(prompt: string) {
  console.log("🚀 Entrando a OpenAI");

  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: prompt,
    max_output_tokens: 8000,
  });

console.log(response);
  console.log("✅ OpenAI respondió");

console.log("LONGITUD RESPUESTA:", response.output_text.length);
console.log("PRIMEROS 300 CARACTERES:");
console.log(response.output_text.slice(0, 300));
console.log("ÚLTIMOS 300 CARACTERES:");
console.log(response.output_text.slice(-300));
console.log("USAGE:");
console.log(response.usage);
  
  return response.output_text;
}
