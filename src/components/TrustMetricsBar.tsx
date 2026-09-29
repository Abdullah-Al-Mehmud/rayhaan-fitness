"use client";

import { TRUST_METRICS } from "@/data/gymData";

export function TrustMetricsBar() {
  return (
    <section className="w-full bg-[#14110C] border-y border-border-subtle py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
        {TRUST_METRICS.map((metric, i) => (
          <div
            key={metric.label}
            className={`flex flex-col items-center text-center px-4 ${
              i > 0 ? "md:border-l md:border-border-subtle" : ""
            }`}>
            <span className="text-gold-light text-3xl sm:text-4xl font-extrabold tracking-tight">
              {metric.num}
              {metric.suffix}
            </span>
            <span className="text-text-muted text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1.5">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
