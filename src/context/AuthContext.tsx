"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  error: string | null;
  user: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check authentication status on mount via "me" endpoint (Cookie-based)
  useEffect(() => {
    const checkAuth = async () => {
      // Sync initial state from localStorage for fast load
      const savedAuth = localStorage.getItem("stasis_auth") === "true";
      const savedUser = localStorage.getItem("stasis_user");
      
      if (savedAuth && savedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(savedUser));
      }

      try {
        const response = await api.auth.me();
        const userData = response.data.user || response.data;
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("stasis_user", JSON.stringify(userData));
        localStorage.setItem("stasis_auth", "true");
      } catch (err) {
        // Only clear if the server explicitly rejects the session
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("stasis_auth");
        localStorage.removeItem("stasis_user");
        localStorage.removeItem("stasis_token");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // Backend will now set HttpOnly cookies automatically
      const response = await api.auth.login(credentials);
      const userData = response.data.user || response.data;
      const token = response.data.token;
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Save to localStorage for persistence and components relying on it
      localStorage.setItem("stasis_user", JSON.stringify(userData));
      localStorage.setItem("stasis_auth", "true");
      if (token) {
        localStorage.setItem("stasis_token", token);
      }
      
      router.push("/nexus");
    } catch (err: any) {
      setError(err.response?.data?.message || "Authorization failed.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.auth.signup(data);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("stasis_auth");
      localStorage.removeItem("stasis_token");
      localStorage.removeItem("stasis_user");
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, signup, logout, error, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
