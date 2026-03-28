"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type CursorState =
  | "default"
  | "hover"
  | "text"
  | "view"
  | "hidden"
  | "zoom-out"
  | "grab"
  | "grabbed"
  | "move"
  | "help"
  | "typing";

interface CursorContextValue {
  state: CursorState;
  label: string;
  setState: (s: CursorState) => void;
  setLabel: (l: string) => void;
}

const CursorContext = createContext<CursorContextValue>({
  state: "default",
  label: "",
  setState: () => {},
  setLabel: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  const set = useCallback((s: CursorState) => setState(s), []);
  const setLbl = useCallback((l: string) => setLabel(l), []);

  return (
    <CursorContext.Provider
      value={{ state, label, setState: set, setLabel: setLbl }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorState() {
  return useContext(CursorContext);
}
