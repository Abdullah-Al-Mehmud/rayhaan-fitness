"use client";

import { useBranch } from "@/context/BranchContext";
import { GALLERY_ITEMS, GalleryItem } from "@/constants/galleryData";
import { getGymTourWhatsAppUrl } from "@/data/gymData";
import { trackEvent } from "@/lib/analytics";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const INITIAL_DISPLAY_COUNT = 8;
const LOAD_MORE_INCREMENT = 8;

export function GallerySection() {
  const { selectedBranch } = useBranch();
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_DISPLAY_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Display items sliced for pagination
  const displayedItems = useMemo(() => {
    return GALLERY_ITEMS.slice(0, visibleCount);
  }, [visibleCount]);

  const hasMore = visibleCount < GALLERY_ITEMS.length;

  const handleLoadMore = () => {
    trackEvent("gallery_load_more_click", {
      currentCount: visibleCount,
      totalCount: GALLERY_ITEMS.length,
    });
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_INCREMENT, GALLERY_ITEMS.length));
  };

  const openLightbox = (index: number) => {
    trackEvent("gallery_image_view", {
      itemId: GALLERY_ITEMS[index]?.id,
      index,
    });
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % GALLERY_ITEMS.length;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    });
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, closeLightbox, handleNext, handlePrev]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  const activeLightboxItem: GalleryItem | null =
    lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="relative bg-[#1C1810] text-[#F0EAD6] py-20 sm:py-28 overflow-hidden border-t border-[#3D3528]"
      style={{ fontFamily: "var(--font-geist-sans, 'Geist', sans-serif)" }}
    >
      {/* Ambient background gold glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none opacity-20 blur-[130px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, #D4A843 0%, #8C6A20 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ─────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4A843]/30 bg-[#2E2A22]/80 backdrop-blur-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8C060] animate-pulse" />
            <span className="text-[0.68rem] tracking-[0.28em] uppercase font-bold text-[#E8C060]">
              OUR ATMOSPHERE &amp; SPACES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F0EAD6] leading-[1.12]">
            Inside Rayhan Fitness:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8C060] via-[#D4A843] to-[#B8891C]">
              Where Champions Train
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#8C7A5A] leading-relaxed max-w-2xl mx-auto">
            Explore our world-class machinery, panoramic views, and dedicated workout zones
            across Lalbagh, Dhanmondi, and Mirpur.
          </p>
        </div>

        {/* ── Uniform Grid Layout (Clean one-size cards, no text clutter) ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item, index) => {
              const isLoaded = loadedImages[item.id];

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: (index % 8) * 0.04,
                  }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0F0D0A] border border-[#3D3528] cursor-pointer shadow-md hover:border-[#D4A843]/70 hover:shadow-[0_12px_36px_rgba(212,168,67,0.22)] transition-all duration-500"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(index);
                    }
                  }}
                  aria-label={`View photo ${index + 1}`}
                >
                  {/* Tailwind skeleton shimmer until loaded */}
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-[#2E2A22] animate-pulse z-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3D3528]/40 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
                    </div>
                  )}

                  {/* WebP Next.js Image with exact uniform aspect ratio */}
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                    decoding="async"
                    onLoad={() =>
                      setLoadedImages((prev) => ({ ...prev, [item.id]: true }))
                    }
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Clean, minimal hover overlay with centered magnifying view icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#0F0D0A]/35 backdrop-blur-[2px] z-20">
                    <div className="w-12 h-12 rounded-full bg-[#0F0D0A]/90 border border-[#D4A843] text-[#E8C060] flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0zM11 8v6M8 11h6"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── Load More Button / Completion State ──────────────────── */}
        <div className="mt-12 sm:mt-16 text-center">
          {hasMore ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLoadMore}
              type="button"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4A843] via-[#E8C060] to-[#D4A843] text-[#0F0D0A] font-bold text-sm sm:text-base tracking-wider shadow-[0_6px_24px_rgba(212,168,67,0.25)] hover:shadow-[0_8px_30px_rgba(212,168,67,0.4)] transition-all duration-300 cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-[#0F0D0A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                />
              </svg>
              <span>Explore More Spaces ({GALLERY_ITEMS.length - visibleCount} more)</span>
            </motion.button>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2E2A22]/70 border border-[#3D3528] text-xs text-[#8C7A5A]">
              <span className="text-[#D4A843] font-bold">✓</span>
              <span>
                Showing all <strong className="text-[#F0EAD6]">{GALLERY_ITEMS.length}</strong> spaces
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Fullscreen Lightbox Modal (Darker, Heavily Blurred Backdrop, Click Outside to Close) ── */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-2xl select-none cursor-zoom-out"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar: Counter & Close Button */}
            <div
              className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-white/10 bg-black/60 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-mono font-bold text-[#E8C060] bg-[#1C1810] px-3 py-1 rounded-lg border border-[#D4A843]/40">
                  {lightboxIndex + 1} / {GALLERY_ITEMS.length}
                </span>
                <span className="hidden sm:inline text-xs text-[#8C7A5A]">
                  Click anywhere outside the image or press Esc to close
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-[#1C1810] border border-[#3D3528] text-[#F0EAD6] hover:text-[#E8C060] hover:border-[#D4A843] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                aria-label="Close Lightbox"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Main Image Stage — clicking this area closes the Lightbox */}
            <div
              className="relative flex-1 flex items-center justify-center px-4 sm:px-12 py-4 overflow-hidden cursor-zoom-out"
              onClick={closeLightbox}
            >
              {/* Prev Button */}
              {GALLERY_ITEMS.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  type="button"
                  className="absolute left-2 sm:left-6 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/80 border border-white/15 text-[#F0EAD6] hover:text-[#E8C060] hover:border-[#D4A843] hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl backdrop-blur-md"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}

              {/* Active Image (Clicking directly on the photo does not close) */}
              <motion.div
                key={activeLightboxItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[74vh] sm:max-h-[80vh] max-w-[92vw] sm:max-w-[85vw] flex items-center justify-center cursor-default"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeLightboxItem.imageSrc}
                  alt={activeLightboxItem.alt}
                  className="max-h-[74vh] sm:max-h-[80vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
                />
              </motion.div>

              {/* Next Button */}
              {GALLERY_ITEMS.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  type="button"
                  className="absolute right-2 sm:right-6 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/80 border border-white/15 text-[#F0EAD6] hover:text-[#E8C060] hover:border-[#D4A843] hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl backdrop-blur-md"
                  aria-label="Next image"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Bottom Bar: High-converting direct booking CTA */}
            <div
              className="relative z-20 px-4 sm:px-8 py-3.5 sm:py-4 border-t border-white/10 bg-black/60 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                <span className="text-xs text-[#8C7A5A]">
                  Rayhan Fitness Atmosphere
                </span>

                <a
                  href={getGymTourWhatsAppUrl(selectedBranch || "mirpur")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    trackEvent("gallery_lightbox_book_tour_click", {
                      index: lightboxIndex,
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4A843] to-[#B8891C] hover:from-[#E8C060] hover:to-[#D4A843] text-[#0F0D0A] font-bold text-xs sm:text-sm tracking-wide shadow-lg transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-95"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.97.58 3.84 1.6 5.43L2 22l4.81-1.68c1.53.94 3.31 1.48 5.23 1.48 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.78 14.07c-.24.68-1.4 1.25-1.92 1.33-.52.08-1.18.12-3.41-.75-2.85-1.11-4.69-3.99-4.83-4.18-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.26-.28.58-.35.77-.35.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.32.38-.46.51-.15.14-.3.3-.13.6.18.3.78 1.29 1.68 2.09 1.15 1.03 2.13 1.35 2.43 1.5.3.15.48.13.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.11 1.78.84 2.08.99.3.15.51.23.58.35.08.13.08.73-.16 1.41z" />
                  </svg>
                  <span>Book Free Assessment &amp; Tour</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
