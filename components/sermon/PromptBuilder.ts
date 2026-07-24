import { SermonRequest } from "./types";
import { buildSermonPrompt as buildProfessionalPrompt } from "@/lib/prompts/sermon";

export function buildSermonPrompt(data: SermonRequest) {
  return buildProfessionalPrompt(data);
}