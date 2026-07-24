export const MODELS = {
  FAST: "gpt-4.1-mini",
  SMART: "gpt-5",
  BEST: "gpt-5.5",
} as const;

export type AIModel = keyof typeof MODELS;