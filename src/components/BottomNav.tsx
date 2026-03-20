"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Activity, 
  Database, 
  Lock, 
  BarChart3 
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileLinks = [
  { name: "Nexus", href: "/nexus", icon: LayoutDashboard },
  { name: "Vigil", href: "/vigil", icon: Activity },
  { name: "Archive", href: "/archive", icon: Database },
  { name: "Aegis", href: "/aegis", icon: Lock },
  { name: "Pulse", href: "/pulse", icon: BarChart3 },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 px-4 py-2">
      <div className="flex items-center justify-between">
        {mobileLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-xl transition-all",
                isActive ? "text-cyan-400 bg-cyan-400/10" : "text-slate-400"
              )}
            >
              <link.icon className="w-6 h-6" />
              <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
