"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  LayoutDashboard, 
  Activity, 
  Database, 
  Lock, 
  BarChart3, 
  User,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const sidebarLinks = [
  { name: "Nexus", href: "/nexus", icon: LayoutDashboard },
  { name: "Vigil", href: "/vigil", icon: Activity },
  { name: "Archive", href: "/archive", icon: Database },
  { name: "Aegis", href: "/aegis", icon: Lock },
  { name: "Pulse", href: "/pulse", icon: BarChart3 },
];

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-slate-950 border-r border-white/5 transition-all duration-300 relative",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 min-w-10 rounded-xl bg-cyan-500 flex items-center justify-center glow-cyan">
          <Shield className="w-6 h-6 text-slate-950" />
        </div>
        {!collapsed && (
          <span className="text-xl font-syne font-bold tracking-tighter text-white">
            STASIS
          </span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-4 px-3 py-3 rounded-xl transition-all group relative",
                isActive 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon className={cn("w-5 h-5", isActive && "text-cyan-400")} />
              {!collapsed && (
                <span className="font-semibold text-sm tracking-wide">{link.name}</span>
              )}
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-full"
                />
              )}
              {collapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {link.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/5">
        <Link
          href="/identity"
          className={cn(
            "flex items-center gap-4 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all",
            pathname === "/identity" && "bg-white/5 text-white"
          )}
        >
          <User className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-semibold">Identity</span>}
        </Link>
        <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-2">
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-semibold">Sign Out</span>}
        </button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-cyan-500 transition-colors z-50"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
