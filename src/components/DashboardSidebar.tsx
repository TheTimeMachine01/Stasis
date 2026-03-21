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
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
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
    <Sidebar collapsible="icon" className="border-r border-white/5 bg-slate-950">
      <SidebarHeader className="p-4 flex flex-row items-center gap-3 h-[72px]">
        <div className="w-10 h-10 min-w-10 rounded-xl bg-cyan-500 flex items-center justify-center glow-cyan shrink-0">
          <Shield className="w-6 h-6 text-slate-950" />
        </div>
        <div className={cn("transition-all duration-300 overflow-hidden", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
           <span className="text-xl font-syne font-bold tracking-tighter text-white">
              STASIS
           </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 pt-4">
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
                    "h-12 rounded-xl transition-all gap-4 px-3",
                    isActive 
                      ? "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/15 border border-cyan-500/20" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Link href={link.href}>
                    <link.icon className={cn("w-5 h-5", isActive && "text-cyan-400")} />
                    <span className="font-semibold text-sm tracking-wide">{link.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/5 space-y-4">
        {!collapsed && <SystemHealth />}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton 
                  size="lg" 
                  className="h-14 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 p-2"
                >
                  <Avatar className="h-9 w-9 border border-white/10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-cyan-500/10 text-cyan-400 font-bold text-xs">VND</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-xs overflow-hidden">
                    <span className="font-bold text-slate-200 truncate w-full">Vanguard User</span>
                    <span className="text-slate-500 truncate w-full">Core Cluster</span>
                  </div>
                  <ChevronUp className="ml-auto w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] bg-slate-900 border-white/10 text-slate-200 rounded-xl p-2"
              >
                <DropdownMenuItem asChild className="rounded-lg focus:bg-white/5 focus:text-white cursor-pointer py-3 gap-3">
                   <Link href="/identity" className="flex items-center gap-3">
                      <User className="w-4 h-4" />
                      <span>Account Settings</span>
                   </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg focus:bg-red-500/10 focus:text-red-400 text-red-400 cursor-pointer py-3 gap-3">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
