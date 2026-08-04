import AppLayout from "@/components/layout/AppLayout";
import { useLanguage } from "@/hooks/useLanguage";

export default function PerfilPage() {
  const { t } = useLanguage();

  return (
    <AppLayout>
      <div className="max-w-4xl">

        <h1 className="text-4xl font-bold text-white">
          👤 {t.profileTitle}
        </h1>

        <p className="mt-3 text-slate-400">
          {t.profileDescription}
        </p>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-xl font-semibold text-white">
            {t.profileUpcomingFeatures}
          </h2>

          <ul className="mt-6 space-y-4 text-slate-300">
            <li>✅ {t.profileChangePhoto}</li>
            <li>✅ {t.profileChangeName}</li>
            <li>✅ {t.profileUsername}</li>
            <li>✅ {t.profileChangePassword}</li>
            <li>✅ {t.profileManagePremium}</li>
          </ul>

        </div>

      </div>
    </AppLayout>
  );
}
