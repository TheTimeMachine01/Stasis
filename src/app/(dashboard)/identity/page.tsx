import React from "react";
import { User, Key, Shield, Bell, Smartphone, LogOut, ChevronRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IdentityPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-syne font-bold text-white tracking-tight">Identity Management</h1>
        <p className="text-slate-400 font-medium">Manage your security credentials and platform preferences.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
         {/* Profile Section */}
         <section className="glass rounded-3xl p-8 border-white/5 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center glow-cyan">
               <User className="w-12 h-12 text-slate-950" />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h3 className="text-2xl font-syne font-bold text-white mb-1">CISO_Admin_01</h3>
               <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Master Security Architect</p>
               <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                     Verified Identity
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                     2FA Enabled
                  </div>
               </div>
            </div>
            <button className="px-6 py-3 rounded-xl glass border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
               Edit Profile
            </button>
         </section>

         {/* API Keys Section */}
         <section className="glass rounded-3xl p-8 border-white/5">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-syne font-bold text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-cyan-400" />
                  Access Tokens
               </h3>
               <button className="text-xs text-cyan-400 font-bold uppercase tracking-widest hover:underline">
                  Generate New Token
               </button>
            </div>
            <div className="space-y-4">
               <ApiKeyItem name="Production_Nexus_Alpha" keyHash="stasis_live_••••••••••••••••4a2k" lastUsed="2 mins ago" />
               <ApiKeyItem name="Staging_Pulse_Beta" keyHash="stasis_test_••••••••••••••••9z1x" lastUsed="14 hours ago" />
            </div>
         </section>

         {/* Security Settings Section */}
         <section className="glass rounded-3xl p-8 border-white/5">
            <h3 className="text-xl font-syne font-bold text-white mb-8 flex items-center gap-2">
               <Shield className="w-5 h-5 text-cyan-400" />
               Account Integrity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <SettingCard 
                 icon={<Bell className="w-5 h-5" />} 
                 title="Threat Notifications" 
                 description="Receive instant alerts for critical infrastructure breaches." 
                 enabled={true}
               />
               <SettingCard 
                 icon={<Smartphone className="w-5 h-5" />} 
                 title="Hardware MFA" 
                 description="Enforce physical security keys for all administrative logins." 
                 enabled={true}
               />
               <SettingCard 
                 icon={<Globe className="w-5 h-5" />} 
                 title="Regional Access" 
                 description="Restrict account access to verified IP ranges only." 
                 enabled={false}
               />
               <SettingCard 
                 icon={<LogOut className="w-5 h-5" />} 
                 title="Auto-Signout" 
                 description="Invalidate active sessions after 15 minutes of inactivity." 
                 enabled={true}
               />
            </div>
         </section>
      </div>
    </div>
  );
}

function ApiKeyItem({ name, keyHash, lastUsed }: { name: string, keyHash: string, lastUsed: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-cyan-500/30 transition-all">
       <div className="mb-2 md:mb-0">
          <div className="text-sm font-bold text-white mb-1">{name}</div>
          <div className="text-xs font-mono text-slate-500">{keyHash}</div>
       </div>
       <div className="flex items-center gap-6">
          <div className="text-right">
             <div className="text-[10px] text-slate-500 font-mono uppercase">Last Used</div>
             <div className="text-[10px] text-slate-300 font-mono font-bold">{lastUsed}</div>
          </div>
          <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors">
             <LogOut className="w-4 h-4 rotate-90" />
          </button>
       </div>
    </div>
  );
}

function SettingCard({ icon, title, description, enabled }: { icon: React.ReactNode, title: string, description: string, enabled: boolean }) {
  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between group hover:bg-white/[0.08] transition-colors">
       <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-xl bg-white/5 text-slate-400 group-hover:text-cyan-400 transition-colors">
             {icon}
          </div>
          <div className={cn(
             "w-10 h-5 rounded-full relative transition-colors",
             enabled ? "bg-cyan-500" : "bg-slate-700"
          )}>
             <div className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all",
                enabled ? "left-5.5" : "left-0.5"
             )} />
          </div>
       </div>
       <div>
          <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed">{description}</p>
       </div>
    </div>
  );
}
