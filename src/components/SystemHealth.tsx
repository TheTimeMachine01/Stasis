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

  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner">
      <StatusItem 
        label="Core" 
        status={health?.app} 
        loading={isLoading} 
      />
      <div className="w-[1px] h-3 bg-white/10" />
      <StatusItem 
        label="DB" 
        status={health?.db} 
        loading={isLoading} 
      />
      <div className="w-[1px] h-3 bg-white/10" />
      <StatusItem 
        label="Valkey" 
        status={health?.valkey} 
        loading={isLoading} 
      />
    </div>
  );
}

function StatusItem({ label, status, loading }: { label: string, status?: string, loading: boolean }) {
  const state = loading ? "loading" : status === "ok" ? "healthy" : "error";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 cursor-help group">
          <div className={cn(
            "w-2 h-2 rounded-full transition-all duration-500",
            state === "loading" && "bg-white/20 animate-pulse",
            state === "healthy" && "bg-blue-500 glow-primary scale-110",
            state === "error" && "bg-red-500 animate-ping glow-red"
          )} />
          <span className="text-[10px] font-bold text-white/30 group-hover:text-white/60 transition-colors uppercase tracking-tight">{label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="glass-morphic border-white/10 text-[11px] font-medium py-2 px-3 rounded-xl mb-2 text-white shadow-2xl">
        <div className="flex items-center gap-2">
           <div className={cn("w-1.5 h-1.5 rounded-full", state === "healthy" ? "bg-blue-500" : "bg-red-500")} />
           <span className="tracking-tight">{state === "loading" ? "Syncing channels..." : `${label} Status: ${status?.toUpperCase() || "Offline"}`}</span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
