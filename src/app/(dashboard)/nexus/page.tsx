"use client";

import React from "react";
import { Shield, Activity, Globe, Zap, AlertTriangle, ArrowUpRight, TrendingUp, Server, Cpu, Database, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export default function NexusPage() {
  // Fetch real-time stats from GraphQL
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["alertStats"],
    queryFn: () => api.alerts.getStats(),
    select: (res) => res.data?.getAlertStats,
    refetchInterval: 5000,
  });

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <div className={cn(
               "w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]",
               statsData?.unread > 0 ? "bg-red-500 shadow-red-500" : "bg-cyan-500"
             )} />
             <span className={cn(
               "font-mono text-[10px] uppercase tracking-[0.3em]",
               statsData?.unread > 0 ? "text-red-500" : "text-cyan-500"
             )}>
               System Status: {statsData?.unread > 0 ? "Under Attack" : "Nominal"}
             </span>
          </div>
          <h1 className="text-4xl font-syne font-bold text-white tracking-tight">
            Nexus Command <span className="text-slate-700 font-light ml-2 text-2xl">v1.0.4</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden lg:flex flex-col items-end mr-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Uptime</span>
              <span className="text-sm font-bold text-white font-mono tracking-tighter">99.9998%</span>
           </div>
           <Button variant="outline" className="rounded-xl border-white/5 bg-white/5 hover:bg-white/10 gap-2 h-11">
              <Database className="w-4 h-4 text-cyan-400" />
              Snapshot
           </Button>
           <Button className="rounded-xl bg-cyan-500 text-slate-950 font-bold glow-cyan hover:scale-105 transition-transform gap-2 h-11 px-6">
              <Shield className="w-4 h-4" />
              Deploy Aegis
           </Button>
        </div>
      </header>

      {/* High-Density Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Primary Metrics */}
        <div className="md:col-span-8 space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard 
                title="Integrity Score" 
                value={statsLoading ? "..." : (statsData?.total > 100 ? "82.4%" : "99.9%")} 
                trend={statsData?.unread > 0 ? `-${statsData.unread}` : "+0.1%"} 
                icon={<Shield className="w-5 h-5" />} 
                chartColor={statsData?.unread > 5 ? "red" : "cyan"}
              />
              <StatCard 
                title="Active Threats" 
                value={statsLoading ? "..." : (statsData?.unread || 0).toString()} 
                trend={statsData?.unread > 0 ? "ACTION REQ" : "STABLE"} 
                icon={<AlertTriangle className="w-5 h-5" />} 
                chartColor={statsData?.unread > 0 ? "red" : "blue"}
              />
              <StatCard 
                title="Global Traffic" 
                value="24.8 TB/s" 
                trend="+1.2%" 
                icon={<TrendingUp className="w-5 h-5" />} 
                chartColor="blue"
              />
           </div>

           {/* Large Activity Overview */}
           <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 overflow-hidden group relative">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-8">
                 <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                       <Activity className="w-6 h-6" />
                    </div>
                    <div>
                       <CardTitle className="text-xl font-syne font-bold text-white">Infrastructure Pulse</CardTitle>
                       <CardDescription className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Cross-Regional Aggregate</CardDescription>
                    </div>
                 </div>
                 <div className="flex gap-2 bg-black/20 p-1 rounded-xl border border-white/5">
                    <Button variant="ghost" size="xs" className="text-[10px] font-bold text-slate-500 px-3 py-1">1H</Button>
                    <Button variant="secondary" size="xs" className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 px-3 py-1">24H</Button>
                    <Button variant="ghost" size="xs" className="text-[10px] font-bold text-slate-500 px-3 py-1">7D</Button>
                 </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                 <div className="h-64 w-full flex items-end gap-2 relative">
                    {[...Array(40)].map((_, i) => (
                       <motion.div 
                         key={i}
                         initial={{ height: 0 }}
                         animate={{ height: `${20 + Math.random() * 80}%` }}
                         transition={{ duration: 1, delay: i * 0.02, repeat: Infinity, repeatType: 'mirror' }}
                         className="flex-1 bg-gradient-to-t from-cyan-500/40 to-cyan-500/10 rounded-t-[2px] min-w-[2px]"
                       />
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <div className="text-[40px] font-bold text-white/5 font-syne uppercase tracking-[0.5em]">REAL_TIME</div>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </div>

        {/* Right Column: High-Density Info */}
        <div className="md:col-span-4 space-y-6">
           {/* Mini Globe/Map Tile */}
           <Card className="rounded-[2rem] overflow-hidden relative border-white/5 h-[320px] group bg-slate-900/40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_100%)] animate-pulse" />
              <CardContent className="p-6 relative z-10 flex flex-col h-full">
                 <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg font-syne font-bold text-white">Threat Origin</CardTitle>
                    <Globe className="w-5 h-5 text-cyan-500/50 group-hover:text-cyan-500 transition-colors" />
                 </div>
                 <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-40 h-40">
                       <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" />
                       <div className="absolute inset-2 rounded-full border border-cyan-500/40" />
                       <div className="absolute inset-4 rounded-full border border-cyan-500/60" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-cyan-500/20 blur-xl rounded-full" />
                          <div className="w-4 h-4 bg-cyan-500 rounded-full glow-cyan" />
                       </div>
                    </div>
                 </div>
                 <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                       <span className="text-slate-500 uppercase tracking-widest">Primary Region</span>
                       <span className="text-white font-bold">EU-WEST-1</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full w-3/4 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                    </div>
                 </div>
              </CardContent>
           </Card>

           {/* Active Nodes Card */}
           <Card className="rounded-[2rem] p-6 border-white/5 bg-slate-900/40">
              <CardTitle className="text-sm font-syne font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                 <Server className="w-4 h-4 text-cyan-400" />
                 Active Compute Nodes
              </CardTitle>
              <CardContent className="p-0 space-y-4">
                 <NodeItem id="VND-001" load={42} status="nominal" />
                 <NodeItem id="VND-002" load={88} status="warning" />
                 <NodeItem id="VND-003" load={12} status="nominal" />
              </CardContent>
              <Button variant="outline" className="w-full mt-6 py-5 rounded-xl border-white/5 bg-white/5 text-[10px] font-bold text-slate-500 hover:text-cyan-400 hover:bg-white/10 hover:border-cyan-500/20 transition-all uppercase tracking-[0.2em]">
                 Manage Cluster
              </Button>
           </Card>
        </div>

        {/* Bottom Wide Section: Event Stream */}
        <div className="md:col-span-12">
          <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-white/5">
              <div className="flex items-center gap-4">
                 <div className="p-3 rounded-2xl bg-white/5 text-slate-400 border border-white/10">
                    <Database className="w-6 h-6" />
                 </div>
                 <div>
                    <CardTitle className="text-xl font-syne font-bold text-white uppercase tracking-tight">Vanguard Event Stream</CardTitle>
                    <CardDescription className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Immutable Forensics • Live Logs</CardDescription>
                 </div>
              </div>
              <Button variant="link" className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest gap-1 p-0 hover:no-underline hover:text-cyan-300">
                 View All Logs <ArrowUpRight className="w-3 h-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 space-y-1">
              <LogLine time="12:44:02.124" level="CRITICAL" service="FIREWALL" message="DDoS attempt mitigated from 182.16.4.12. Magnitude: 4.2 Gbps." />
              <LogLine time="12:42:15.582" level="INFO" service="IAM-SERVICE" message="New API Key generated for service: Pulse-Lambda." />
              <LogLine time="12:40:08.910" level="WARN" service="METRIC-COLLECTOR" message="Traffic spike detected in EU-West-1 region." />
              <LogLine time="12:38:55.231" level="INFO" service="POLICY-ENGINE" message="RBAC rules updated by Administrator." />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, chartColor }: { title: string, value: string, trend: string, icon: React.ReactNode, chartColor: string }) {
  const colors = {
    cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    red: "text-red-400 bg-red-400/10 border-red-400/20"
  }[chartColor as 'cyan' | 'blue' | 'red'];

  const isPositive = trend.startsWith('+');

  return (
    <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all group p-6">
      <div className="flex items-center justify-between mb-6">
        <div className={cn("p-3 rounded-2xl border", colors)}>
          {icon}
        </div>
        <Badge variant="outline" className={cn(
          "font-mono text-[10px] border-none px-2 py-1",
          isPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
        )}>
          {trend}
        </Badge>
      </div>
      <div className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-1 font-bold">{title}</div>
      <div className="text-3xl font-bold text-white font-mono tracking-tighter">{value}</div>
    </Card>
  );
}

function NodeItem({ id, load, status }: { id: string, load: number, status: 'nominal' | 'warning' }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
       <div className="flex items-center gap-3">
          <div className={cn(
             "w-2 h-2 rounded-full",
             status === 'nominal' ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" : "bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]"
          )} />
          <span className="text-xs font-mono font-bold text-slate-300 tracking-tight">{id}</span>
       </div>
       <div className="flex items-center gap-3">
          <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">LOAD: {load}%</div>
          <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
             <div className={cn("h-full rounded-full", status === 'nominal' ? "bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.4)]" : "bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.4)]")} style={{ width: `${load}%` }} />
          </div>
       </div>
    </div>
  );
}

function LogLine({ time, level, service, message }: { time: string, level: string, service: string, message: string }) {
  const levelVariant = {
    CRITICAL: "destructive",
    WARN: "secondary",
    INFO: "outline"
  }[level as 'CRITICAL' | 'WARN' | 'INFO'] as "destructive" | "secondary" | "outline";

  return (
    <div className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-3 rounded-xl transition-colors group">
       <span className="text-[10px] font-mono text-slate-600 w-24">{time}</span>
       <Badge variant={levelVariant} className="text-[9px] font-bold font-mono w-20 justify-center h-5 py-0 px-0">
         {level}
       </Badge>
       <span className="text-[10px] font-bold font-mono text-slate-400 w-24">[{service}]</span>
       <span className="text-sm text-slate-300 font-medium flex-1 truncate">{message}</span>
       <ArrowUpRight className="w-3 h-3 text-slate-700 group-hover:text-cyan-400 transition-colors" />
    </div>
  );
}

