"use client";

import { Footer } from "@/components/sectioins";
import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import {
  GALLERY_FILTERS,
  GALLERY_ITEMS,
  GalleryBranch,
  GalleryItem,
} from "@/constants/galleryData";
import { getGymTourWhatsAppUrl } from "@/data/gymData";
import { useBranch } from "@/context/BranchContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function FullGalleryPage() {
  const { selectedBranch } = useBranch();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS;

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, handleNext, handlePrev]);

  const activeItem: GalleryItem | null =
    lightboxIndex !== null ? filteredItems[lightboxIndex] || null : null;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0F0D0A] text-[#F0EAD6] pt-28 pb-20 sm:pt-36 sm:pb-28 relative overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none opacity-20 blur-[140px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, #D4A843 0%, #8C6A20 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header & Navigation */}
          <div className="mb-10 sm:mb-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#E8C060] hover:text-white transition-colors mb-6 group">
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              <span>Back to Home</span>
            </Link>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Inside Rayhan Fitness:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8C060] via-[#D4A843] to-[#B8891C]">
                Full Gallery &amp; Spaces
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#8C7A5A] max-w-2xl">
              Explore our full collection of equipment, workout floors, posing stages, and exclusive female zones across Mirpur, Dhanmondi, and Lalbagh.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#1C1810] border border-[#3D3528] cursor-pointer shadow-md hover:border-[#D4A843] hover:shadow-[0_12px_36px_rgba(212,168,67,0.25)] transition-all duration-300">
                <Image
                  src={item.imageSrc}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0A]/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[0.6rem] tracking-wider uppercase font-bold text-[#E8C060] bg-black/60 px-2.5 py-0.5 rounded-full border border-[#D4A843]/30">
                    {item.branchLabel}
                  </span>
                  <p className="text-xs font-bold text-white mt-1.5 line-clamp-1">
                    {item.title}
                  </p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-black/80 border border-[#D4A843] text-[#E8C060] flex items-center justify-center shadow-xl scale-75 group-hover:scale-100 transition-transform">
                    🔍
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99999] flex flex-col justify-between bg-black/95 backdrop-blur-2xl select-none cursor-zoom-out"
            onClick={closeLightbox}>
            {/* Top Bar */}
            <div
              className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#E8C060] bg-[#1C1810] px-3 py-1 rounded-lg border border-[#D4A843]/40">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
                <span className="text-sm font-bold text-[#F0EAD6]">
                  {activeItem.title}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-[#1C1810] border border-[#3D3528] text-[#F0EAD6] hover:text-[#E8C060] hover:border-[#D4A843] flex items-center justify-center transition-all cursor-pointer">
                ✕
              </button>
            </div>

            {/* Image Viewer Stage */}
            <div
              className="relative flex-1 flex items-center justify-center px-4 sm:px-12 py-4 overflow-hidden"
              onClick={closeLightbox}>
              {filteredItems.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 z-30 w-12 h-12 rounded-full bg-black/80 border border-white/20 text-[#F0EAD6] hover:text-[#E8C060] hover:border-[#D4A843] flex items-center justify-center text-xl font-bold transition-all cursor-pointer">
                  ‹
                </button>
              )}

              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[78vh] max-w-[90vw] flex items-center justify-center">
                <img
                  src={activeItem.imageSrc}
                  alt={activeItem.alt}
                  className="max-h-[78vh] max-w-[90vw] object-contain rounded-xl border border-white/10 shadow-2xl"
                />
              </div>

              {filteredItems.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 z-30 w-12 h-12 rounded-full bg-black/80 border border-white/20 text-[#F0EAD6] hover:text-[#E8C060] hover:border-[#D4A843] flex items-center justify-center text-xl font-bold transition-all cursor-pointer">
                  ›
                </button>
              )}
            </div>

            {/* Bottom Bar CTA */}
            <div
              className="relative z-20 px-6 py-4 border-t border-white/10 bg-black/60"
              onClick={(e) => e.stopPropagation()}>
              <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                <span className="text-xs text-[#8C7A5A]">
                  Branch: <strong className="text-[#F0EAD6]">{activeItem.branchLabel}</strong>
                </span>

                <a
                  href={getGymTourWhatsAppUrl(selectedBranch || "mirpur")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4A843] to-[#B8891C] text-[#0F0D0A] font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all">
                  <span>Book Free Assessment &amp; Tour →</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <div className="lg:hidden h-14" />
      <MobileBottomBar />
      <FloatingWhatsApp />
    </>
  );
}
