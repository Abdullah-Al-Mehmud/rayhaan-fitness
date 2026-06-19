"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Tokens — mirrors the `tokens` object in sectioins.tsx exactly      */
/* ------------------------------------------------------------------ */

const tokens = {
  bgBase: "#0F0D0A",
  bgWarm: "#1C1810",
  bgSurface: "#2E2A22",
  bgOverlay: "#3D3528",
  goldDeep: "#B8891C",
  goldMid: "#D4A843",
  goldLight: "#E8C060",
  goldMuted: "#8C6A20",
  textPrimary: "#F0EAD6",
  textMuted: "#8C7A5A",
  textInverse: "#0F0D0A",
  borderSubtle: "#3D3528",
};

/* ------------------------------------------------------------------ */
/*  Hooks — same shape as useInView / useResponsive in sectioins.tsx   */
/* ------------------------------------------------------------------ */

function useInView(margin = "-80px") {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return [ref, inView] as const;
}

function useResponsive() {
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setState({
        isMobile: w <= 639,
        isTablet: w >= 640 && w <= 1023,
        isDesktop: w >= 1024,
      });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return state;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Program = {
  id: string;
  title: string;
  schedule: string;
  image: string;
  tall: boolean;
};

const PROGRAMS: Program[] = [
  {
    id: "personal-trainer",
    title: "Personal Trainer",
    schedule: "Monday – Wednesday",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    tall: true,
  },
  {
    id: "outdoor-classes",
    title: "Outdoor Classes",
    schedule: "Tuesday – Thursday",
    image:
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=800&auto=format&fit=crop",
    tall: false,
  },
  {
    id: "digital-coursing",
    title: "Digital Coursing",
    schedule: "Friday – Saturday",
    image:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    tall: true,
  },
  {
    id: "group-training",
    title: "Group Training",
    schedule: "Sunday – Monday",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop",
    tall: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProgramsSection() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [headerRef, headerInView] = useInView("-80px");
  const [gridRef, gridInView] = useInView("-60px");
  const [hovered, setHovered] = useState<string | null>(null);

  const tallHeight = isMobile ? 320 : isTablet ? 380 : 460;
  const shortHeight = isMobile ? 320 : isTablet ? 300 : 360;

  /* Staggered offset: 2nd & 4th cards drop lower than 1st & 3rd */
  const shortOffset = isMobile ? 64 : isTablet ? 120 : 160;

  return (
    <section
      style={{
        background: tokens.bgWarm,
        padding: isMobile ? "64px 0" : "96px 0",
      }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 32px",
        }}>
        {/* Header row: heading left / paragraph right */}
        <div
          ref={headerRef}
          style={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            justifyContent: "space-between",
            alignItems: isDesktop ? "flex-end" : "flex-start",
            gap: isDesktop ? 48 : 20,
            marginBottom: isMobile ? 40 : 56,
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "none" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
          <div style={{ maxWidth: 560 }}>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: tokens.goldMid,
                marginBottom: 16,
                fontWeight: 600,
              }}>
              Our Programs
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: tokens.textPrimary,
                margin: 0,
              }}>
              Explore Our Wide
              <br />
              Range of Programs
            </h2>
          </div>

          <p
            style={{
              maxWidth: 380,
              fontSize: "1.0625rem",
              lineHeight: 1.7,
              color: tokens.textMuted,
              margin: 0,
              textAlign: isDesktop ? "right" : "left",
            }}>
            Explore our wide range of programs designed to cater to all fitness
            levels and preferences. From strength training to yoga, each program
            is crafted to help you meet your specific goals and enhance your
            overall health and well-being.
          </p>
        </div>

        {/* Card row */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr 1fr"
              : `repeat(${PROGRAMS.length}, 1fr)`,
            gap: isMobile ? 12 : 16,
            alignItems: "start",
            opacity: gridInView ? 1 : 0,
            transform: gridInView ? "none" : "translateY(40px)",
            transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
          }}>
          {PROGRAMS.map((p) => {
            const isHovered = hovered === p.id;
            const height = isMobile ? 280 : p.tall ? tallHeight : shortHeight;

            return (
              <div
                key={p.id}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  height,
                  marginTop: !p.tall ? shortOffset : 0,
                  borderRadius: 12,
                  overflow: "hidden",
                  border: `1px solid ${tokens.borderSubtle}`,
                  cursor: "pointer",
                }}>
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: isHovered ? "scale(1.06)" : "scale(1)",
                    transition: "transform 0.6s ease",
                  }}
                />

                {/* gradient overlay for legibility */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(15,13,10,0) 40%, rgba(15,13,10,0.85) 100%)",
                  }}
                />

                {/* gold sweep line, appears on hover */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 3,
                    background: tokens.goldMid,
                    transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.5s ease",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: isMobile ? "16px 14px" : "20px 18px",
                  }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: isMobile ? "0.85rem" : "1rem",
                      fontWeight: 800,
                      color: tokens.textPrimary,
                      lineHeight: 1.2,
                    }}>
                    {p.title}
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "0.7rem",
                      letterSpacing: "0.04em",
                      color: tokens.goldLight,
                    }}>
                    {p.schedule}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
