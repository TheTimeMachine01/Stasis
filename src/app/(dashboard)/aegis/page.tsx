"use client";

import React, { useState } from "react";
import { Lock, Shield, ShieldCheck, ShieldAlert, Globe, Key, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AegisPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header>
        <h1 className="text-3xl font-syne font-bold text-white tracking-tight text-shadow-cyan">Aegis Security</h1>
        <p className="text-slate-400 font-medium">Configure and enforce unbreakable equilibrium protocols.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Policy Section */}
        <div className="lg:col-span-2 space-y-6">
          <section className="glass rounded-3xl p-8 border-white/5">
             <h3 className="text-xl font-syne font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                Network Firewall Protocols
             </h3>
             <div className="space-y-4">
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
             </div>
          </section>

          <section className="glass rounded-3xl p-8 border-white/5">
             <h3 className="text-xl font-syne font-bold text-white mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                Access Control & RBAC
             </h3>
             <div className="space-y-4">
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
             </div>
          </section>
        </div>

        {/* Security Summary Sidebar */}
        <div className="space-y-6">
           <div className="glass rounded-3xl p-6 border-white/5 border-t-4 border-cyan-400">
              <h4 className="text-sm font-syne font-bold text-white uppercase tracking-widest mb-4">Security Posture</h4>
              <div className="flex items-center justify-between mb-2">
                 <span className="text-xs text-slate-500 font-mono">STATUS</span>
                 <span className="text-xs font-bold text-cyan-400 font-mono">ENFORCED</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                 <span className="text-xs text-slate-500 font-mono">LAST_AUDIT</span>
                 <span className="text-xs font-bold text-slate-300 font-mono">2026-03-19</span>
              </div>
              <div className="space-y-4">
                 <SecurityScoreItem label="Encryption" score={100} color="bg-green-500" />
                 <SecurityScoreItem label="Network Defense" score={92} color="bg-cyan-500" />
                 <SecurityScoreItem label="Identity Safety" score={85} color="bg-blue-500" />
              </div>
           </div>

           <div className="glass rounded-3xl p-6 border-white/5">
              <h4 className="text-sm font-syne font-bold text-white uppercase tracking-widest mb-4">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                 <QuickActionButton icon={<ShieldAlert className="w-4 h-4" />} label="Lockdown" variant="red" />
                 <QuickActionButton icon={<Globe className="w-4 h-4" />} label="Rotate Keys" variant="blue" />
                 <QuickActionButton icon={<Key className="w-4 h-4" />} label="Audit Log" variant="slate" />
                 <QuickActionButton icon={<ShieldCheck className="w-4 h-4" />} label="Validate" variant="cyan" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function PolicyToggle({ title, description, defaultEnabled = false }: { title: string, description: string, defaultEnabled?: boolean }) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  return (
    <div className="flex items-start justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors group">
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-slate-500 max-w-sm">{description}</p>
      </div>
      <button 
        onClick={() => setEnabled(!enabled)}
        className={cn(
          "w-12 h-6 rounded-full transition-all relative mt-1",
          enabled ? "bg-cyan-500 glow-cyan" : "bg-slate-800"
        )}
      >
        <div className={cn(
          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-lg",
          enabled ? "left-7" : "left-1"
        )} />
      </button>
    </div>
  );
}

function SecurityScoreItem({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-mono font-bold">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{score}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label, variant }: { icon: React.ReactNode, label: string, variant: 'red' | 'blue' | 'slate' | 'cyan' }) {
  const variants = {
    red: "text-red-400 hover:bg-red-400/10 border-red-400/20",
    blue: "text-blue-400 hover:bg-blue-400/10 border-blue-400/20",
    slate: "text-slate-400 hover:bg-slate-400/10 border-slate-400/20",
    cyan: "text-cyan-400 hover:bg-cyan-400/10 border-cyan-400/20"
  };

  return (
    <button className={cn(
      "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-[10px] font-bold uppercase tracking-widest gap-2",
      variants[variant]
    )}>
      {icon}
      {label}
    </button>
  );
}
