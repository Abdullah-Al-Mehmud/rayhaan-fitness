"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-background-base">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold-mid to-gold-deep px-8 py-16 sm:px-16 sm:py-24 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gold-light/20 via-transparent to-transparent" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-inverse tracking-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-4 text-lg text-text-inverse/80 leading-relaxed">
              Visit us at 21/c Nur Fattah Lane, Lalbag — Ashiyana Tower. Your
              first session is free.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                variant="ghost"
                size="lg"
                className="bg-background-warm text-gold-light hover:bg-background-surface"
              >
                Claim Free Session
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-text-inverse text-text-inverse hover:bg-text-inverse hover:text-gold-deep"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
