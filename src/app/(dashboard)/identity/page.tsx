"use client";

import React from "react";
import { User, Key, Shield, Bell, Smartphone, LogOut, ChevronRight, Globe, ShieldCheck, Mail, Edit3, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function IdentityPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      <header>
        <h1 className="text-4xl font-syne font-bold text-white tracking-tight">Identity Management</h1>
        <p className="text-slate-400 font-medium mt-1">Manage your security credentials and platform preferences.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
         {/* Profile Section */}
         <Card className="rounded-[2.5rem] border-white/5 bg-slate-900/40 p-2 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -mr-32 -mt-32 rounded-full pointer-events-none" />
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-10 relative z-10">
               <div className="relative group">
                  <Avatar className="w-32 h-32 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                     <AvatarImage src="" />
                     <AvatarFallback className="bg-cyan-500 text-slate-950 text-4xl font-bold font-syne">VND</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="icon" className="absolute bottom-1 right-1 rounded-full bg-slate-900 border-white/10 h-10 w-10 text-cyan-400 hover:text-white transition-colors shadow-xl">
                     <Edit3 className="w-4 h-4" />
                  </Button>
               </div>
               
               <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                     <h3 className="text-3xl font-syne font-bold text-white tracking-tight">CISO_Admin_01</h3>
                     <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.4em] mt-1 font-bold">Master Security Architect</p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                     <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 py-1 px-4 rounded-xl gap-2 font-mono text-[10px] uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Identity
                     </Badge>
                     <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 py-1 px-4 rounded-xl gap-2 font-mono text-[10px] uppercase tracking-widest">
                        <Smartphone className="w-3 h-3" />
                        2FA Enabled
                     </Badge>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-4 text-slate-500 font-mono text-[10px] pt-2">
                     <div className="flex items-center gap-1.5 uppercase">
                        <Mail className="w-3 h-3" />
                        ciso.hq@vanguard.sec
                     </div>
                     <div className="flex items-center gap-1.5 uppercase">
                        <Globe className="w-3 h-3" />
                        HQ-VND-CORE
                     </div>
                  </div>
               </div>
               
               <Button className="rounded-xl bg-white text-slate-950 font-bold px-8 h-12 hover:scale-105 transition-transform shadow-lg shadow-white/5">
                  Account Actions
               </Button>
            </CardContent>
         </Card>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* API Keys Section */}
            <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 overflow-hidden">
               <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between space-y-0">
                  <div className="space-y-1">
                     <CardTitle className="text-xl font-syne font-bold text-white flex items-center gap-2">
                        <Key className="w-5 h-5 text-cyan-400" />
                        Access Tokens
                     </CardTitle>
                     <CardDescription className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">Encrypted API Credentials</CardDescription>
                  </div>
                  <Button variant="link" className="text-xs text-cyan-400 font-bold uppercase tracking-widest p-0 hover:no-underline hover:text-cyan-300">
                     New Token
                  </Button>
               </CardHeader>
               <CardContent className="p-8 pt-4 space-y-4">
                  <ApiKeyItem name="Production_Nexus_Alpha" keyHash="stasis_live_••••••••••••••••4a2k" lastUsed="2 mins ago" />
                  <ApiKeyItem name="Staging_Pulse_Beta" keyHash="stasis_test_••••••••••••••••9z1x" lastUsed="14 hours ago" />
               </CardContent>
               <CardFooter className="px-8 pb-8 pt-0">
                  <p className="text-[10px] text-slate-600 font-mono text-center w-full uppercase tracking-tighter italic">Warning: Do not share credentials over insecure channels</p>
               </CardFooter>
            </Card>

            {/* Security Settings Section */}
            <Card className="rounded-[2rem] border-white/5 bg-slate-900/40 overflow-hidden">
               <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-syne font-bold text-white flex items-center gap-2">
                     <Shield className="w-5 h-5 text-cyan-400" />
                     Account Integrity
                  </CardTitle>
                  <CardDescription className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">Global Safety Protocols</CardDescription>
               </CardHeader>
               <CardContent className="p-8 pt-4">
                  <div className="grid grid-cols-1 gap-3">
                     <SettingItem 
                       icon={<Bell className="w-4 h-4" />} 
                       title="Threat Notifications" 
                       description="Instant alerts for critical breaches." 
                       enabled={true}
                     />
                     <SettingItem 
                       icon={<Smartphone className="w-4 h-4" />} 
                       title="Hardware MFA" 
                       description="Enforce physical keys for logins." 
                       enabled={true}
                     />
                     <SettingItem 
                       icon={<Globe className="w-4 h-4" />} 
                       title="Regional Access" 
                       description="Restrict access to verified IP ranges." 
                       enabled={false}
                     />
                     <SettingItem 
                       icon={<LogOut className="w-4 h-4" />} 
                       title="Auto-Signout" 
                       description="Invalidate tokens after 15m of inactivity." 
                       enabled={true}
                     />
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}

function ApiKeyItem({ name, keyHash, lastUsed }: { name: string, keyHash: string, lastUsed: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all">
       <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-500 group-hover:text-cyan-400 transition-colors">
             <Key className="w-4 h-4" />
          </div>
          <div>
             <div className="text-sm font-bold text-white mb-0.5 tracking-tight group-hover:text-cyan-400 transition-colors">{name}</div>
             <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">{keyHash}</div>
          </div>
       </div>
       <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
             <div className="text-[9px] text-slate-600 font-mono uppercase font-bold tracking-tighter">Last Active</div>
             <div className="text-[10px] text-slate-300 font-mono font-bold tracking-tighter uppercase">{lastUsed}</div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-400/10 transition-colors">
             <Trash2 className="w-4 h-4" />
          </Button>
       </div>
    </div>
  );
}

function SettingItem({ icon, title, description, enabled }: { icon: React.ReactNode, title: string, description: string, enabled: boolean }) {
  const [checked, setChecked] = React.useState(enabled);
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
       <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-400 group-hover:text-cyan-400 transition-colors shadow-lg">
             {icon}
          </div>
          <div>
             <h4 className="text-sm font-bold text-white tracking-tight">{title}</h4>
             <p className="text-[10px] text-slate-500 font-medium">{description}</p>
          </div>
       </div>
       <Switch 
          checked={checked} 
          onCheckedChange={setChecked}
          className="data-[state=checked]:bg-cyan-500" 
       />
    </div>
  );
}

