"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type NavbarProps = {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  navItems: string[];
};

export function Navbar({
  activeNav,
  setActiveNav,
  setMobileMenuOpen,
  navItems,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[999] px-4 sm:px-6 lg:px-[120px] transition-all duration-300 ${
        scrolled ? "bg-background-base/90 backdrop-blur-md shadow-lg" : ""
      }`}>
      <div className="grid grid-cols-3 items-center py-4 lg:py-5">
        <Image
          src="/logo.png"
          alt="Rayhaan Fitness"
          width={110}
          height={36}
          className="object-contain justify-self-start w-[100px] h-auto"
          priority
        />

        <nav className="hidden lg:flex justify-center gap-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`px-3 text-[0.8rem] font-bold tracking-[0.2em] uppercase transition-colors duration-200 ${
                activeNav === item
                  ? "text-gold-mid"
                  : "text-text-primary/60 hover:text-gold-mid"
              }`}>
              {item}
            </button>
          ))}
        </nav>

        <div className="justify-self-end flex items-center">
          <button className="hidden lg:inline-flex bg-gold-mid text-text-inverse font-semibold text-[0.7rem] tracking-wider uppercase px-5 py-2.5 rounded-sm hover:bg-gold-deep transition-colors duration-300">
            Buy Package
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="lg:hidden flex flex-col justify-center items-end gap-[5px] w-10 h-10 group">
            <span
              className="block h-[1.5px] w-7 transition-all duration-300 group-hover:w-6"
              style={{ background: "var(--gold-mid)" }}
            />
            <span
              className="block h-[1.5px] w-5 transition-all duration-300 group-hover:w-7"
              style={{ background: "var(--gold-mid)" }}
            />
            <span
              className="block h-[1.5px] w-3 transition-all duration-300 group-hover:w-5"
              style={{ background: "var(--gold-mid)" }}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
