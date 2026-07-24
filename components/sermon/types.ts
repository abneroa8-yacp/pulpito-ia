export type SermonRequest = {
  tipo: string;
  tema: string;
  objetivo: string;
  audiencia: string;
  duracion: string;
  version: string;
  tono: string;
};

export type SermonResponse = {
  sermon: string;
};