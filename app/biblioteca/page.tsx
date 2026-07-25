import AppLayout from "@/components/layout/AppLayout";
import BibliotecaWorkspace from "@/components/biblioteca/BibliotecaWorkspace";
import Link from "next/link";
import { isPremium } from "@/lib/auth";

export default async function BibliotecaPage() {
  const premium = await isPremium();

  if (!premium) {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto py-20 text-center">

          <div className="text-7xl mb-6">🔒</div>

          <h1 className="text-4xl font-bold text-white">
            Biblioteca Premium
          </h1>

          <p className="mt-6 text-slate-400 text-lg">
            Guarda todos tus documentos y accede a ellos desde cualquier dispositivo.
            Esta función está disponible exclusivamente para usuarios Premium.
          </p>

          <div className="mt-10 rounded-2xl border border-green-600 bg-slate-900 p-8">

            <h2 className="text-2xl font-semibold text-white">
              ¿Qué obtienes?
            </h2>

            <ul className="mt-6 space-y-3 text-left text-slate-300">
              <li>✅ Guardar documentos ilimitados.</li>
              <li>✅ Guardar estudios bíblicos.</li>
              <li>✅ Guardar devocionales.</li>
              <li>✅ Exportar cuando quieras.</li>
              <li>✅ Todo sincronizado en la nube.</li>
            </ul>

            <Link
              href="/premium"
              className="mt-8 inline-block rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 transition"
            >
              🚀 Obtener Premium
            </Link>

          </div>

        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <BibliotecaWorkspace />
    </AppLayout>
  );
}