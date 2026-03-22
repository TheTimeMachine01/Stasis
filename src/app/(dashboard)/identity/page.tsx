"use client";

import React from "react";
import { User, Key, Shield, Bell, Smartphone, LogOut, ChevronRight, Globe, ShieldCheck, Mail, Edit3, Trash2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function IdentityPage() {
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
             <div className="w-2 h-2 rounded-full bg-blue-500 glow-primary" />
             <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-400">Security Clearance: LEVEL_05</span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight flex items-baseline gap-4">
            Identity & Access
          </h1>
          <p className="text-white/40 mt-3 text-base font-medium max-w-xl leading-relaxed">
            Manage administrative credentials and biometric security vectors. Your session is currently encrypted via Shadow-Key protocols.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="rounded-2xl border-white/10 bg-white/5 text-white/60 hover:text-white h-14 gap-3 border-gradient px-8 transition-all font-semibold">
              <LogOut className="w-5 h-5" />
              <span>Terminate Session</span>
           </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 gap-10">
         {/* Profile Section */}
         <motion.div variants={itemVariants}>
            <Card className="rounded-[3rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl p-2 overflow-hidden relative group shadow-2xl">
               <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] -mr-48 -mt-48 rounded-full pointer-events-none transition-opacity group-hover:opacity-20" />
               <CardContent className="p-12 flex flex-col lg:flex-row items-center gap-12 relative z-10">
                  <div className="relative group">
                     <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500" />
                     <Avatar className="w-48 h-48 border-2 border-white/10 shadow-2xl relative z-10">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-6xl font-bold tracking-tighter">VN</AvatarFallback>
                     </Avatar>
                     <Button variant="outline" size="icon" className="absolute bottom-2 right-2 rounded-2xl bg-black border-white/10 h-14 w-14 text-blue-400 hover:text-white transition-all shadow-2xl z-20 hover:scale-110">
                        <Edit3 className="w-6 h-6" />
                     </Button>
                  </div>
                  
                  <div className="flex-1 text-center lg:text-left space-y-6">
                     <div>
                        <h3 className="text-5xl font-bold text-white tracking-tight">Vanguard_01</h3>
                        <p className="text-blue-500 text-sm font-semibold uppercase tracking-wider mt-3">Lead Security Architect • Core Cluster</p>
                     </div>
                     
                     <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        <Badge variant="outline" className="bg-blue-500/5 text-blue-400 border-blue-500/20 py-2.5 px-6 rounded-2xl gap-3 text-[11px] font-bold border-gradient">
                           <ShieldCheck className="w-4 h-4" />
                           Verified Operative
                        </Badge>
                        <Badge variant="outline" className="bg-indigo-500/5 text-indigo-400 border-indigo-500/20 py-2.5 px-6 rounded-2xl gap-3 text-[11px] font-bold border-gradient">
                           <Smartphone className="w-4 h-4" />
                           Quantum MFA Active
                        </Badge>
                     </div>

                     <div className="flex items-center justify-center lg:justify-start gap-8 text-white/30 text-[12px] pt-4 font-medium tracking-wide">
                        <div className="flex items-center gap-3">
                           <Mail className="w-4 h-4 text-blue-500/40" />
                           vanguard.hq@stasis.sec
                        </div>
                        <div className="flex items-center gap-3">
                           <Globe className="w-4 h-4 text-blue-500/40" />
                           VND-NORTH-SEC-01
                        </div>
                     </div>
                  </div>
                  
                  <Button className="rounded-[2rem] bg-white text-black font-bold px-12 h-20 hover:scale-105 transition-all shadow-2xl shadow-white/5 text-sm">
                     Update Security Bundle
                  </Button>
               </CardContent>
            </Card>
         </motion.div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* API Keys Section */}
            <motion.div variants={itemVariants}>
               <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden group shadow-xl">
                  <CardHeader className="p-10 pb-6 flex flex-row items-center justify-between space-y-0">
                     <div className="space-y-2">
                        <div className="flex items-center gap-4">
                           <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              <Key className="w-6 h-6" />
                           </div>
                           <CardTitle className="text-2xl font-bold text-white tracking-tight">Access Tokens</CardTitle>
                        </div>
                        <CardDescription className="text-sm font-medium text-white/20">Hardware-Encrypted API Credentials</CardDescription>
                     </div>
                     <Button variant="link" className="text-sm text-blue-400 font-bold p-0 hover:no-underline hover:text-blue-300">
                        Generate Token
                     </Button>
                  </CardHeader>
                  <CardContent className="px-10 pb-10 space-y-5">
                     <ApiKeyItem name="Core_Command_Alpha" keyHash="vnd_live_••••••••••••••••x9r2" lastUsed="Just now" />
                     <ApiKeyItem name="Telemetry_Nexus_Beta" keyHash="vnd_tele_••••••••••••••••m4z1" lastUsed="12 hours ago" />
                  </CardContent>
                  <CardFooter className="px-10 pb-10 pt-0">
                     <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 w-full">
                        <p className="text-[11px] text-red-400/60 font-semibold text-center w-full">
                           Alert: Never transmit keys over non-encrypted channels.
                        </p>
                     </div>
                  </CardFooter>
               </Card>
            </motion.div>

            {/* Security Settings Section */}
            <motion.div variants={itemVariants}>
               <Card className="rounded-[2.5rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden group shadow-xl">
                  <CardHeader className="p-10 pb-6 space-y-2">
                     <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                           <Shield className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-white tracking-tight">Account Integrity</CardTitle>
                     </div>
                     <CardDescription className="text-sm font-medium text-white/20">Global Safety Configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="px-10 pb-10">
                     <div className="grid grid-cols-1 gap-4">
                        <SettingItem 
                          icon={<Bell />} 
                          title="Instant Threat Response" 
                          description="Neural alerts for critical infrastructure breaches." 
                          enabled={true}
                        />
                        <SettingItem 
                          icon={<Smartphone />} 
                          title="Hardware Key Enforcement" 
                          description="Restrict access to registered physical FIDO2 keys." 
                          enabled={true}
                        />
                        <SettingItem 
                          icon={<Globe />} 
                          title="Geo-Fenced Operations" 
                          description="Block access outside of verified corporate IP ranges." 
                          enabled={false}
                        />
                        <SettingItem 
                          icon={<LogOut />} 
                          title="Automated Session Purge" 
                          description="Invalidate tokens after 15m of operative inactivity." 
                          enabled={true}
                        />
                     </div>
                  </CardContent>
               </Card>
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
}

function ApiKeyItem({ name, keyHash, lastUsed }: { name: string, keyHash: string, lastUsed: string }) {
  return (
    <div className="flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 group hover:border-blue-500/30 hover:bg-white/[0.04] transition-all">
       <div className="flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-black border border-white/5 text-white/20 group-hover:text-blue-400 transition-colors shadow-inner">
             <Key className="w-5 h-5" />
          </div>
          <div>
             <div className="text-lg font-bold text-white mb-1 tracking-tight group-hover:text-blue-400 transition-colors">{name}</div>
             <div className="text-[11px] font-mono text-white/20">{keyHash}</div>
          </div>
       </div>
       <div className="flex items-center gap-10">
          <div className="text-right hidden sm:block">
             <div className="text-[10px] text-white/10 uppercase font-bold tracking-wider mb-1">Access Cycle</div>
             <div className="text-xs text-white/60 font-semibold">{lastUsed}</div>
          </div>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl text-white/10 hover:text-red-400 hover:bg-red-500/10 transition-all">
             <Trash2 className="w-5 h-5" />
          </Button>
       </div>
    </div>
  );
}

function SettingItem({ icon, title, description, enabled }: { icon: React.ReactNode, title: string, description: string, enabled: boolean }) {
  const [checked, setChecked] = React.useState(enabled);
  return (
    <div className="flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
       <div className="flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-black border border-white/5 text-white/20 group-hover:text-blue-400 transition-all shadow-xl">
             {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
               className: cn("w-5 h-5", (icon.props as any)?.className) 
             })}
          </div>
          <div>
             <h4 className="text-base font-bold text-white tracking-tight group-hover:text-white transition-colors">{title}</h4>
             <p className="text-xs text-white/30 font-medium leading-relaxed mt-1 max-w-xs">{description}</p>
          </div>
       </div>
       <Switch 
          checked={checked} 
          onCheckedChange={setChecked}
          className="data-[state=checked]:bg-blue-600 scale-110" 
       />
    </div>
  );
}
