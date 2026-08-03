import { createClient } from "@/lib/supabase/client";

export interface LibraryDocument {
  id: string;
  title: string;
  type:
    | "sermon"
    | "estudio"
    | "exegesis"
    | "devocional"
    | "griego"
    | "hebreo"
    | "ilustracion";

  content: string;
  createdAt: string;
}

const STORAGE_KEY = "pulpito-library";

export function getLibrary(): LibraryDocument[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function saveDocument(
  document: Omit<LibraryDocument, "id" | "createdAt">
) {
  if (typeof window === "undefined") return;

  const library = getLibrary();

  library.unshift({
    ...document,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}

export async function getLibraryFromSupabase(): Promise<LibraryDocument[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("sermones")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando biblioteca:", error);
    return [];
  }
return (data ?? []).map((item) => ({
  id: item.id,
  title: item.titulo ?? "",
  type: (item.tipo ?? "sermon") as LibraryDocument["type"],
  content: item.contenido ?? "",
  createdAt: item.created_at,
}));
}
