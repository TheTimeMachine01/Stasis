"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { Database, Zap, Server, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SystemHealth() {
  const { data: health, isLoading, error } = useQuery({
    queryKey: ["health"],
    queryFn: () => api.health.check(),
    refetchInterval: 10000, // Poll every 10s
    select: (res) => res.data,
  });

  const isHealthy = health?.app === "ok" && health?.db === "ok" && health?.valkey === "ok";

  return (
    <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white/[0.02] border border-white/5">
      <StatusItem 
        label="Core" 
        status={health?.app} 
        loading={isLoading} 
        icon={<Server className="w-3 h-3" />} 
      />
      <StatusItem 
        label="PostgreSQL" 
        status={health?.db} 
        loading={isLoading} 
        icon={<Database className="w-3 h-3" />} 
      />
      <StatusItem 
        label="Valkey" 
        status={health?.valkey} 
        loading={isLoading} 
        icon={<Zap className="w-3 h-3" />} 
      />
    </div>
  );
}

function StatusItem({ label, status, loading, icon }: { label: string, status?: string, loading: boolean, icon: React.ReactNode }) {
  const state = loading ? "loading" : status === "ok" ? "healthy" : "error";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1.5 cursor-help">
          <div className={cn(
            "w-2 h-2 rounded-full",
            state === "loading" && "bg-slate-600 animate-pulse",
            state === "healthy" && "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]",
            state === "error" && "bg-red-500 animate-ping shadow-[0_0_8px_rgba(239,68,68,0.5)]"
          )} />
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-tighter">{label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-slate-900 border-white/10 text-[10px] font-mono py-1 px-2">
        {state === "loading" ? "Syncing..." : `${label}: ${status?.toUpperCase() || "OFFLINE"}`}
      </TooltipContent>
    </Tooltip>
  );
}
