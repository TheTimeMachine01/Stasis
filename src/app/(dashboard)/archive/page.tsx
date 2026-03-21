"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Download, ChevronLeft, ChevronRight, Terminal, ShieldAlert, Cpu, Globe, ArrowUpRight, Maximize2, Loader2, Eye, Trash2, CheckCircle, BrainCircuit, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useSocket } from "@/context/SocketContext";
import { Separator } from "@/components/ui/separator";

export default function ArchivePage() {
  const [activeLevel, setActiveLevel] = useState("ALL");
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const { subscribe, connected } = useSocket();
  const queryClient = useQueryClient();

  // Fetch historical forensics from GraphQL
  const { data: historicalData, isLoading } = useQuery({
    queryKey: ['alerts', activeLevel],
    queryFn: () => api.alerts.list({ 
      level: activeLevel === "ALL" ? undefined : activeLevel,
      limit: 50 
    }),
    select: (res) => res.data?.listAlerts || [],
  });

  // Sync historical data to local state
  useEffect(() => {
    if (historicalData) {
      setLogs(historicalData);
    }
  }, [historicalData]);

  // Management Mutations
  const markReadMutation = useMutation({
    mutationFn: (id: string) => api.alerts.markRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.alerts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      setSelectedAlert(null);
    },
  });

  // Subscribe to live threats
  useEffect(() => {
    if (connected) {
      const unsubscribe = subscribe("/topic/alerts", (newAlert) => {
        setLogs((prev) => [newAlert, ...prev].slice(0, 100));
      });
      return () => unsubscribe();
    }
  }, [connected, subscribe]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto h-full flex flex-col pb-10">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Terminal className="w-6 h-6" />
           </div>
           <div>
              <h1 className="text-3xl font-syne font-bold text-white tracking-tight">The Archive</h1>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1 font-bold italic">Forensic Event Stream • GraphQL Enabled</p>
           </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
           <div className="hidden xl:flex items-center gap-6 mr-6 border-r border-white/10 pr-6">
              <div className="text-right">
                 <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Stream Rate</div>
                 <div className="text-sm font-bold text-white font-mono tracking-tighter">{connected ? "1.2k/s" : "0.0k/s"}</div>
              </div>
              <div className="text-right">
                 <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Retention</div>
                 <div className="text-sm font-bold text-white font-mono tracking-tighter">365D</div>
              </div>
           </div>
           
           <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-400 transition-colors z-10" />
              <Input 
                type="text" 
                placeholder="QUERY_STREAM..." 
                className="pl-12 h-12 bg-white/5 border-white/10 rounded-xl font-mono text-cyan-400 placeholder:text-slate-700 focus-visible:ring-cyan-500/30 transition-all w-full"
              />
           </div>

           <Button variant="outline" className="rounded-xl border-white/5 bg-white/5 text-slate-400 hover:text-white h-12 gap-2 px-4">
              <Download className="w-4 h-4" />
              Export
           </Button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
         <FilterTab label="ALL" active={activeLevel === "ALL"} onClick={() => setActiveLevel("ALL")} />
         <FilterTab label="CRITICAL" color="text-red-400" active={activeLevel === "CRITICAL"} onClick={() => setActiveLevel("CRITICAL")} />
         <FilterTab label="HIGH" color="text-orange-400" active={activeLevel === "HIGH"} onClick={() => setActiveLevel("HIGH")} />
         <FilterTab label="MEDIUM" color="text-yellow-400" active={activeLevel === "MEDIUM"} onClick={() => setActiveLevel("MEDIUM")} />
         <FilterTab label="LOW" color="text-blue-400" active={activeLevel === "LOW"} onClick={() => setActiveLevel("LOW")} />
      </div>

      {/* Logs Card */}
      <Card className="flex-1 rounded-[2rem] border-white/5 bg-slate-900/20 overflow-hidden flex flex-col min-h-0">
         <div className="flex-1 overflow-auto">
            <Table>
               <TableHeader className="bg-white/5 sticky top-0 z-10 backdrop-blur-md">
                  <TableRow className="border-b border-white/10 hover:bg-transparent">
                     <TableHead className="px-8 h-14 font-mono text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">UTC_TIMESTAMP</TableHead>
                     <TableHead className="px-8 h-14 font-mono text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold text-center">LVL</TableHead>
                     <TableHead className="px-8 h-14 font-mono text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">ATTACK_TYPE</TableHead>
                     <TableHead className="px-8 h-14 font-mono text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">EVENT_DESCRIPTION</TableHead>
                     <TableHead className="px-8 h-14 font-mono text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold text-right">ACTION</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody className="font-mono text-[11px]">
                  {isLoading && logs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-64 text-center">
                        <div className="flex flex-col items-center gap-4 text-slate-500">
                          <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                          <span className="font-mono uppercase tracking-widest text-[10px]">Synchronizing Forensics...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : logs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-64 text-center">
                        <span className="font-mono uppercase tracking-widest text-[10px] text-slate-600 text-shadow-cyan">No Forensic Events Detected</span>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <AnimatePresence initial={false}>
                      {logs.map((log) => (
                        <motion.tr 
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          key={log.id} 
                          className={cn(
                            "group border-b border-white/[0.03] hover:bg-cyan-500/[0.03] transition-colors cursor-pointer",
                            !log.read && "bg-cyan-500/[0.01]"
                          )}
                          onClick={() => setSelectedAlert(log)}
                        >
                           <TableCell className="px-8 py-4 text-slate-500 whitespace-nowrap group-hover:text-slate-400 transition-colors">
                             {new Date(log.timestamp || log.detectedAt).toLocaleString()}
                           </TableCell>
                           <TableCell className="px-8 py-4 text-center">
                              <Badge variant={log.level === 'CRITICAL' ? 'destructive' : 'secondary'} className={cn(
                                 "font-bold tracking-tighter text-[9px] h-5 px-2 py-0 uppercase min-w-[70px] justify-center",
                                 (log.level === 'LOW' || log.level === 'INFO') && "bg-blue-500/10 text-blue-500 border-blue-500/20",
                                 (log.level === 'MEDIUM' || log.level === 'WARN') && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                                 (log.level === 'HIGH' || log.level === 'ERROR') && "bg-orange-500/10 text-orange-500 border-orange-500/20",
                              )}>
                                 {log.level}
                              </Badge>
                           </TableCell>
                           <TableCell className="px-8 py-4">
                              <div className="flex items-center gap-2">
                                 <Zap className="w-3.5 h-3.5 text-cyan-500" />
                                 <span className="text-cyan-500/80 group-hover:text-cyan-400 transition-colors font-bold uppercase tracking-tight">
                                   {log.attack_type || "ANOMALY"}
                                 </span>
                              </div>
                           </TableCell>
                           <TableCell className="px-8 py-4 text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed max-w-xl">
                              {log.title || log.message}
                           </TableCell>
                           <TableCell className="px-8 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 {!log.read && (
                                   <Button 
                                     variant="ghost" 
                                     size="icon" 
                                     className="h-8 w-8 text-cyan-500 hover:bg-cyan-500/10"
                                     onClick={(e) => { e.stopPropagation(); markReadMutation.mutate(log.id); }}
                                   >
                                     <CheckCircle className="w-4 h-4" />
                                   </Button>
                                 )}
                                 <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold text-slate-600 hover:text-cyan-400 uppercase tracking-widest hover:bg-transparent">
                                    Inspect <ArrowUpRight className="w-3 h-3 ml-1" />
                                 </Button>
                              </div>
                           </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  )}
               </TableBody>
            </Table>
         </div>
         
         {/* Footer Status Bar */}
         <div className="p-6 border-t border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-xl shrink-0">
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]",
                    !connected && "bg-red-500 shadow-none animate-none"
                  )} />
                  <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
                    {connected ? "Live_Stream: VND-HUB-NYC-01" : "Disconnected_from_Valkey"}
                  </span>
               </div>
               <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-slate-600 uppercase tracking-widest font-bold">
                  <span>Latency: <span className="text-slate-300">{connected ? "12ms" : "---"}</span></span>
                  <span>Packet_Loss: <span className="text-slate-300">0.00%</span></span>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-tighter">
                  SHW: <span className="text-slate-300">1-{logs.length}</span> / TOT: <span className="text-slate-300">{logs.length}</span>
               </div>
               <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg bg-white/5 border-white/5 text-slate-500 hover:text-white disabled:opacity-30">
                     <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg bg-white/5 border-white/5 text-slate-500 hover:text-white">
                     <ChevronRight className="w-4 h-4" />
                  </Button>
               </div>
            </div>
         </div>
      </Card>

      {/* Alert Detail Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={(open) => !open && setSelectedAlert(null)}>
        <DialogContent className="max-w-2xl bg-slate-900 border-white/10 text-white rounded-[2rem]">
          {selectedAlert && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={selectedAlert.level === 'CRITICAL' ? 'destructive' : 'secondary'} className="font-mono text-[10px]">
                    {selectedAlert.level}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-500">{new Date(selectedAlert.timestamp).toLocaleString()}</span>
                </div>
                <DialogTitle className="text-2xl font-syne font-bold leading-tight">
                  {selectedAlert.title || selectedAlert.message}
                </DialogTitle>
                <DialogDescription className="text-slate-400 font-medium">
                  Forensic ID: <span className="text-cyan-400 font-mono text-xs">{selectedAlert.id}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 my-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Source IP</div>
                    <div className="text-sm font-bold font-mono text-white">{selectedAlert.source || "N/A"}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Detection Method</div>
                    <div className="text-sm font-bold font-mono text-white">{selectedAlert.detection_method || "Heuristic"}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <BrainCircuit className="w-5 h-5" />
                    <h4 className="text-sm font-syne font-bold uppercase tracking-widest">Nvidia AI Analysis</h4>
                  </div>
                  <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-sm text-slate-300 leading-relaxed italic">
                        "{selectedAlert.details || selectedAlert.message || "Deep neural analysis indicates a high-probability anomaly matching known attack signatures."}"
                      </p>
                    </div>
                    <BrainCircuit className="absolute -right-4 -bottom-4 w-24 h-24 text-cyan-500/5 rotate-12" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Integrity Confidence</div>
                      <div className="text-sm font-bold text-white font-mono">{(selectedAlert.confidence || 0.95) * 100}%</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 uppercase font-mono text-[9px]">ENFORCED</Badge>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button 
                  variant="outline" 
                  className="rounded-xl border-white/10 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  onClick={() => deleteMutation.mutate(selectedAlert.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Dismiss Alert
                </Button>
                {!selectedAlert.read && (
                  <Button 
                    className="rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 glow-cyan"
                    onClick={() => markReadMutation.mutate(selectedAlert.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Resolved
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FilterTab({ label, color, active, onClick }: { label: string, color?: string, active?: boolean, onClick: () => void }) {
  return (
    <Button 
      variant="outline"
      onClick={onClick}
      className={cn(
        "h-10 px-6 rounded-xl text-[10px] font-mono font-bold tracking-[0.2em] border transition-all flex items-center gap-3",
        active 
          ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
          : "bg-white/5 border-white/10 text-slate-500 hover:text-slate-300 hover:bg-white/[0.08] hover:border-white/20"
      )}
    >
      <span className={cn(active ? color : "opacity-50")}>{label}</span>
    </Button>
  );
}

