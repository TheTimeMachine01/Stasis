"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import BottomNav from "@/components/BottomNav";
import AuthGuard from "@/components/AuthGuard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { motion, Variants } from "framer-motion";

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen bg-black text-slate-50 w-full relative overflow-hidden font-sans">
          {/* Background Effects matching Home Page */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-grid-white opacity-20" />
            <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] bg-blue-500/10 blur-[120px] rounded-full" />
            <div className="absolute -bottom-[40%] -right-[10%] w-[70%] h-[70%] bg-indigo-500/10 blur-[120px] rounded-full" />
          </div>

          <DashboardSidebar />
          
          <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative z-10">
            <header className="h-16 border-b border-white/5 flex items-center px-4 md:px-6 shrink-0 bg-black/40 backdrop-blur-xl z-20">
              <SidebarTrigger className="text-slate-400 hover:text-white transition-colors" />
              <div className="ml-4 h-4 w-[1px] bg-white/10 hidden md:block" />
              <div className="ml-4 hidden md:flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse glow-primary" />
                 <span className="text-[11px] font-semibold tracking-tight text-blue-400/80">Secure Connection Established</span>
              </div>
            </header>

            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto pb-24 md:pb-8 px-4 md:px-8 py-6 md:py-10 custom-scrollbar"
            >
              {children}
            </motion.div>
          </main>
          
          <BottomNav />
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}

// Ensure correct sidebar nesting if needed, though SidebarProvider should only be once. 
// Fixed double SidebarProvider in the write.
