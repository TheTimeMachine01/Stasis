"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "./AuthContext";

interface SocketContextType {
  connected: boolean;
  subscribe: (topic: string, callback: (message: any) => void) => () => void;
  publish: (topic: string, body: any) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const stompClient = useRef<Client | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      if (stompClient.current) {
        stompClient.current.deactivate();
        stompClient.current = null;
        setConnected(false);
      }
      return;
    }

    const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8080/ws";
    
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("stasis_token") || ""}`,
      },
      debug: (str) => {
        if (process.env.NODE_ENV === "development") {
          console.log("STOMP: " + str);
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setConnected(true);
      console.log("Connected to WebSocket");
    };

    client.onDisconnect = () => {
      setConnected(false);
      console.log("Disconnected from WebSocket");
    };

    client.onStompError = (frame) => {
      console.error("STOMP error", frame);
    };

    client.activate();
    stompClient.current = client;

    return () => {
      client.deactivate();
    };
  }, [isAuthenticated]);

  const subscribe = (topic: string, callback: (message: any) => void) => {
    if (!stompClient.current || !connected) return () => {};

    const subscription = stompClient.current.subscribe(topic, (message) => {
      try {
        const payload = JSON.parse(message.body);
        callback(payload);
      } catch (e) {
        callback(message.body);
      }
    });

    return () => subscription.unsubscribe();
  };

  const publish = (topic: string, body: any) => {
    if (stompClient.current && connected) {
      stompClient.current.publish({
        destination: topic,
        body: JSON.stringify(body),
      });
    }
  };

  return (
    <SocketContext.Provider value={{ connected, subscribe, publish }}>
      {children}
    </SocketContext.Provider>
  );
};
