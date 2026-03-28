"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { CursorVariant } from "./cursor-types";

interface CursorContextValue {
  variant: CursorVariant;
  setCursor: (v: CursorVariant) => void;
}

const CursorContext = createContext<CursorContextValue>({
  variant: "arrow",
  setCursor: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("arrow");
  const setCursor = useCallback((v: CursorVariant) => setVariant(v), []);

  return (
    <CursorContext.Provider value={{ variant, setCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
