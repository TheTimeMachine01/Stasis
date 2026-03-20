import DashboardSidebar from "@/components/DashboardSidebar";
import BottomNav from "@/components/BottomNav";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-slate-950 text-slate-50">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          <div className="flex-1 overflow-y-auto pb-20 md:pb-0 px-6 py-8">
            {children}
          </div>
        </main>
        <BottomNav />
      </div>
    </AuthGuard>
  );
}
