"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { type BranchId, type Branch, BRANCHES, getBranch } from "@/data/gymData";

interface BranchContextType {
  selectedBranch: BranchId;
  setSelectedBranch: (id: BranchId) => void;
  branch: Branch;
}

const BranchContext = createContext<BranchContextType | null>(null);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [selectedBranch, setSelectedBranch] = useState<BranchId>("lalbagh");

  return (
    <BranchContext.Provider
      value={{
        selectedBranch,
        setSelectedBranch,
        branch: getBranch(selectedBranch),
      }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranch must be used within BranchProvider");
  return ctx;
}

export { BRANCHES };
