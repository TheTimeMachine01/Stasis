"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Activity, 
  Database, 
  Lock, 
  BarChart3,
  Shield
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-t border-white/5 px-6 py-3 font-sans">
      <div className="flex items-center justify-between gap-2">
        {mobileLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-300 gap-1.5",
                isActive ? "text-white bg-white/10 shadow-lg shadow-white/5" : "text-white/30"
              )}
            >
              <link.icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
              <span className="text-[10px] font-bold tracking-tight">
                {link.name}
              </span>
            </Link>
          );
        })}
        
        <div className="w-[1px] h-8 bg-white/10 mx-1" />
        
        <Link href="/" className="flex flex-col items-center justify-center py-2 px-3">
           <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-md">
              <Shield className="w-4 h-4 text-black" strokeWidth={2.5} />
           </div>
        </Link>
      </div>
    </nav>
  );
}
