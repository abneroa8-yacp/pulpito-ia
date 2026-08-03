import { createClient } from "@/lib/supabase/client";

export async function guardarSermon(
  titulo: string,
  tema: string,
  contenido: string,
  tipo: string = "sermon"
) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("Usuario no autenticado.");
  }

  const { error } = await supabase.from("sermones").insert({
  user_id: user.id,
  titulo,
  tema,
  contenido,
  tipo,
});

  if (error) throw error;
}

export async function eliminarSermon(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("sermones")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
