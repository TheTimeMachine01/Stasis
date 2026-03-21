"use client";

import React, { useState } from "react";
import { Lock, Shield, ShieldCheck, ShieldAlert, Globe, Key, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function AegisPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-syne font-bold text-white tracking-tight">Aegis Security</h1>
          <p className="text-slate-400 font-medium mt-1">Configure and enforce unbreakable equilibrium protocols.</p>
        </div>
        <div className="flex items-center gap-3">
           <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 py-1.5 px-4 rounded-xl gap-2 font-mono text-[10px] uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" />
              Infrastructure Protected
           </Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Policy Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 overflow-hidden">
             <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-syne font-bold text-white flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Shield className="w-5 h-5" />
                   </div>
                   Network Firewall Protocols
                </CardTitle>
                <CardDescription className="text-slate-500 font-medium">Standard layer 4-7 traffic filtering policies.</CardDescription>
             </CardHeader>
             <CardContent className="p-8 pt-4 space-y-4">
                <PolicyToggle 
                  title="Aggressive DDoS Mitigation" 
                  description="Automatically scales distributed filters during high-velocity traffic spikes."
                  defaultEnabled
                />
                <PolicyToggle 
                  title="Geo-Blocking (High Risk)" 
                  description="Restrict traffic from regions with high historical threat scores."
                />
                <PolicyToggle 
                  title="Deep Packet Inspection" 
                  description="Analyze payload content for signature-based malware detection."
                  defaultEnabled
                />
             </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 overflow-hidden">
             <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-syne font-bold text-white flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Lock className="w-5 h-5" />
                   </div>
                   Access Control & RBAC
                </CardTitle>
                <CardDescription className="text-slate-500 font-medium">Identity management and credential enforcement.</CardDescription>
             </CardHeader>
             <CardContent className="p-8 pt-4 space-y-4">
                <PolicyToggle 
                  title="Multi-Factor Authentication" 
                  description="Enforce hardware-based 2FA for all administrative accounts."
                  defaultEnabled
                />
                <PolicyToggle 
                  title="Zero-Trust Architecture" 
                  description="Explicitly verify every request regardless of origin or network."
                  defaultEnabled
                />
                <PolicyToggle 
                  title="Automatic Session Expiry" 
                  description="Invalidate tokens after 30 minutes of inactivity."
                />
             </CardContent>
          </Card>
        </div>

        {/* Security Summary Sidebar */}
        <div className="space-y-6">
           <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 overflow-hidden border-t-4 border-t-cyan-500 shadow-2xl shadow-cyan-500/5">
              <CardHeader className="p-6">
                 <CardTitle className="text-xs font-syne font-bold text-white uppercase tracking-[0.2em]">Security Posture</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-6">
                 <div className="space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-widest">Status</span>
                       <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-[10px] font-mono px-3">ENFORCED</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-widest">Last Audit</span>
                       <span className="text-xs font-bold text-slate-300 font-mono">2026-03-19</span>
                    </div>
                 </div>

                 <div className="space-y-6 pt-2">
                    <SecurityScoreItem label="Encryption" score={100} color="bg-green-500" />
                    <SecurityScoreItem label="Network Defense" score={92} color="bg-cyan-500" />
                    <SecurityScoreItem label="Identity Safety" score={85} color="bg-blue-500" />
                 </div>
              </CardContent>
              <CardFooter className="px-6 pb-8">
                 <Button className="w-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 text-xs font-bold uppercase tracking-widest py-6 rounded-xl">
                    Run Security Audit
                 </Button>
              </CardFooter>
           </Card>

           <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 p-6 overflow-hidden">
              <CardTitle className="text-xs font-syne font-bold text-white uppercase tracking-[0.2em] mb-6">Quick Actions</CardTitle>
              <CardContent className="p-0">
                 <div className="grid grid-cols-2 gap-3">
                    <QuickActionButton icon={<ShieldAlert className="w-4 h-4" />} label="Lockdown" variant="red" />
                    <QuickActionButton icon={<Globe className="w-4 h-4" />} label="Rotate Keys" variant="blue" />
                    <QuickActionButton icon={<Key className="w-4 h-4" />} label="Audit Log" variant="slate" />
                    <QuickActionButton icon={<ShieldCheck className="w-4 h-4" />} label="Validate" variant="cyan" />
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function PolicyToggle({ title, description, defaultEnabled = false }: { title: string, description: string, defaultEnabled?: boolean }) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-white tracking-tight">{title}</h4>
        <p className="text-xs text-slate-500 max-w-sm font-medium">{description}</p>
      </div>
      <Switch 
        checked={enabled}
        onCheckedChange={setEnabled}
        className="data-[state=checked]:bg-cyan-500"
      />
    </div>
  );
}

function SecurityScoreItem({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-widest">
        <span className="text-slate-500">{label}</span>
        <span className="text-white">{score}%</span>
      </div>
      <Progress value={score} className="h-1.5 bg-white/5" indicatorClassName={color} />
    </div>
  );
}

function QuickActionButton({ icon, label, variant }: { icon: React.ReactNode, label: string, variant: 'red' | 'blue' | 'slate' | 'cyan' }) {
  const variants = {
    red: "text-red-400 hover:bg-red-400/10 border-red-400/10 hover:border-red-400/30",
    blue: "text-blue-400 hover:bg-blue-400/10 border-blue-400/10 hover:border-blue-400/30",
    slate: "text-slate-400 hover:bg-slate-400/10 border-slate-400/10 hover:border-slate-400/30",
    cyan: "text-cyan-400 hover:bg-cyan-400/10 border-cyan-500/10 hover:border-cyan-500/30"
  };

  return (
    <Button variant="outline" className={cn(
      "flex flex-col items-center justify-center h-auto py-5 rounded-2xl border transition-all text-[9px] font-bold uppercase tracking-[0.2em] gap-3 bg-white/[0.02]",
      variants[variant]
    )}>
      <div className="p-2 rounded-lg bg-current/10">
        {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
          className: cn("w-5 h-5", (icon.props as any)?.className) 
        })}
      </div>
      {label}
    </Button>
  );
}

