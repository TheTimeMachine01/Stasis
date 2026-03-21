"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && !isAuthenticated) {
      const authStatus = localStorage.getItem("stasis_auth") === "true";
      if (!authStatus) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading, router, isMounted]);

  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Check if we have local storage fallback
    const authStatus = typeof window !== 'undefined' && localStorage.getItem("stasis_auth") === "true";
    if (!authStatus) {
      return null;
    }
  }

  return <>{children}</>;
}
