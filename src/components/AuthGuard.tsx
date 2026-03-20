"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem("stasis_auth") === "true";
    if (!authStatus) {
      router.push("/login");
    }
  }, [router]);

  // Optionally show a loader while checking auth
  return <>{children}</>;
}
