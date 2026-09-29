"use client";

import { useBranch, BRANCHES } from "@/context/BranchContext";

const tokens = {
  bgSurface: "#2E2A22",
  bgOverlay: "#3D3528",
  goldMid: "#D4A843",
  goldLight: "#E8C060",
  textPrimary: "#F0EAD6",
  textMuted: "#8C7A5A",
  borderSubtle: "#3D3528",
};

interface BranchSelectorProps {
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function BranchSelector({
  compact = false,
  className = "",
  style = {},
}: BranchSelectorProps) {
  const { selectedBranch, setSelectedBranch } = useBranch();

  return (
    <div
      role="group"
      aria-label="Branch selector"
      className={className}
      style={{
        display: "inline-flex",
        gap: 2,
        background: tokens.bgSurface,
        borderRadius: 9999,
        padding: 3,
        border: `1px solid ${tokens.borderSubtle}`,
        ...style,
      }}>
      {BRANCHES.map((b) => {
        const isActive = selectedBranch === b.id;
        return (
          <button
            key={b.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => setSelectedBranch(b.id)}
            style={{
              padding: compact ? "6px 14px" : "8px 20px",
              borderRadius: 9999,
              fontSize: compact ? "0.62rem" : "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              border: "none",
              transition: "all 0.25s ease",
              background: isActive ? tokens.goldMid : "transparent",
              color: isActive ? "#0F0D0A" : tokens.textMuted,
            }}>
            {b.label}
          </button>
        );
      })}
    </div>
  );
}
