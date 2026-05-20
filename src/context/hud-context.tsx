"use client";

import React, { createContext, useContext, useState } from "react";

interface HUDContextType {
  isThinking: boolean;
  isSudoActive: boolean;
  isPitchActive: boolean;
  isLoaderActive: boolean;
  setThinking: (val: boolean) => void;
  setSudoActive: (val: boolean) => void;
  setPitchActive: (val: boolean) => void;
  setLoaderActive: (val: boolean) => void;
}

const HUDContext = createContext<HUDContextType | undefined>(undefined);

export function HUDProvider({ children }: { children: React.ReactNode }) {
  const [isThinking, setThinking] = useState(false);
  const [isSudoActive, setSudoActive] = useState(false);
  const [isPitchActive, setPitchActive] = useState(false);
  const [isLoaderActive, setLoaderActive] = useState(true);

  return (
    <HUDContext.Provider
      value={{
        isThinking,
        isSudoActive,
        isPitchActive,
        isLoaderActive,
        setThinking,
        setSudoActive,
        setPitchActive,
        setLoaderActive,
      }}
    >
      {children}
    </HUDContext.Provider>
  );
}

export function useHUD() {
  const context = useContext(HUDContext);
  if (!context) {
    throw new Error("useHUD must be used within a HUDProvider");
  }
  return context;
}
