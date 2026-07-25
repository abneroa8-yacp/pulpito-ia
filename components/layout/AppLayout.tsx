import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FloatingMenu from "./FloatingMenu";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-950 overflow-x-hidden">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Topbar />

        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>

      </div>
<FloatingMenu />
    </div>
  );
}