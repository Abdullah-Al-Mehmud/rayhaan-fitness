"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BoltIcon,
  WrenchScrewdriverIcon,
  HeartIcon,
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { siteConfig } from "@/data/site";

const iconMap: Record<string, React.ElementType> = {
  BoltIcon,
  WrenchScrewdriverIcon,
  HeartIcon,
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
};

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="py-24 sm:py-32 bg-background-warm">
      <Container>
        <SectionTitle
          label="Features"
          title="Everything You Need to Succeed"
          subtitle="World-class facilities and expert guidance to help you reach your fitness goals faster than ever."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || BoltIcon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl border border-border-subtle bg-background-surface hover:border-gold-mid/30 hover:shadow-xl hover:shadow-gold-mid/5 transition-all duration-300"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-mid/10 text-gold-mid group-hover:bg-gold-mid group-hover:text-text-inverse transition-colors duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
