"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { JoinBootcampModal } from "@/components/forms/JoinBootcampModal";

interface JoinBootcampContextValue {
  openForm: () => void;
  closeForm: () => void;
}

const JoinBootcampContext = createContext<JoinBootcampContextValue | null>(null);

export function useJoinBootcamp() {
  const ctx = useContext(JoinBootcampContext);
  if (!ctx) {
    throw new Error("useJoinBootcamp must be used within JoinBootcampProvider");
  }
  return ctx;
}

export function JoinBootcampProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openForm = useCallback(() => setOpen(true), []);
  const closeForm = useCallback(() => setOpen(false), []);

  return (
    <JoinBootcampContext.Provider value={{ openForm, closeForm }}>
      {children}
      <JoinBootcampModal open={open} onClose={closeForm} />
    </JoinBootcampContext.Provider>
  );
}
