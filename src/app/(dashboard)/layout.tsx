import DashboardSidebar from "@/components/DashboardSidebar";
import BottomNav from "@/components/BottomNav";
import AuthGuard from "@/components/AuthGuard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen bg-slate-950 text-slate-50 w-full">
          <DashboardSidebar />
          <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
            <header className="h-16 border-b border-white/5 flex items-center px-4 md:px-6 shrink-0 bg-slate-950/50 backdrop-blur-sm z-20">
              <SidebarTrigger className="text-slate-400 hover:text-white" />
            </header>
            <div className="flex-1 overflow-y-auto pb-20 md:pb-0 px-6 py-8">
              {children}
            </div>
          </main>
          <BottomNav />
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
