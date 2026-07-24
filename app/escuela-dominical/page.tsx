import AppLayout from "@/components/layout/AppLayout";
import AIWorkspace from "@/components/ai/AIWorkspace";

export default function EscuelaDominicalPage() {
  return (
    <AppLayout>
      <AIWorkspace
        mode="escuela"
        title="🏫 Escuela Dominical"
        placeholder="Ejemplo: Clase sobre el fruto del Espíritu"
      />
    </AppLayout>
  );
}