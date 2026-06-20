"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ─── Demo image placeholder helper ──────────────────────
const Img = ({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <img
    src={src}
    alt={alt}
    className={className}
    style={{ objectFit: "cover", ...style }}
  />
);

const DEMO = {
  coachPortrait:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
  trainer:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
  gym1: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  gym2: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
  gym3: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=80",
  gym4: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
  gym5: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
  gym6: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
  r1: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  r2: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  r3: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  r4: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  coachAction:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  insta1:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  insta2:
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80",
  insta3:
    "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400&q=80",
  insta4:
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
  insta5:
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
  insta6:
    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80",
};

// ─── Shared tokens ────────────────────────────────────────
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
  borderDefault: "#D4A843",
};

const s = {
  section: {
    background: tokens.bgWarm,
    color: tokens.textPrimary,
    fontFamily: "var(--font-geist-sans, 'Geist', sans-serif)",
  },
  label: {
    fontSize: "0.65rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: tokens.goldMid,
    fontWeight: 600,
    marginBottom: 16,
    display: "block",
  },
  heading: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.08,
    color: tokens.textPrimary,
  },
  sub: {
    fontSize: "1.0625rem",
    color: tokens.textMuted,
    lineHeight: 1.7,
    marginTop: 16,
  },
  card: {
    background: tokens.bgSurface,
    border: `1px solid ${tokens.borderSubtle}`,
    borderRadius: 16,
    overflow: "hidden",
  },
  goldBtn: {
    background: tokens.goldMid,
    color: tokens.textInverse,
    border: "none",
    borderRadius: 9999,
    padding: "14px 32px",
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background 0.25s, transform 0.18s",
    display: "inline-block",
  },
  outlineBtn: {
    background: "transparent",
    color: tokens.goldMid,
    border: `2px solid ${tokens.borderDefault}`,
    borderRadius: 9999,
    padding: "13px 32px",
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background 0.25s",
    display: "inline-block",
  },
};

// ─── useInView ────────────────────────────────────────────
function useInView(margin = "0px"): [React.RefObject<null>, boolean] {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { rootMargin: margin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);
  return [ref, inView];
}

// ─── useMediaQuery ──────────────────────────────────────────
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

function useResponsive() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return { isMobile, isTablet, isDesktop };
}

// ═══════════════════════════════════════════════════════════
// 1. ABOUT SECTION
// ═══════════════════════════════════════════════════════════
export function AboutSection() {
  const [ref, inView] = useInView("-80px");
  const { isMobile, isTablet } = useResponsive();
  const isStacked = isMobile || isTablet;

  const stats = [
    { num: "12+", label: "Years Training" },
    { num: "3K+", label: "Clients Transformed" },
    { num: "98%", label: "Success Rate" },
    { num: "5×", label: "Award Winner" },
  ];

  return (
    <section
      id="about"
      style={{
        ...s.section,
        background: tokens.bgBase,
        padding: isMobile ? "64px 0" : "96px 0",
      }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `0 ${isMobile ? 20 : 32}px`,
        }}>
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: isStacked ? "1fr" : "1fr 1fr",
            gap: isStacked ? 40 : 80,
            alignItems: "center",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
          {/* Left — image stack */}
          <div
            style={{
              position: "relative",
              height: isMobile ? 340 : isTablet ? 420 : 560,
            }}>
            {/* Main image */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: isMobile ? 40 : 80,
                bottom: isMobile ? 40 : 80,
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${tokens.borderSubtle}`,
              }}>
              <Img
                src={DEMO.trainer}
                alt="Rayhaan training"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, ${tokens.bgBase}BB 0%, transparent 50%)`,
                }}
              />
            </div>
            {/* Accent image bottom-right */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: isMobile ? 120 : 220,
                height: isMobile ? 120 : 220,
                borderRadius: 16,
                overflow: "hidden",
                border: `2px solid ${tokens.goldMuted}`,
              }}>
              <Img
                src={DEMO.gym2}
                alt="Gym"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Gold vertical strip */}
            <div
              style={{
                position: "absolute",
                top: isMobile ? 20 : 40,
                left: isMobile ? -8 : -16,
                width: 3,
                height: isMobile ? 120 : 200,
                background: `linear-gradient(to bottom, ${tokens.goldLight}, ${tokens.goldDeep})`,
                borderRadius: 2,
              }}
            />
            {/* Floating stat */}
            <div
              style={{
                position: "absolute",
                top: isMobile ? 16 : 32,
                right: isMobile ? 20 : 60,
                background: tokens.bgSurface,
                border: `1px solid ${tokens.borderSubtle}`,
                borderRadius: 12,
                padding: isMobile ? "10px 14px" : "14px 20px",
                backdropFilter: "blur(8px)",
              }}>
              <div
                style={{
                  fontSize: isMobile ? "1.1rem" : "1.5rem",
                  fontWeight: 700,
                  color: tokens.goldLight,
                  lineHeight: 1,
                }}>
                ★ 4.9
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: tokens.textMuted,
                  marginTop: 4,
                }}>
                Client Rating
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div>
            <span style={s.label}>About Rayhaan</span>
            <h2 style={s.heading}>
              Built From Sweat,
              <br />
              <span style={{ color: tokens.goldLight, fontStyle: "italic" }}>
                Not Theory
              </span>
            </h2>
            <p style={{ ...s.sub, maxWidth: 480, marginBottom: 24 }}>
              Rayhaan isn't a gym persona — it's a philosophy. Forged through 12
              years of competing, failing, and rebuilding, every program carries
              the weight of real-world lessons, not textbook blueprints.
            </p>
            <p
              style={{
                ...s.sub,
                maxWidth: 480,
                color: `${tokens.textMuted}CC`,
                marginBottom: 40,
              }}>
              Whether you're chasing your first pull-up or your next podium, the
              system adapts to you — not the other way around. No shortcuts. No
              excuses. Just a process that works.
            </p>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(4, 1fr)",
                gap: 1,
                marginBottom: 40,
                background: tokens.borderSubtle,
                borderRadius: 12,
                overflow: "hidden",
                border: `1px solid ${tokens.borderSubtle}`,
              }}>
              {stats.map((st, i) => (
                <div
                  key={i}
                  style={{
                    background: tokens.bgSurface,
                    padding: "20px 12px",
                    textAlign: "center",
                  }}>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: tokens.goldLight,
                      lineHeight: 1,
                    }}>
                    {st.num}
                  </div>
                  <div
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: tokens.textMuted,
                      marginTop: 6,
                    }}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                style={{ ...s.goldBtn, width: isMobile ? "100%" : "auto" }}>
                My Story
              </button>
              <button
                style={{ ...s.outlineBtn, width: isMobile ? "100%" : "auto" }}>
                View Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// COACH PROFILE SECTION
// Distinct from "About" — that's brand philosophy; this is the
// person. Credentials, a personal quote, action shot, and a
// quick certification strip for instant credibility.
// ═══════════════════════════════════════════════════════════
export function CoachProfileSection() {
  const [ref, inView] = useInView("-60px");
  const { isMobile } = useResponsive();

  const credentials = [
    { label: "NASM Certified", sub: "Personal Trainer" },
    { label: "Pn1 Nutrition", sub: "Coach Certification" },
    { label: "USAW Level 2", sub: "Strength & Conditioning" },
    { label: "12 Years", sub: "Coaching Experience" },
  ];

  return (
    <section
      style={{
        ...s.section,
        background: tokens.bgBase,
        padding: isMobile ? "64px 0" : "96px 0",
      }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `0 ${isMobile ? 20 : 32}px`,
        }}>
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "0.85fr 1.15fr",
            gap: isMobile ? 40 : 72,
            alignItems: "center",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
          {/* Left — portrait + action shot stack */}
          <div style={{ position: "relative", height: isMobile ? 380 : 520 }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: isMobile ? "78%" : "82%",
                height: isMobile ? "82%" : "86%",
                borderRadius: 18,
                overflow: "hidden",
                border: `1px solid ${tokens.borderSubtle}`,
              }}>
              <img
                src={DEMO.coachPortrait}
                alt="Coach Rayhaan"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, ${tokens.bgBase}AA 0%, transparent 45%)`,
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: isMobile ? "44%" : "42%",
                height: isMobile ? "44%" : "42%",
                borderRadius: 16,
                overflow: "hidden",
                border: `2px solid ${tokens.goldMuted}`,
              }}>
              <img
                src={DEMO.coachAction}
                alt="Coaching session"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Floating credential badge */}
            <div
              style={{
                position: "absolute",
                top: 24,
                right: isMobile ? 8 : -8,
                background: tokens.bgSurface,
                border: `1px solid ${tokens.borderSubtle}`,
                borderRadius: 12,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: tokens.goldMid,
                  flexShrink: 0,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: tokens.textPrimary,
                    lineHeight: 1,
                  }}>
                  NASM-CPT
                </div>
                <div
                  style={{
                    fontSize: "0.58rem",
                    color: tokens.textMuted,
                    marginTop: 3,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}>
                  Verified
                </div>
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div>
            <span style={s.label}>Meet Your Coach</span>
            <h2 style={s.heading}>Rayhaan Ahmed</h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: tokens.goldMid,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: 8,
                marginBottom: 24,
              }}>
              Founder & Lead Coach
            </p>

            {/* Philosophy quote */}
            <div
              style={{
                borderLeft: `2px solid ${tokens.goldMuted}`,
                paddingLeft: 20,
                marginBottom: 28,
              }}>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: tokens.textPrimary,
                  fontStyle: "italic",
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                "I don't coach bodies. I coach the decision to keep showing up
                when motivation runs out."
              </p>
            </div>

            <p style={{ ...s.sub, marginBottom: 36, maxWidth: 480 }}>
              Twelve years in the trenches — as an athlete first, then as a
              coach. Rayhaan has guided over 3,000 people through
              transformations that started with one honest conversation about
              what wasn't working.
            </p>

            {/* Credential grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
                gap: 12,
                marginBottom: 36,
              }}>
              {credentials.map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: tokens.bgSurface,
                    border: `1px solid ${tokens.borderSubtle}`,
                    borderRadius: 12,
                    padding: "14px 14px",
                  }}>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: tokens.goldLight,
                      lineHeight: 1.2,
                    }}>
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.62rem",
                      color: tokens.textMuted,
                      marginTop: 4,
                      lineHeight: 1.4,
                    }}>
                    {c.sub}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button style={s.goldBtn}>Book a Call</button>
              <button style={s.outlineBtn}>Full Bio →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// INSTAGRAM FEED SECTION
// Live-feel grid signaling active coaching, not a static brand.
// Hover reveals engagement stats over each tile, like + comment
// counts, mimicking a real social embed without an API call.
// ═══════════════════════════════════════════════════════════
export function InstagramFeedSection() {
  const [ref, inView] = useInView("-60px");
  const [hovered, setHovered] = useState<number | null>(null);
  const { isMobile, isTablet } = useResponsive();

  const posts = [
    { src: DEMO.insta1, likes: "1.2K", comments: 48 },
    { src: DEMO.insta2, likes: "894", comments: 31 },
    { src: DEMO.insta3, likes: "2.1K", comments: 76 },
    { src: DEMO.insta4, likes: "763", comments: 22 },
    { src: DEMO.insta5, likes: "1.5K", comments: 54 },
    { src: DEMO.insta6, likes: "988", comments: 39 },
  ];

  const cols = isMobile ? 3 : isTablet ? 4 : 6;

  return (
    <section style={{ ...s.section, padding: isMobile ? "56px 0" : "80px 0" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `0 ${isMobile ? 20 : 32}px`,
        }}>
        {/* Header row — label left, handle/CTA right */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            gap: 16,
            marginBottom: 32,
          }}>
          <div>
            <span style={s.label}>Follow the Journey</span>
            <h2
              style={{ ...s.heading, fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}>
              Daily Proof,{" "}
              <span style={{ color: tokens.goldLight }}>Not Just Promises</span>
            </h2>
          </div>
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: tokens.goldMid,
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}>
            @rayhaanfitness
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke={tokens.goldMid}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: isMobile ? 6 : 10,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
          {posts.map((p, i) => {
            const isHov = hovered === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  borderRadius: 10,
                  cursor: "pointer",
                  border: `1px solid ${tokens.borderSubtle}`,
                }}>
                <img
                  src={p.src}
                  alt="Instagram post"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    transform: isHov ? "scale(1.07)" : "scale(1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `${tokens.bgBase}AA`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: isMobile ? 10 : 18,
                    opacity: isHov ? 1 : 0,
                    transition: "opacity 0.25s ease",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      color: tokens.textPrimary,
                      fontSize: isMobile ? "0.7rem" : "0.85rem",
                      fontWeight: 700,
                    }}>
                    <svg
                      width={isMobile ? 12 : 14}
                      height={isMobile ? 12 : 14}
                      viewBox="0 0 16 16"
                      fill={tokens.goldLight}>
                      <path d="M8 14s-5.5-3.4-7-7.2C-0.2 3.6 1.6 1 4.4 1c1.5 0 2.7.8 3.6 2 0.9-1.2 2.1-2 3.6-2 2.8 0 4.6 2.6 3.4 5.8C13.5 10.6 8 14 8 14z" />
                    </svg>
                    {p.likes}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      color: tokens.textPrimary,
                      fontSize: isMobile ? "0.7rem" : "0.85rem",
                      fontWeight: 700,
                    }}>
                    <svg
                      width={isMobile ? 12 : 14}
                      height={isMobile ? 12 : 14}
                      viewBox="0 0 16 16"
                      fill="none">
                      <path
                        d="M1 7.5C1 4 4 1.5 8 1.5s7 2.5 7 6-3 6-7 6c-.8 0-1.6-.1-2.3-.3L2 14l1.1-2.8C1.8 10.2 1 9 1 7.5z"
                        stroke={tokens.goldLight}
                        strokeWidth="1.4"
                      />
                    </svg>
                    {p.comments}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// 2. BENTO GRID IMAGE SECTION
// ═══════════════════════════════════════════════════════════
export function BentoSection() {
  const [ref, inView] = useInView("-60px");
  const [hovered, setHovered] = useState<number | null>(null);
  const { isMobile, isTablet } = useResponsive();

  const cells = [
    {
      id: 0,
      src: DEMO.trainer,
      tag: "Signature Zone",
      title: "Strength Training",
      desc: "Progressive overload built around your body's signals, not a spreadsheet.",
      badge: "Core Program",
      col: "1 / 3",
      row: "1 / 2",
      mobileCol: "1 / 2",
      mobileRow: "1 / 2",
    },
    {
      id: 1,
      src: DEMO.gym3,
      tag: "Conditioning",
      title: "Cardio Engine",
      desc: null,
      badge: "All Levels",
      col: "3 / 4",
      row: "1 / 2",
    },
    {
      id: 2,
      src: DEMO.gym4,
      tag: "Fuel",
      title: "Nutrition Planning",
      desc: null,
      badge: "Macro-Based",
      col: "1 / 2",
      row: "2 / 3",
    },
    {
      id: 3,
      src: DEMO.gym2,
      tag: "Mastery",
      title: "Form & Technique",
      desc: "Video review, live coaching, and cues that actually stick between sessions.",
      badge: "Video Review",
      col: "2 / 4",
      row: "2 / 3",
      mobileCol: "1 / 2",
      mobileRow: "4 / 5",
    },
    {
      id: 4,
      src: DEMO.gym6,
      tag: "Mindset",
      title: "Mental Edge",
      desc: null,
      badge: "Weekly Calls",
      col: "1 / 2",
      row: "3 / 4",
    },
    {
      id: 5,
      src: DEMO.gym5,
      tag: "Recovery",
      title: "Mobility Lab",
      desc: null,
      badge: "Daily Protocols",
      col: "2 / 3",
      row: "3 / 4",
    },
  ];

  const bentoGrid = isMobile
    ? { gridTemplateColumns: "1fr", gridTemplateRows: "repeat(7, auto)" }
    : isTablet
      ? {
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "200px 200px 180px 220px",
        }
      : {
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "200px 180px 220px",
        };

  const cellSpan = (cell: (typeof cells)[0]) => {
    if (isMobile) {
      return {
        gridColumn: cell.mobileCol ?? "1 / 2",
        gridRow: cell.mobileRow ?? "auto",
      };
    }
    return { gridColumn: cell.col, gridRow: cell.row };
  };

  return (
    <section
      style={{
        ...s.section,
        background: tokens.bgBase,
        padding: isMobile ? "64px 0" : "96px 0",
      }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `0 ${isMobile ? 20 : 32}px`,
        }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 56 }}>
          <span style={s.label}>Inside the Arena</span>
          <h2 style={s.heading}>
            Where Potential
            <br />
            <span style={{ color: tokens.goldLight }}>Meets Process</span>
          </h2>
        </div>

        <div
          ref={ref}
          className="md:px-10"
          style={{
            display: "grid",
            ...bentoGrid,
            gap: 10,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(32px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}>
          {cells.map((cell) => {
            const isHov = hovered === cell.id;
            const sp = cellSpan(cell);
            return (
              <div
                key={cell.id}
                onMouseEnter={() => setHovered(cell.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  gridColumn: sp.gridColumn,
                  gridRow: sp.gridRow,
                  borderRadius: 12,
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  border: `1px solid ${tokens.borderSubtle}`,
                  minHeight: isMobile ? 220 : "auto",
                }}>
                {/* Image */}
                <img
                  src={cell.src}
                  alt={cell.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.55s ease",
                    transform: isHov ? "scale(1.06)" : "scale(1)",
                  }}
                />

                {/* Dark overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(160deg, rgba(15,13,10,0.78) 0%, rgba(15,13,10,0.08) 55%, rgba(15,13,10,0.6) 100%)`,
                    transition: "opacity 0.35s",
                    opacity: isHov ? 1 : 0.85,
                  }}
                />

                {/* Top-left content */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 18,
                    right: 18,
                  }}>
                  {/* Tag row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 7,
                    }}>
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: tokens.goldMid,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: tokens.goldMid,
                        fontWeight: 700,
                      }}>
                      {cell.tag}
                    </span>
                  </div>
                  {/* Title */}
                  <div
                    style={{
                      fontSize:
                        cell.col === "1 / 3" || cell.col === "2 / 4"
                          ? "1.15rem"
                          : "1rem",
                      fontWeight: 800,
                      color: tokens.textPrimary,
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                    }}>
                    {cell.title}
                  </div>
                  {/* Description (only on wide cells) */}
                  {cell.desc && (
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: `${tokens.textPrimary}99`,
                        lineHeight: 1.55,
                        marginTop: 6,
                        maxWidth: 220,
                      }}>
                      {cell.desc}
                    </div>
                  )}
                </div>

                {/* Bottom-right badge — appears on hover */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    right: 14,
                    background: `rgba(212,168,67,0.15)`,
                    border: `1px solid rgba(212,168,67,0.32)`,
                    borderRadius: 99,
                    padding: "4px 10px",
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: tokens.goldLight,
                    fontWeight: 600,
                    opacity: isHov ? 1 : 0,
                    transform: isHov ? "translateY(0)" : "translateY(4px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}>
                  {cell.badge}
                </div>

                {/* Gold sweep line at bottom on hover */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(to right, ${tokens.goldMid}, transparent)`,
                    transformOrigin: "left",
                    transform: isHov ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 0.4s ease",
                  }}
                />
              </div>
            );
          })}

          {/* Full-width bottom image */}
          <div
            style={{
              gridColumn: isMobile ? "1 / 2" : isTablet ? "1 / 3" : "1 / 4",
              gridRow: isMobile ? "7 / 8" : isTablet ? "4 / 5" : "3 / 4",
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              border: `1px solid ${tokens.borderSubtle}`,
              minHeight: isMobile ? 200 : 220,
            }}>
            <img
              src={DEMO.gym1}
              alt="Training facility"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to right, ${tokens.bgBase}CC, transparent 50%)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 32px",
              }}>
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: tokens.goldMid,
                  fontWeight: 700,
                }}>
                6 Training Disciplines
              </span>
              <span
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  color: tokens.textPrimary,
                  lineHeight: 1.15,
                  marginTop: 6,
                }}>
                One System
              </span>
            </div>
          </div>
        </div>

        {/* Bottom caption */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 8 : 0,
            marginTop: 28,
            paddingTop: 20,
            borderTop: `1px solid ${tokens.borderSubtle}`,
          }}>
          <span style={{ ...s.label, margin: 0, fontSize: "0.6rem" }}>
            Real Environment. Real Results.
          </span>
          <span style={{ fontSize: "0.75rem", color: tokens.textMuted }}>
            Dhaka, Bangladesh
          </span>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// 3. PACKAGES SECTION
// ═══════════════════════════════════════════════════════════
export function PackagesSection() {
  const [ref, inView] = useInView("-60px");
  const [hov, setHov] = useState<number | null>(null);
  const { isMobile, isTablet } = useResponsive();

  const plans = [
    {
      name: "Foundation",
      price: "4,999",
      period: "/ month",
      badge: null,
      desc: "Built for beginners who need structure before intensity.",
      features: [
        "3 sessions per week",
        "Personalized program design",
        "Nutrition blueprint",
        "Weekly check-in call",
        "Form video review",
      ],
      excluded: ["Priority scheduling", "Body composition analysis"],
    },
    {
      name: "Accelerate",
      price: "8,999",
      period: "/ month",
      badge: "Most Popular",
      desc: "For committed athletes ready to break plateaus and build momentum.",
      features: [
        "5 sessions per week",
        "Adaptive programming",
        "Macro & meal planning",
        "Bi-weekly strategy calls",
        "Form video review",
        "Priority scheduling",
      ],
      excluded: ["Body composition analysis"],
    },
    {
      name: "Elite",
      price: "14,999",
      period: "/ month",
      badge: "Full Access",
      desc: "Total immersion — for those who refuse to leave anything on the table.",
      features: [
        "Unlimited sessions",
        "24/7 coach access (WhatsApp)",
        "Full meal plan + recipes",
        "Weekly strategy calls",
        "Form video review",
        "Priority scheduling",
        "Monthly body composition analysis",
      ],
      excluded: [],
    },
  ];

  return (
    <section
      id="packages"
      style={{
        ...s.section,
        background: tokens.bgBase,
        padding: isMobile ? "64px 0" : "96px 0",
      }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `0 ${isMobile ? 20 : 32}px`,
        }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
          <span style={s.label}>Investment</span>
          <h2 style={s.heading}>
            Choose Your
            <br />
            <span style={{ color: tokens.goldLight }}>Arena</span>
          </h2>
          <p style={{ ...s.sub, maxWidth: 480, margin: "16px auto 0" }}>
            Every tier is a commitment. Pick the one that matches the intensity
            you're bringing.
          </p>
        </div>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(3, 1fr)",
            gap: 20,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(36px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
          {plans.map((plan, i) => {
            const isPopular = plan.badge === "Most Popular";
            const isHov = hov === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  background: isPopular
                    ? `linear-gradient(145deg, ${tokens.bgSurface}, ${tokens.bgOverlay})`
                    : tokens.bgSurface,
                  border: isPopular
                    ? `1.5px solid ${tokens.goldMid}`
                    : `1px solid ${tokens.borderSubtle}`,
                  borderRadius: 20,
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transform: isHov ? "translateY(-6px)" : "none",
                  boxShadow:
                    isHov && isPopular
                      ? `0 20px 60px ${tokens.goldMuted}33`
                      : "none",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease",
                }}>
                {/* Badge */}
                {plan.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: isPopular ? tokens.goldMid : tokens.bgOverlay,
                      color: isPopular ? tokens.textInverse : tokens.goldMid,
                      borderRadius: 9999,
                      padding: "5px 18px",
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan name */}
                <div
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: tokens.goldMid,
                    marginBottom: 10,
                  }}>
                  {plan.name}
                </div>

                {/* Price */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 4,
                    marginBottom: 6,
                  }}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: tokens.textMuted,
                      alignSelf: "flex-start",
                      marginTop: 8,
                    }}>
                    ৳
                  </span>
                  <span
                    style={{
                      fontSize: "2.6rem",
                      fontWeight: 700,
                      color: tokens.goldLight,
                      lineHeight: 1,
                    }}>
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: tokens.textMuted,
                      paddingBottom: 6,
                    }}>
                    {plan.period}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: tokens.textMuted,
                    lineHeight: 1.6,
                    marginBottom: 28,
                    minHeight: 40,
                  }}>
                  {plan.desc}
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background: tokens.borderSubtle,
                    marginBottom: 24,
                  }}
                />

                {/* Features */}
                <div style={{ flex: 1, marginBottom: 32 }}>
                  {plan.features.map((f, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 11,
                      }}>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: `${tokens.goldMid}22`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path
                            d="M1.5 4L3.5 6L6.5 2"
                            stroke={tokens.goldMid}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: "0.83rem",
                          color: tokens.textPrimary,
                        }}>
                        {f}
                      </span>
                    </div>
                  ))}
                  {plan.excluded.map((f, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 11,
                        opacity: 0.35,
                      }}>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: tokens.borderSubtle,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path
                            d="M2 2L6 6M6 2L2 6"
                            stroke={tokens.textMuted}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: "0.83rem",
                          color: tokens.textMuted,
                        }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  style={{
                    ...(isPopular ? s.goldBtn : s.outlineBtn),
                    width: "100%",
                    textAlign: "center",
                    padding: "14px 0",
                    background: isPopular ? tokens.goldMid : "transparent",
                  }}>
                  {isPopular ? "Start Now" : "Get Started"}
                </button>
              </div>
            );
          })}
        </div>

        <p
          style={{
            textAlign: "center",
            color: tokens.textMuted,
            fontSize: "0.78rem",
            marginTop: 28,
          }}>
          All plans include a free strategy call. No lock-in contracts.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// 4. REVIEWS SECTION — Vertical Ghost Drift
// Three columns of testimonial cards drift continuously:
// col 1 ↑, col 2 ↓, col 3 ↑ (slower). Cards are fully readable
// at rest with a soft "ghosty" haze (slight blur, near-full
// opacity). Hovering anywhere on the wall simply pauses the
// drift — no per-card focus effect, no extra opacity drop.
// ═══════════════════════════════════════════════════════════
export function ReviewsSection() {
  const [ref, inView] = useInView("-40px");
  const [paused, setPaused] = useState(false);
  const { isMobile } = useResponsive();

  const reviews = [
    {
      name: "Tariq Al-Rashid",
      role: "Lost 18kg in 5 months",
      avatar: DEMO.r1,
      stars: 5,
      quote: "He actually listened. Six months in, I ran my first 10K.",
    },
    {
      name: "Priya Sharma",
      role: "Gained 6kg muscle mass",
      avatar: DEMO.r2,
      stars: 5,
      quote: "I now deadlift twice my bodyweight, and I'm proud of it.",
    },
    {
      name: "James Whitfield",
      role: "Marathon prep",
      avatar: DEMO.r3,
      stars: 5,
      quote:
        "My marathon PR dropped by 22 minutes. He gets the mental side too.",
    },
    {
      name: "Nadia Okonkwo",
      role: "Post-pregnancy comeback",
      avatar: DEMO.r4,
      stars: 5,
      quote:
        "Best shape of my adult life at 34 — and it actually respected my body.",
    },
    {
      name: "Farid Hossain",
      role: "Strength plateau broken",
      avatar: DEMO.r1,
      stars: 5,
      quote: "Stuck for two years. Three months with Rayhaan, +25kg on my max.",
    },
    {
      name: "Sana Malik",
      role: "First competition prep",
      avatar: DEMO.r2,
      stars: 5,
      quote: "He managed my nerves and my routine, not just my training.",
    },
  ];

  // Three columns, two cards each — short and uncluttered
  const col1 = [reviews[0], reviews[3]];
  const col2 = [reviews[1], reviews[4]];
  const col3 = [reviews[2], reviews[5]];

  const Stars = ({ n }: { n: number }) => (
    <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill={tokens.goldMid}>
          <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.3l-3.7 2.1.7-4.1-3-2.9 4.2-.8z" />
        </svg>
      ))}
    </div>
  );

  const Card = ({ r }: { r: { name: string; role: string; avatar: string; stars: number; quote: string } }) => (
    <div
      style={{
        background: tokens.bgSurface,
        border: `1px solid ${tokens.borderSubtle}`,
        borderRadius: 16,
        padding: "24px 22px",
      }}>
      <Stars n={r.stars} />
      <p
        style={{
          fontSize: "0.84rem",
          color: tokens.textPrimary,
          lineHeight: 1.6,
          fontStyle: "italic",
          margin: "0 0 16px",
        }}>
        "{r.quote}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: `1px solid ${tokens.goldMuted}`,
          }}>
          <Img
            src={r.avatar}
            alt={r.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          <div
            style={{
              fontWeight: 700,
              color: tokens.textPrimary,
              fontSize: "0.78rem",
            }}>
            {r.name}
          </div>
          <div
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: tokens.goldMid,
              marginTop: 2,
            }}>
            {r.role}
          </div>
        </div>
      </div>
    </div>
  );

  // Each column renders its set TWICE stacked for a seamless loop,
  // then slides translateY(0) → translateY(-50%) (or the reverse).
  const Column = ({ items, direction, duration }: { items: { name: string; role: string; avatar: string; stars: number; quote: string }[]; direction: string; duration: number }) => (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: isMobile ? 360 : 460,
        flex: 1,
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          width: "100%",
          animationName:
            direction === "up" ? "ghostScrollUp" : "ghostScrollDown",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: paused ? "paused" : "running",
        }}>
        {[...items, ...items].map((r, i) => (
          <Card r={r} key={i} />
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="review"
      style={{
        ...s.section,
        padding: isMobile ? "64px 0" : "96px 0",
        overflow: "hidden",
        filter: "blur(0.4px)",
      }}>
      <style>{`
        @keyframes ghostScrollUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes ghostScrollDown {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ghost-wall [style*="animation-name"] { animation: none !important; }
        }
      `}</style>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `0 ${isMobile ? 28 : 96}px`,
        }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
          <span style={s.label}>Testimonials</span>
          <h2 style={s.heading}>
            Results
            <br />
            <span style={{ color: tokens.goldLight }}>Speak First</span>
          </h2>
          <p style={{ ...s.sub, maxWidth: 460, margin: "16px auto 0" }}>
            Hover anywhere on the wall to pause the drift.
          </p>
        </div>

        <div
          ref={ref}
          className="ghost-wall"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            display: "flex",
            gap: isMobile ? 14 : 24,
            opacity: inView ? 1 : 0,
            transition: "opacity 0.9s ease",
          }}>
          <Column items={col1} direction="up" duration={22} />
          <Column items={col2} direction="down" duration={26} />
          {!isMobile && <Column items={col3} direction="up" duration={30} />}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// 5. CONTACT SECTION
// ═══════════════════════════════════════════════════════════
export function ContactSection() {
  const [ref, inView] = useInView("-40px");
  const { isMobile, isTablet } = useResponsive();
  const isStacked = isMobile || isTablet;
  const [form, setForm] = useState({
    name: "",
    email: "",
    goal: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: tokens.bgOverlay,
    border: `1px solid ${tokens.borderSubtle}`,
    borderRadius: 10,
    padding: "14px 16px",
    color: tokens.textPrimary,
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const contactInfo = [
    {
      icon: "📍",
      label: "Location",
      value: "21/c Nur Fattah Lane, Dhaka 1211 — Ashiyana Tower",
    },
    { icon: "📞", label: "Phone", value: "02-55155028" },
    { icon: "⏰", label: "Hours", value: "Opens 6 AM daily · Closed Friday" },
    { icon: "⭐", label: "Rating", value: "4.6 ★ from 1,002 reviews" },
  ];

  return (
    <section
      id="contact"
      style={{
        ...s.section,
        background: tokens.bgBase,
        padding: isMobile ? "64px 0" : "96px 0",
      }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `0 ${isMobile ? 20 : 32}px`,
        }}>
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: isStacked ? "1fr" : "1fr 1.4fr",
            gap: isStacked ? 40 : 80,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(32px)",
            transition: "all 0.8s ease",
          }}>
          {/* Left */}
          <div>
            <span style={s.label}>Get In Touch</span>
            <h2
              style={{
                ...s.heading,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                marginBottom: 20,
              }}>
              Ready to Start
              <br />
              <span style={{ color: tokens.goldLight }}>Your Chapter?</span>
            </h2>
            <p style={{ ...s.sub, marginBottom: 48 }}>
              The first conversation is free. Tell Rayhaan where you are and
              where you want to be — the rest is just work.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {contactInfo.map((c, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: `${tokens.goldMid}18`,
                      border: `1px solid ${tokens.borderSubtle}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      flexShrink: 0,
                    }}>
                    {c.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: tokens.textMuted,
                        marginBottom: 3,
                      }}>
                      {c.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: tokens.textPrimary,
                        fontWeight: 500,
                      }}>
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social strip */}
            <div
              style={{
                marginTop: 48,
                paddingTop: 32,
                borderTop: `1px solid ${tokens.borderSubtle}`,
              }}>
              <div
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: tokens.textMuted,
                  marginBottom: 16,
                }}>
                Follow the Journey
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {["Instagram", "YouTube", "TikTok"].map((s2, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "8px 16px",
                      background: tokens.bgSurface,
                      border: `1px solid ${tokens.borderSubtle}`,
                      borderRadius: 8,
                      fontSize: "0.75rem",
                      color: tokens.textMuted,
                      cursor: "pointer",
                      letterSpacing: "0.08em",
                    }}>
                    {s2}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div
            style={{
              background: tokens.bgSurface,
              border: `1px solid ${tokens.borderSubtle}`,
              borderRadius: 24,
              padding: isMobile ? 28 : 48,
            }}>
            {sent ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  textAlign: "center",
                  minHeight: 360,
                }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: `${tokens.goldMid}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                    fontSize: "1.6rem",
                  }}>
                  ✓
                </div>
                <h3
                  style={{
                    color: tokens.goldLight,
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    marginBottom: 12,
                  }}>
                  Message Received
                </h3>
                <p
                  style={{
                    color: tokens.textMuted,
                    fontSize: "0.9rem",
                    maxWidth: 280,
                  }}>
                  Rayhaan will be in touch within 4 hours. Check your email.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: tokens.goldMid,
                    marginBottom: 8,
                  }}>
                  Free Strategy Call
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: tokens.textPrimary,
                    margin: 0,
                    marginBottom: 4,
                  }}>
                  Tell Us About Your Goal
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 14,
                  }}>
                  <div>
                    <label
                      style={{
                        fontSize: "0.7rem",
                        color: tokens.textMuted,
                        display: "block",
                        marginBottom: 6,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}>
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.7rem",
                        color: tokens.textMuted,
                        display: "block",
                        marginBottom: 6,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      fontSize: "0.7rem",
                      color: tokens.textMuted,
                      display: "block",
                      marginBottom: 6,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                    Primary Goal
                  </label>
                  <select
                    name="goal"
                    value={form.goal}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, appearance: "none" }}>
                    <option value="">Select your goal</option>
                    <option value="fat-loss">Fat Loss</option>
                    <option value="muscle">Muscle Building</option>
                    <option value="performance">Athletic Performance</option>
                    <option value="lifestyle">Lifestyle & Health</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      fontSize: "0.7rem",
                      color: tokens.textMuted,
                      display: "block",
                      marginBottom: 6,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell Rayhaan where you're at and what's held you back..."
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: 100,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    ...s.goldBtn,
                    textAlign: "center",
                    padding: "16px",
                    marginTop: 4,
                  }}>
                  Book Free Call →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// 6. FOOTER
// ═══════════════════════════════════════════════════════════
export function Footer() {
  const { isMobile, isTablet } = useResponsive();

  const links = {
    Training: ["Start Here", "Programs", "Elite Track", "Online Coaching"],
    Learn: ["Blog", "YouTube", "Free Resources", "Success Stories"],
    Company: ["About", "Credentials", "Press Kit", "Privacy"],
  };

  const footerGridCols = isMobile
    ? "1fr 1fr"
    : isTablet
      ? "1.5fr 1fr 1fr"
      : "1.8fr 1fr 1fr 1fr";

  return (
    <footer
      style={{
        ...s.section,
        background: tokens.bgBase,
        padding: isMobile ? "64px 0" : "96px 0",
      }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `0 ${isMobile ? 20 : 32}px`,
        }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: footerGridCols,
            gap: isMobile ? 32 : 48,
            marginBottom: isMobile ? 40 : 64,
          }}>
          {/* Brand */}
          <div style={isMobile ? { gridColumn: "1 / -1" } : {}}>
            <Image
              src="/logo.png"
              alt="Rayhaan Fitness"
              width={110}
              height={36}
              className="object-contain justify-self-start w-[100px] h-auto"
              priority
            />{" "}
            <p
              style={{
                fontSize: "0.85rem",
                color: tokens.textMuted,
                lineHeight: 1.7,
                maxWidth: 260,
                marginBottom: 24,
              }}>
              Coaching that respects your time, your body, and your ceiling.
              Based in Dhaka. Training the world.
            </p>
            {/* Email signup */}
            <div style={{ display: "flex", gap: 0, maxWidth: 300 }}>
              <input
                placeholder="Join the inner circle"
                style={{
                  flex: 1,
                  background: tokens.bgSurface,
                  border: `1px solid ${tokens.borderSubtle}`,
                  borderRight: "none",
                  borderRadius: "8px 0 0 8px",
                  padding: "11px 14px",
                  color: tokens.textPrimary,
                  fontSize: "0.8rem",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                style={{
                  background: tokens.goldMid,
                  border: "none",
                  borderRadius: "0 8px 8px 0",
                  padding: "0 16px",
                  color: tokens.textInverse,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}>
                Subscribe
              </button>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <div
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: tokens.goldMid,
                  fontWeight: 600,
                  marginBottom: 20,
                }}>
                {group}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}>
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        fontSize: "0.85rem",
                        color: tokens.textMuted,
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                        (e.currentTarget.style.color = tokens.textPrimary)
                      }
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                        (e.currentTarget.style.color = tokens.textMuted)
                      }>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gold strip */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(to right, transparent, ${tokens.goldMuted}55, transparent)`,
            marginBottom: 28,
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "center" : "center",
            gap: isMobile ? 12 : 0,
            textAlign: isMobile ? "center" : "left",
          }}>
          <span style={{ fontSize: "0.75rem", color: tokens.textMuted }}>
            © 2025 Rayhaan Fitness. All rights reserved.
          </span>
          <div className="flex items-center gap-1">
            Developed By
            <a
              href="https://stellarworm.com"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="/stellarLogo.png"
                alt="Stellar Logo"
                className="w-30 h-full"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
