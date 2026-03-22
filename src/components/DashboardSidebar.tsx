"use client";

import * as React from "react";
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
  LogOut,
  ChevronUp,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SystemHealth } from "./SystemHealth";

const sidebarLinks = [
  { name: "Nexus", href: "/nexus", icon: LayoutDashboard },
  { name: "Vigil", href: "/vigil", icon: Activity },
  { name: "Archive", href: "/archive", icon: Database },
  { name: "Aegis", href: "/aegis", icon: Lock },
  { name: "Pulse", href: "/pulse", icon: BarChart3 },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5 bg-black/40 backdrop-blur-xl transition-all duration-300">
      <SidebarHeader className="p-4 flex flex-row items-center gap-3 h-[72px]">
        <Link href="/" className="flex items-center gap-3 group overflow-hidden">
          <div className="w-8 h-8 rounded-[0.5rem] bg-white flex items-center justify-center transition-all group-hover:scale-105 duration-500 shadow-sm shadow-white/10">
            <Shield className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
          <div className={cn(
            "transition-all duration-500 overflow-hidden flex flex-col", 
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
             <span className="text-xl font-bold tracking-tight text-white/90 leading-none">
                Stasis
             </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 pt-6 font-sans">
        <SidebarMenu className="gap-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <SidebarMenuItem key={link.name}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={link.name}
                  className={cn(
                    "h-12 rounded-2xl transition-all duration-300 gap-4 px-4 relative group overflow-hidden font-medium",
                    isActive 
                      ? "bg-white/5 text-white border border-white/10 shadow-lg shadow-white/5" 
                      : "text-white/40 hover:text-white hover:bg-white/[0.03] border border-transparent"
                  )}
                >
                  <Link href={link.href}>
                    <link.icon className={cn(
                      "w-5 h-5 transition-transform duration-300 group-hover:scale-110", 
                      isActive && "text-white"
                    )} />
                    <span className="text-[13px] tracking-tight">{link.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute left-0 w-1 h-6 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-4 bg-gradient-to-t from-black/60 to-transparent font-sans">
        {!collapsed && <SystemHealth />}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton 
                  size="lg" 
                  className="h-14 rounded-2xl text-white/40 hover:text-white hover:bg-white/[0.05] p-2 transition-colors border border-transparent hover:border-white/10"
                >
                  <Avatar className="h-9 w-9 border border-white/10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-white text-black font-bold text-xs">VN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-[11px] overflow-hidden ml-1">
                    <span className="font-bold text-white/80 truncate w-full tracking-tight">Vanguard Operative</span>
                    <span className="text-white/20 truncate w-full font-medium">Session Active</span>
                  </div>
                  <ChevronUp className="ml-auto w-4 h-4 opacity-20" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[--radix-popper-anchor-width] glass-morphic text-white/80 rounded-2xl p-2 mb-2 animate-in slide-in-from-bottom-2 duration-300 border-white/10 shadow-2xl"
              >
                <DropdownMenuItem asChild className="rounded-xl focus:bg-white/10 focus:text-white cursor-pointer py-3 gap-3 font-medium">
                   <Link href="/identity" className="flex items-center gap-3">
                      <Settings className="w-4 h-4" />
                      <span className="text-[12px]">Configuration</span>
                   </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl focus:bg-red-500/10 focus:text-red-400 text-red-400/80 cursor-pointer py-3 gap-3 font-medium">
                  <LogOut className="w-4 h-4" />
                  <span className="text-[12px]">Terminate Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
