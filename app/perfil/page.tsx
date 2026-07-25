import AppLayout from "@/components/layout/AppLayout";

export default function PerfilPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl">

        <h1 className="text-4xl font-bold text-white">
          👤 Mi Perfil
        </h1>

        <p className="text-slate-400 mt-3">
          Próximamente podrás administrar toda tu información desde aquí.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-xl font-semibold text-white">
            Funciones próximas
          </h2>

          <ul className="mt-6 space-y-4 text-slate-300">
            <li>✅ Cambiar foto de perfil</li>
            <li>✅ Cambiar nombre</li>
            <li>✅ Elegir nombre de usuario (@usuario)</li>
            <li>✅ Cambiar contraseña</li>
            <li>✅ Administrar suscripción Premium</li>
          </ul>

        </div>

      </div>
    </AppLayout>
  );
}