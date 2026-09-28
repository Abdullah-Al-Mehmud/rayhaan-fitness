"use client";

import { useBranch } from "@/context/BranchContext";
import { PHONE_TEL, getGymTourWhatsAppUrl } from "@/data/gymData";

export function MobileBottomBar() {
  const { selectedBranch } = useBranch();
  const whatsAppUrl = getGymTourWhatsAppUrl(selectedBranch);

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-[998] bg-background-base/95 backdrop-blur-md border-t border-border-subtle">
      <div className="flex" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <a
          href={PHONE_TEL}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-gold-mid font-bold text-[0.8rem] tracking-wider uppercase border-r border-border-subtle active:bg-background-overlay transition-colors">
          <span>📞</span> Call Branch
        </a>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gold-mid text-text-inverse font-bold text-[0.8rem] tracking-wider uppercase active:bg-gold-deep transition-colors">
          <span>💬</span> WhatsApp
        </a>
      </div>
    </div>
  );
}
