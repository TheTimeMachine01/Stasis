"use client";

import React from "react";
import { Shield, Activity, Globe, Zap, AlertTriangle, ArrowUpRight, TrendingUp, Server, Cpu, Database, Plus, ChevronRight, BarChart3, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function NexusPage() {
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["alertStats"],
    queryFn: () => api.alerts.getAlertStats(),
    select: (res) => res.data?.getAlertStats,
    refetchInterval: 5000,
  });

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 max-w-[1600px] mx-auto pb-10 font-sans"
    >
      <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className={cn(
               "w-2.5 h-2.5 rounded-full animate-pulse",
               statsData?.unread > 0 ? "bg-red-500 glow-red" : "bg-blue-500 glow-primary"
             )} />
             <span className={cn(
               "text-[11px] uppercase tracking-wider font-bold",
               statsData?.unread > 0 ? "text-red-500" : "text-blue-400"
             )}>
               System Status: {statsData?.unread > 0 ? "Under Attack" : "Nominal"}
             </span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight flex items-baseline gap-4">
            Nexus Command <span className="text-blue-500/40 text-xl tracking-tight font-medium">V1.0.4</span>
          </h1>
          <p className="text-white/40 mt-3 text-base font-medium max-w-xl leading-relaxed">
            Unified orchestration layer for global infrastructure. Monitoring <span className="text-blue-400/60">12 active regions</span> with zero-latency telemetry.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden lg:flex flex-col items-end mr-6">
              <span className="text-[10px] text-white/20 uppercase font-bold tracking-wider mb-1">Infrastructure Uptime</span>
              <span className="text-lg font-bold text-white tracking-tighter">99.9998%</span>
           </div>
           <Button variant="outline" className="rounded-2xl border-white/10 bg-white/5 text-white/60 hover:text-white h-14 gap-3 px-6 border-gradient transition-all font-semibold">
              <Database className="w-5 h-5 text-blue-400" />
              <span className="text-xs uppercase tracking-wide">Snapshot</span>
           </Button>
           <Button className="rounded-2xl bg-blue-600 text-white font-bold glow-primary hover:scale-105 transition-all h-14 px-8 border-t border-white/20 text-xs uppercase tracking-wide">
              Deploy Aegis
           </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-8">
           <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <StatCard 
                title="Integrity Score" 
                value={statsLoading ? "..." : (statsData?.total > 100 ? "82.4%" : "99.9%")} 
                trend={statsData?.unread > 0 ? `-${statsData.unread}` : "+0.1%"} 
                icon={<Shield className="w-6 h-6 text-blue-400" />} 
                accentColor="blue"
              />
              <StatCard 
                title="Active Threats" 
                value={statsLoading ? "..." : (statsData?.unread || 0).toString()} 
                trend={statsData?.unread > 0 ? "Action Req" : "Stable"} 
                icon={<AlertTriangle className="w-6 h-6 text-red-400" />} 
                accentColor="red"
              />
              <StatCard 
                title="Global Traffic" 
                value="24.8 TB/s" 
                trend="+1.2%" 
                icon={<TrendingUp className="w-6 h-6 text-indigo-400" />} 
                accentColor="indigo"
              />
           </motion.div>

           <motion.div variants={itemVariants}>
              <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden group relative p-1 shadow-2xl">
                 <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 p-10">
                    <div className="flex items-center gap-6">
                       <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-xl shadow-blue-500/10">
                          <Activity className="w-8 h-8" />
                       </div>
                       <div>
                          <CardTitle className="text-2xl font-bold text-white tracking-tight uppercase">Infrastructure Pulse</CardTitle>
                          <CardDescription className="text-sm text-white/20 font-semibold tracking-tight mt-2">Cross-Regional Aggregate Analytics</CardDescription>
                       </div>
                    </div>
                    <div className="flex gap-2 glass-dark p-1.5 rounded-2xl border-white/10">
                       <Button variant="ghost" size="sm" className="text-[11px] font-bold text-white/40 px-4 rounded-xl hover:text-white transition-colors">1H</Button>
                       <Button variant="secondary" size="sm" className="text-[11px] font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-4 rounded-xl">24H</Button>
                       <Button variant="ghost" size="sm" className="text-[11px] font-bold text-white/40 px-4 rounded-xl hover:text-white transition-colors">7D</Button>
                    </div>
                 </CardHeader>
                 <CardContent className="px-10 pb-10">
                    <div className="h-72 w-full flex items-end gap-2.5 relative">
                       {[...Array(40)].map((_, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${30 + Math.random() * 70}%` }}
                            transition={{ duration: 1.5, delay: i * 0.03, repeat: Infinity, repeatType: 'mirror', ease: "easeInOut" }}
                            className="flex-1 bg-gradient-to-t from-blue-600/60 via-blue-500/30 to-blue-400/10 rounded-full min-w-[3px]"
                          />
                       ))}
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="text-[60px] font-bold text-white/[0.02] tracking-tighter select-none">REAL_TIME</div>
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>
        </div>

        <div className="xl:col-span-4 space-y-8">
           <motion.div variants={itemVariants}>
              <Card className="rounded-[2.5rem] overflow-hidden relative border-white/5 h-[360px] md:h-[400px] group bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl shadow-xl">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_100%)] animate-pulse" />
                 <CardContent className="p-10 relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                       <CardTitle className="text-xl font-bold text-white tracking-tight uppercase tracking-wide">Threat Origin</CardTitle>
                       <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                          <Globe className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
                       </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                       <div className="relative w-48 h-48">
                          <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-[ping_3s_infinite]" />
                          <div className="absolute inset-4 rounded-full border border-blue-500/20" />
                          <div className="absolute inset-8 rounded-full border border-blue-500/40" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-16 h-16 bg-blue-500/20 blur-2xl rounded-full" />
                             <div className="w-6 h-6 bg-blue-500 rounded-full glow-primary border-2 border-white/20" />
                          </div>
                       </div>
                    </div>
                    <div className="mt-8 space-y-3">
                       <div className="flex justify-between text-[11px] font-bold tracking-wider">
                          <span className="text-white/30 uppercase">Primary Hotspot</span>
                          <span className="text-blue-400 font-mono tracking-tight text-xs">EU-WEST-1</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 2, ease: "circOut" }}
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                          />
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>

           <motion.div variants={itemVariants}>
              <Card className="rounded-[2.5rem] p-8 border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl shadow-xl">
                 <CardTitle className="text-[11px] font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                       <Server className="w-4 h-4 text-indigo-400" />
                    </div>
                    Active Compute Nodes
                 </CardTitle>
                 <CardContent className="p-0 space-y-5">
                    <NodeItem id="VND-001" load={42} status="nominal" />
                    <NodeItem id="VND-002" load={88} status="warning" />
                    <NodeItem id="VND-003" load={12} status="nominal" />
                 </CardContent>
                 <Button variant="outline" className="w-full mt-8 h-12 rounded-2xl border-white/5 bg-white/5 text-[11px] font-bold text-white/40 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all uppercase tracking-wider">
                    Access Cluster Management
                 </Button>
              </Card>
           </motion.div>
        </div>

        <motion.div variants={itemVariants} className="md:col-span-12">
          <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden shadow-2xl p-1">
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between p-10 border-b border-white/5 gap-6">
              <div className="flex items-center gap-6">
                 <div className="p-4 rounded-2xl bg-white/5 text-white/40 border border-white/10 shadow-inner">
                    <Database className="w-8 h-8" />
                 </div>
                 <div>
                    <CardTitle className="text-2xl font-bold text-white tracking-tight uppercase">Event Intelligence Stream</CardTitle>
                    <CardDescription className="text-sm text-white/20 font-semibold tracking-tight mt-2">Immutable Forensics • Neural Threat Detection</CardDescription>
                 </div>
              </div>
              <Button variant="link" className="text-[11px] font-bold text-blue-400 uppercase tracking-widest gap-2 p-0 hover:no-underline hover:text-blue-300 transition-colors group font-bold">
                 Open Command Archives <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-2 bg-black/20">
              <LogLine time="12:44:02.124" level="CRITICAL" service="AEGIS" message="DDoS attempt mitigated from 182.16.4.12. Load balancing redirected to Shadow-Node." />
              <LogLine time="12:42:15.582" level="INFO" service="IDENTITY" message="Multi-factor challenge bypassed for authorized session: Vanguard-Alpha." />
              <LogLine time="12:40:08.910" level="WARN" service="PULSE" message="Anomalous traffic spike detected in region: EU-WEST-1." />
              <LogLine time="12:38:55.231" level="INFO" service="SYSTEM" message="Kernel integrity check passed. Current status: UNBREAKABLE." />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatCard({ title, value, trend, icon, accentColor }: { title: string, value: string, trend: string, icon: React.ReactNode, accentColor: string }) {
  const accentStyles = {
    blue: "shadow-blue-500/10 border-blue-500/20",
    indigo: "shadow-indigo-500/10 border-indigo-500/20",
    red: "shadow-red-500/10 border-red-500/20"
  }[accentColor as 'blue' | 'indigo' | 'red'];

  const isPositive = trend.includes('+') || trend === "Stable";

  return (
    <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent hover:bg-white/[0.06] transition-all duration-500 group p-8 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
         {icon}
      </div>
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className={cn("p-4 rounded-2xl border bg-white/[0.03] shadow-2xl transition-transform duration-500 group-hover:scale-110", accentStyles)}>
          {icon}
        </div>
        <Badge variant="outline" className={cn(
          "text-[10px] border-none px-3 py-1 font-bold tracking-wide rounded-full",
          isPositive ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"
        )}>
          {trend}
        </Badge>
      </div>
      <div className="text-white/30 text-[11px] font-bold uppercase tracking-wide mb-2 relative z-10">{title}</div>
      <div className="text-4xl font-bold text-white tracking-tighter relative z-10 group-hover:text-blue-400 transition-colors duration-500">{value}</div>
    </Card>
  );
}

function NodeItem({ id, load, status }: { id: string, load: number, status: 'nominal' | 'warning' }) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group">
       <div className="flex items-center gap-4">
          <div className={cn(
             "w-2.5 h-2.5 rounded-full transition-all duration-500",
             status === 'nominal' ? "bg-blue-500 glow-primary" : "bg-red-500 animate-pulse glow-red"
          )} />
          <span className="text-sm font-mono font-bold text-white/60 tracking-tight group-hover:text-white transition-colors">{id}</span>
       </div>
       <div className="flex items-center gap-6">
          <div className="text-[11px] font-bold text-white/20 uppercase tracking-wide group-hover:text-white/40 transition-colors">Load {load}%</div>
          <div className="w-20 h-2 bg-white/5 rounded-full overflow-hidden p-[1px]">
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${load}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className={cn(
                  "h-full rounded-full transition-all duration-500", 
                  status === 'nominal' ? "bg-blue-500 shadow-xl shadow-blue-500/50" : "bg-red-500"
                )} 
             />
          </div>
       </div>
    </div>
  );
}

function LogLine({ time, level, service, message }: { time: string, level: string, service: string, message: string }) {
  const levelVariant = {
    CRITICAL: "bg-red-500/10 text-red-400 border-red-500/20",
    WARN: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    INFO: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  }[level as 'CRITICAL' | 'WARN' | 'INFO'];

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-4 md:py-3 border-b border-white/[0.02] last:border-0 hover:bg-white/[0.03] px-5 rounded-2xl transition-all group cursor-default">
       <div className="flex items-center justify-between md:justify-start gap-4">
          <span className="text-[10px] font-mono text-white/20 w-24 group-hover:text-white/40 transition-colors">{time}</span>
          <div className={cn("text-[9px] font-bold flex justify-center py-1 px-3 rounded-full border tracking-wide", levelVariant)}>
            {level}
          </div>
       </div>
       <div className="flex items-center gap-3 flex-1">
          <span className="text-[10px] font-bold text-white/30 w-20 uppercase tracking-wider group-hover:text-blue-400 transition-colors">[{service}]</span>
          <span className="text-sm text-white/60 font-medium flex-1 truncate group-hover:text-white transition-colors">{message}</span>
       </div>
       <ChevronRight className="hidden md:block w-4 h-4 text-white/10 group-hover:text-blue-500 transition-all group-hover:translate-x-1" />
    </div>
  );
}
