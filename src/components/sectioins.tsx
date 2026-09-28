"use client";
import { BranchSelector } from "@/components/BranchSelector";
import { useBranch } from "@/context/BranchContext";
import {
  BRANCHES,
  EMAIL,
  FAQ_ITEMS,
  MEMBERSHIP_INCLUSIONS,
  PHONE_NUMBER,
  PHONE_TEL,
  WHATSAPP_BASE_URL,
  WHATSAPP_FEMALE_PREFILLED,
  getGymTourWhatsAppUrl,
} from "@/data/gymData";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

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
  coachPortrait:
    "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&q=80",
  coachAction:
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
  insta1:
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80",
  insta2:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  insta3:
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
  insta4:
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80",
  insta5:
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80",
  insta6:
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80",
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
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );
  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function useResponsive() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return { isMobile, isTablet, isDesktop };
}

// ═══════════════════════════════════════════════════════════
// FEMALE FITNESS SECTION
// ═══════════════════════════════════════════════════════════
export function FemaleFitnessSection() {
  const [ref, inView] = useInView("-60px");
  const { isMobile, isTablet } = useResponsive();

  const pillars = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Daily Exclusive Windows",
      badge: "1:00 PM – 3:00 PM",
      desc: "Every single day across Lalbagh, Dhanmondi, and Mirpur, our main floor is strictly reserved for women only.",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: "Certified Female Trainers",
      badge: "Professional Mentorship",
      desc: "Work with experienced female coaches specialized in weight loss, strength conditioning, and personalized diet charts.",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: "Complete Privacy & Comfort",
      badge: "100% Female Floor Staff",
      desc: "Zero male presence on the floor during designated hours. Private changing rooms, lockers, and clean showers.",
    },
  ];

  return (
    <section
      id="female-fitness"
      style={{
        ...s.section,
        background: tokens.bgWarm,
        padding: isMobile ? "64px 0" : "96px 0",
        borderTop: `1px solid ${tokens.borderSubtle}`,
        borderBottom: `1px solid ${tokens.borderSubtle}`,
      }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `0 ${isMobile ? 20 : 32}px`,
        }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
          <span style={s.label}>Women&apos;s Safe Zone</span>
          <h2 style={s.heading}>
            Safe, Empowering &amp;
            <br />
            <span style={{ color: tokens.goldLight }}>
              Dedicated Fitness for Women
            </span>
          </h2>
          <p style={{ ...s.sub, maxWidth: 540, margin: "16px auto 0" }}>
            A secure, empowering environment where you can train with complete
            privacy, certified female trainers, and tailored nutrition plans.
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
            gap: 24,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
          {pillars.map((pillar, i) => (
            <div
              key={i}
              style={{
                background: tokens.bgSurface,
                border: `1px solid ${tokens.borderSubtle}`,
                borderRadius: 18,
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: `${tokens.goldMid}20`,
                  color: tokens.goldLight,
                  marginBottom: 20,
                }}>
                {pillar.icon}
              </div>
              <span
                style={{
                  alignSelf: "flex-start",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: tokens.goldMid,
                  background: `${tokens.goldMid}15`,
                  border: `1px solid ${tokens.goldMid}30`,
                  borderRadius: 9999,
                  padding: "3px 12px",
                  marginBottom: 12,
                }}>
                {pillar.badge}
              </span>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: tokens.textPrimary,
                  marginBottom: 12,
                }}>
                {pillar.title}
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: tokens.textMuted,
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <a
            href={`${WHATSAPP_BASE_URL}?text=${WHATSAPP_FEMALE_PREFILLED}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...s.goldBtn,
              padding: "16px 36px",
              textDecoration: "none",
            }}>
            Join Female Fitness Program →
          </a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// 1. ABOUT SECTION
// ═══════════════════════════════════════════════════════════
export function AboutSection() {
  const [ref, inView] = useInView("-80px");
  const { isMobile, isTablet } = useResponsive();
  const isStacked = isMobile || isTablet;

  const stats = [
    { num: "3", label: "Strategic Outlets" },
    { num: "65K+", label: "Active Members" },
    { num: "15+", label: "Certified Coaches" },
    { num: "4.9★", label: "Member Rating" },
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
            <span style={s.label}>About Rayhan Fitness</span>
            <h2 style={s.heading}>
              Built From Sweat,
              <br />
              <span style={{ color: tokens.goldLight, fontStyle: "italic" }}>
                Not Theory
              </span>
            </h2>
            <p style={{ ...s.sub, maxWidth: 500, marginBottom: 20 }}>
              Rayhan Fitness isn&apos;t just a gym — it&apos;s a powerhouse
              forged through national bodybuilding championship victories,
              proven coaching blueprints, and an uncompromising commitment to
              athlete performance.
            </p>
            <p
              style={{
                ...s.sub,
                maxWidth: 500,
                color: `${tokens.textMuted}CC`,
                marginBottom: 36,
              }}>
              Across our Lalbagh, Dhanmondi, and Mirpur outlets, we provide
              world-class imported biomechanics equipment, dedicated female-only
              training windows, and guidance from Bangladesh&apos;s finest
              certified fitness professionals.
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
              <a
                href="#outlets"
                style={{
                  ...s.goldBtn,
                  width: isMobile ? "100%" : "auto",
                  textAlign: "center",
                  textDecoration: "none",
                }}>
                Explore Outlets →
              </a>
              <a
                href="#packages"
                style={{
                  ...s.outlineBtn,
                  width: isMobile ? "100%" : "auto",
                  textAlign: "center",
                  textDecoration: "none",
                }}>
                View Memberships
              </a>
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
                &ldquo;I don&apos;t coach bodies. I coach the decision to keep
                showing up when motivation runs out.&rdquo;
              </p>
            </div>

            <p style={{ ...s.sub, marginBottom: 36, maxWidth: 480 }}>
              Twelve years in the trenches — as an athlete first, then as a
              coach. Rayhaan has guided over 3,000 people through
              transformations that started with one honest conversation about
              what wasn&apos;t working.
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
// OUTLET LOCATIONS SECTION
// ═══════════════════════════════════════════════════════════
export function OutletLocationsSection() {
  const [ref, inView] = useInView("-60px");
  const { isMobile, isTablet } = useResponsive();
  const { selectedBranch, setSelectedBranch } = useBranch();

  return (
    <section
      id="outlets"
      style={{
        ...s.section,
        background: tokens.bgWarm,
        padding: isMobile ? "64px 0" : "96px 0",
      }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `0 ${isMobile ? 20 : 32}px`,
        }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
          <span style={s.label}>Our Facilities</span>
          <h2 style={s.heading}>
            3 Strategic Outlets
            <br />
            <span style={{ color: tokens.goldLight }}>Across Dhaka</span>
          </h2>
          <p style={{ ...s.sub, maxWidth: 540, margin: "16px auto 24px" }}>
            State-of-the-art facilities equipped with imported biomechanics
            machinery, certified coaches, and daily dedicated female workout
            hours.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BranchSelector />
          </div>
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
            gap: 24,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
          {BRANCHES.map((b) => {
            const isSelected = selectedBranch === b.id;
            return (
              <div
                key={b.id}
                onClick={() => setSelectedBranch(b.id)}
                style={{
                  background: isSelected
                    ? `linear-gradient(145deg, ${tokens.bgSurface}, ${tokens.bgOverlay})`
                    : tokens.bgSurface,
                  border: isSelected
                    ? `1.5px solid ${tokens.goldMid}`
                    : `1px solid ${tokens.borderSubtle}`,
                  borderRadius: 20,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  cursor: "pointer",
                  boxShadow: isSelected
                    ? `0 12px 40px ${tokens.goldMid}20`
                    : "none",
                  transition: "all 0.3s ease",
                }}>
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: -12,
                      right: 24,
                      background: tokens.goldMid,
                      color: tokens.textInverse,
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "3px 12px",
                      borderRadius: 9999,
                    }}>
                    Selected
                  </div>
                )}

                <div style={{ marginBottom: 16 }}>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: tokens.goldMid,
                    }}>
                    {b.id === "lalbagh"
                      ? "Flagship Facility"
                      : "Strategic Outlet"}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: tokens.textPrimary,
                      marginTop: 4,
                    }}>
                    {b.name}
                  </h3>
                </div>

                {/* Address */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}>
                  <span style={{ fontSize: "1rem", lineHeight: 1.2 }}>📍</span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      color: tokens.textMuted,
                      lineHeight: 1.5,
                    }}>
                    {b.address}
                  </p>
                </div>

                {/* Hours Box */}
                <div
                  style={{
                    background: tokens.bgWarm,
                    border: `1px solid ${tokens.borderSubtle}`,
                    borderRadius: 12,
                    padding: "14px 16px",
                    marginBottom: 20,
                  }}>
                  <div style={{ marginBottom: 8 }}>
                    <div
                      style={{
                        fontSize: "0.62rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: tokens.goldMid,
                        fontWeight: 700,
                      }}>
                      Operational Hours
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: tokens.textPrimary,
                        fontWeight: 500,
                      }}>
                      {b.hours.combined}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.62rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#F472B6",
                        fontWeight: 700,
                      }}>
                      Female-Only Slot
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: tokens.textPrimary,
                        fontWeight: 500,
                      }}>
                      {b.hours.femaleSlot}
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div style={{ flex: 1, marginBottom: 24 }}>
                  <div
                    style={{
                      fontSize: "0.62rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: tokens.goldMuted,
                      fontWeight: 700,
                      marginBottom: 10,
                    }}>
                    Branch Highlights
                  </div>
                  {b.features.map((feat, fi) => (
                    <div
                      key={fi}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 7,
                      }}>
                      <span
                        style={{ color: tokens.goldMid, fontSize: "0.75rem" }}>
                        ✓
                      </span>
                      <span
                        style={{ fontSize: "0.8rem", color: tokens.textMuted }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        textAlign: "center",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        background: tokens.bgWarm,
                        color: tokens.textPrimary,
                        border: `1px solid ${tokens.borderSubtle}`,
                        borderRadius: 8,
                        textDecoration: "none",
                      }}>
                      🗺️ Directions
                    </a>
                    <a
                      href={b.phoneTel}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        textAlign: "center",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        background: tokens.bgWarm,
                        color: tokens.goldMid,
                        border: `1px solid ${tokens.borderSubtle}`,
                        borderRadius: 8,
                        textDecoration: "none",
                      }}>
                      📞 Call
                    </a>
                  </div>
                  <a
                    href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent(`Hi Rayhan Fitness, I would like to book a visit to the ${b.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      padding: "11px 0",
                      textAlign: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: isSelected ? tokens.goldMid : "transparent",
                      color: isSelected ? tokens.textInverse : tokens.goldMid,
                      border: isSelected
                        ? "none"
                        : `1px solid ${tokens.goldMid}`,
                      borderRadius: 8,
                      textDecoration: "none",
                    }}>
                    💬 WhatsApp {b.label}
                  </a>
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
// 3. PACKAGES SECTION
// ═══════════════════════════════════════════════════════════
export function PackagesSection() {
  const [ref, inView] = useInView("-60px");
  const [hov, setHov] = useState<number | null>(null);
  const { isMobile, isTablet } = useResponsive();
  const { branch } = useBranch();

  const price3 = branch.pricing["3months"];
  const price6 = branch.pricing["6months"];
  const price12 = branch.pricing["12months"];

  const perMonth3 = Math.round(price3 / 3);
  const perMonth6 = Math.round(price6 / 6);
  const perMonth12 = Math.round(price12 / 12);

  const savings6 = Math.round(((price3 * 2 - price6) / (price3 * 2)) * 100);
  const savings12 = Math.round(((price3 * 4 - price12) / (price3 * 4)) * 100);

  const plans = [
    {
      name: "3 Months",
      duration: "3 Months",
      price: price3.toLocaleString("en-BD"),
      period: "/ 3 months",
      perMonth: `৳${perMonth3.toLocaleString("en-BD")}/mo`,
      badge: null,
      savings: null,
      desc: `Ideal starter package for dedicated transformation at our ${branch.label} branch.`,
      features: MEMBERSHIP_INCLUSIONS,
      whatsappUrl: `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(
        `Hi Rayhan Fitness, I would like to join the 3 Months plan (৳${price3.toLocaleString("en-BD")}) at the ${branch.name}.`,
      )}`,
    },
    {
      name: "6 Months",
      duration: "6 Months",
      price: price6.toLocaleString("en-BD"),
      period: "/ 6 months",
      perMonth: `৳${perMonth6.toLocaleString("en-BD")}/mo`,
      badge: "Best Value",
      savings: savings6 > 0 ? `Save ${savings6}% vs quarterly` : null,
      desc: `Our most popular option for sustainable strength & physique gains.`,
      features: [
        ...MEMBERSHIP_INCLUSIONS,
        "Dedicated monthly progress check-in",
      ],
      whatsappUrl: `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(
        `Hi Rayhan Fitness, I would like to join the 6 Months plan (৳${price6.toLocaleString("en-BD")}) at the ${branch.name}.`,
      )}`,
    },
    {
      name: "12 Months",
      duration: "12 Months",
      price: price12.toLocaleString("en-BD"),
      period: "/ 12 months",
      perMonth: `৳${perMonth12.toLocaleString("en-BD")}/mo`,
      badge: "Maximum Savings",
      savings: savings12 > 0 ? `Save ${savings12}% vs quarterly` : null,
      desc: `Full-year commitment with the lowest monthly cost for lifelong fitness.`,
      features: [
        ...MEMBERSHIP_INCLUSIONS,
        "Dedicated monthly progress check-in",
        "Priority guidance & diet modifications",
      ],
      whatsappUrl: `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(
        `Hi Rayhan Fitness, I would like to join the 12 Months plan (৳${price12.toLocaleString("en-BD")}) at the ${branch.name}.`,
      )}`,
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
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
          <span style={s.label}>Membership Pricing</span>
          <h2 style={s.heading}>
            Transparent Rates.
            <br />
            <span style={{ color: tokens.goldLight }}>Zero Hidden Fees</span>
          </h2>
          <p style={{ ...s.sub, maxWidth: 520, margin: "16px auto 24px" }}>
            Select your preferred branch to view official membership tiers.
            Every plan includes customized diet planning and coach guidance.
          </p>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
            }}>
            <BranchSelector />
          </div>
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
            const isPopular = plan.badge === "Best Value";
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

                {/* Savings tag */}
                {plan.savings && (
                  <div
                    style={{
                      alignSelf: "flex-start",
                      background: `${tokens.goldMid}20`,
                      color: tokens.goldLight,
                      border: `1px solid ${tokens.goldMid}40`,
                      borderRadius: 9999,
                      padding: "3px 10px",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}>
                    {plan.savings}
                  </div>
                )}

                {/* Plan name */}
                <div
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: tokens.goldMid,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}>
                  {plan.name}
                </div>

                {/* Price */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 4,
                    marginBottom: 4,
                  }}>
                  <span
                    style={{
                      fontSize: "0.85rem",
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

                {/* Monthly breakdown */}
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: tokens.textMuted,
                    marginBottom: 18,
                  }}>
                  Effective:{" "}
                  <span style={{ color: tokens.textPrimary, fontWeight: 600 }}>
                    {plan.perMonth}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: tokens.textMuted,
                    lineHeight: 1.6,
                    marginBottom: 24,
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
                        alignItems: "flex-start",
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
                          marginTop: 2,
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
                          lineHeight: 1.4,
                        }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={plan.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...(isPopular ? s.goldBtn : s.outlineBtn),
                    width: "100%",
                    textAlign: "center",
                    padding: "14px 0",
                    background: isPopular ? tokens.goldMid : "transparent",
                    textDecoration: "none",
                    boxSizing: "border-box",
                    display: "block",
                  }}>
                  {isPopular ? "Join 6-Month Plan" : `Join ${plan.duration}`}
                </a>
              </div>
            );
          })}
        </div>

        <p
          style={{
            textAlign: "center",
            color: tokens.textMuted,
            fontSize: "0.82rem",
            marginTop: 32,
            maxWidth: 620,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}>
          All plans include free body assessment, customized diet plan, and
          certified trainer guidance.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// 4. REVIEWS SECTION — Vertical Ghost Drift
// ═══════════════════════════════════════════════════════════
interface VerifiedReview {
  name: string;
  initials: string;
  branch: string;
  stars: number;
  quote: string;
}

const VERIFIED_REVIEWS: VerifiedReview[] = [
  {
    name: "M J U Patwary",
    initials: "MP",
    branch: "Mirpur Outlet (Lift 11)",
    stars: 5,
    quote:
      "After Gold's Gym, Rayhan Fitness is the finest gym in BD. The equipment quality at Mirpur Lift-11 is unmatched!",
  },
  {
    name: "Newaaz Andy",
    initials: "NA",
    branch: "Dhanmondi Outlet",
    stars: 5,
    quote:
      "Super impressed with the Dhanmondi Branch. Respectful environment, top tier trainers, and enough space between sets.",
  },
  {
    name: "Abhi Zit",
    initials: "AZ",
    branch: "Lalbagh Flagship",
    stars: 5,
    quote:
      "5 years of my fitness journey, I've never trained anywhere else. Rayhan Fitness is like family.",
  },
  {
    name: "M J U Patwary",
    initials: "MP",
    branch: "Mirpur Outlet (Lift 11)",
    stars: 5,
    quote:
      "The equipment quality at Mirpur Lift-11 is unmatched across Dhaka. Great vibe and professional staff.",
  },
  {
    name: "Newaaz Andy",
    initials: "NA",
    branch: "Dhanmondi Outlet",
    stars: 5,
    quote:
      "Respectful environment, top tier trainers, and modern biomechanics gear. Highly recommended.",
  },
  {
    name: "Abhi Zit",
    initials: "AZ",
    branch: "Lalbagh Flagship",
    stars: 5,
    quote:
      "The championship coach lineup and community in Lalbagh push you to be your absolute best.",
  },
];

function ReviewStars({ n }: { n: number }) {
  return (
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
}

function ReviewCard({ r }: { r: VerifiedReview }) {
  return (
    <div
      style={{
        background: tokens.bgSurface,
        border: `1px solid ${tokens.borderSubtle}`,
        borderRadius: 16,
        padding: "24px 22px",
      }}>
      <ReviewStars n={r.stars} />
      <p
        style={{
          fontSize: "0.85rem",
          color: tokens.textPrimary,
          lineHeight: 1.6,
          fontStyle: "italic",
          margin: "0 0 16px",
        }}>
        &ldquo;{r.quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `${tokens.goldMid}20`,
            border: `1.5px solid ${tokens.goldMid}`,
            color: tokens.goldLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.78rem",
            letterSpacing: "0.05em",
            flexShrink: 0,
          }}>
          {r.initials}
        </div>
        <div>
          <div
            style={{
              fontWeight: 700,
              color: tokens.textPrimary,
              fontSize: "0.82rem",
            }}>
            {r.name}
          </div>
          <div
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: tokens.goldMid,
              marginTop: 2,
            }}>
            {r.branch}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewColumn({
  items,
  direction,
  duration,
  paused,
  isMobile,
}: {
  items: VerifiedReview[];
  direction: "up" | "down";
  duration: number;
  paused: boolean;
  isMobile: boolean;
}) {
  return (
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
          <ReviewCard r={r} key={i} />
        ))}
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const [ref, inView] = useInView("-40px");
  const [paused, setPaused] = useState(false);
  const { isMobile } = useResponsive();

  const col1 = [VERIFIED_REVIEWS[0], VERIFIED_REVIEWS[3]];
  const col2 = [VERIFIED_REVIEWS[1], VERIFIED_REVIEWS[4]];
  const col3 = [VERIFIED_REVIEWS[2], VERIFIED_REVIEWS[5]];

  return (
    <section
      id="review"
      style={{
        ...s.section,
        padding: isMobile ? "64px 0" : "96px 0",
        overflow: "hidden",
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
          padding: `0 ${isMobile ? 20 : 32}px`,
        }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
          <span style={s.label}>Real Member Experiences</span>
          <h2 style={s.heading}>
            Results
            <br />
            <span style={{ color: tokens.goldLight }}>Speak First</span>
          </h2>
          <p style={{ ...s.sub, maxWidth: 460, margin: "16px auto 0" }}>
            Verified reviews from our Lalbagh, Dhanmondi, and Mirpur
            communities.
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
          <ReviewColumn
            items={col1}
            direction="up"
            duration={22}
            paused={paused}
            isMobile={isMobile}
          />
          <ReviewColumn
            items={col2}
            direction="down"
            duration={26}
            paused={paused}
            isMobile={isMobile}
          />
          {!isMobile && (
            <ReviewColumn
              items={col3}
              direction="up"
              duration={30}
              paused={paused}
              isMobile={isMobile}
            />
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// FAQ SECTION (Accordion)
// ═══════════════════════════════════════════════════════════
export function FAQSection() {
  const [ref, inView] = useInView("-60px");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { isMobile } = useResponsive();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      style={{
        ...s.section,
        background: tokens.bgWarm,
        padding: isMobile ? "64px 0" : "96px 0",
        borderTop: `1px solid ${tokens.borderSubtle}`,
      }}>
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: `0 ${isMobile ? 20 : 32}px`,
        }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
          <span style={s.label}>Frequently Asked Questions</span>
          <h2 style={s.heading}>
            Got Questions?
            <br />
            <span style={{ color: tokens.goldLight }}>We Have Answers</span>
          </h2>
          <p style={{ ...s.sub, margin: "16px auto 0" }}>
            Everything you need to know about memberships, female hours, and
            facilities across our Dhaka outlets.
          </p>
        </div>

        <div
          ref={ref}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: isOpen ? tokens.bgSurface : tokens.bgBase,
                  border: `1px solid ${isOpen ? tokens.goldMid : tokens.borderSubtle}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}>
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    padding: isMobile ? "18px 20px" : "22px 28px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: isOpen ? tokens.goldLight : tokens.textPrimary,
                    fontSize: isMobile ? "0.95rem" : "1.05rem",
                    fontWeight: 600,
                  }}>
                  <span>{item.q}</span>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: isOpen
                        ? `${tokens.goldMid}25`
                        : tokens.bgOverlay,
                      color: isOpen ? tokens.goldLight : tokens.textMuted,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      flexShrink: 0,
                      transition: "transform 0.3s ease",
                      transform: isOpen ? "rotate(45deg)" : "none",
                    }}>
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 220 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}>
                  <p
                    style={{
                      padding: isMobile
                        ? "0 20px 20px 20px"
                        : "0 28px 24px 28px",
                      margin: 0,
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      color: tokens.textMuted,
                    }}>
                    {item.a}
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

// ═══════════════════════════════════════════════════════════
// 5. CONTACT SECTION
// ═══════════════════════════════════════════════════════════
export function ContactSection() {
  const [ref, inView] = useInView("-40px");
  const { isMobile, isTablet } = useResponsive();
  const isStacked = isMobile || isTablet;
  const { selectedBranch } = useBranch();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    userBranch: "",
    goal: "Free Gym Tour & Fitness Assessment",
  });
  const [sent, setSent] = useState(false);

  const currentBranch = form.userBranch || selectedBranch || "lalbagh";

  useEffect(() => {
    const handlePresetIntent = (e: Event) => {
      const customEvent = e as CustomEvent<{ goal?: string; branch?: string }>;
      if (customEvent.detail) {
        setForm((prev) => ({
          ...prev,
          goal: customEvent.detail.goal || prev.goal,
          userBranch: customEvent.detail.branch || prev.userBranch,
        }));
      }
    };
    window.addEventListener("set_contact_intent", handlePresetIntent);
    return () =>
      window.removeEventListener("set_contact_intent", handlePresetIntent);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "branch") {
      setForm((prev) => ({ ...prev, userBranch: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

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

  const labelStyle: React.CSSProperties = {
    fontSize: "0.7rem",
    color: tokens.textMuted,
    display: "block",
    marginBottom: 6,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 600,
  };

  const contactInfo = [
    {
      icon: "📞",
      label: "Central Hotline",
      value: PHONE_NUMBER,
      link: PHONE_TEL,
    },
    {
      icon: "📍",
      label: "Lalbagh Branch (Flagship)",
      value: "21/C, Nur Fatah Lane, 2nd Floor, Lalbagh, Dhaka",
    },
    {
      icon: "📍",
      label: "Dhanmondi Branch",
      value: "24/3 Taj Mahal Road, Dhanmondi, Dhaka",
    },
    {
      icon: "📍",
      label: "Mirpur Branch",
      value: "Mirpur Shopping Center Complex, Lift 11, Mirpur-2, Dhaka",
    },
  ];

  const facebookLinks = [
    { label: "Lalbagh FB", url: "https://facebook.com/rayhanfitnessgym" },
    {
      label: "Dhanmondi FB",
      url: "https://facebook.com/profile.php?id=61551898169968",
    },
    {
      label: "Mirpur FB",
      url: "https://facebook.com/RayhanFitnessMirpur",
    },
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
          {/* Left info column */}
          <div>
            <span style={s.label}>Book Free Gym Tour</span>
            <h2
              style={{
                ...s.heading,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                marginBottom: 20,
              }}>
              Start Your
              <br />
              <span style={{ color: tokens.goldLight }}>Transformation</span>
            </h2>
            <p style={{ ...s.sub, marginBottom: 40, maxWidth: 480 }}>
              Speak with our certified coaching staff, tour your nearest outlet,
              and experience why 65,000+ athletes choose Rayhan Fitness.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {contactInfo.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                  }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: `${tokens.goldMid}18`,
                      border: `1px solid ${tokens.borderSubtle}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      flexShrink: 0,
                      marginTop: 2,
                    }}>
                    {c.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: tokens.goldMid,
                        fontWeight: 600,
                        marginBottom: 3,
                      }}>
                      {c.label}
                    </div>
                    {c.link ? (
                      <a
                        href={c.link}
                        style={{
                          fontSize: "0.95rem",
                          color: tokens.textPrimary,
                          fontWeight: 600,
                          textDecoration: "none",
                        }}>
                        {c.value}
                      </a>
                    ) : (
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: tokens.textMuted,
                          lineHeight: 1.4,
                        }}>
                        {c.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social channels */}
            <div
              style={{
                marginTop: 40,
                paddingTop: 28,
                borderTop: `1px solid ${tokens.borderSubtle}`,
              }}>
              <div
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: tokens.textMuted,
                  marginBottom: 14,
                  fontWeight: 600,
                }}>
                Official Facebook Pages
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {facebookLinks.map((fb, i) => (
                  <a
                    key={i}
                    href={fb.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "8px 14px",
                      background: tokens.bgSurface,
                      border: `1px solid ${tokens.borderSubtle}`,
                      borderRadius: 8,
                      fontSize: "0.75rem",
                      color: tokens.textPrimary,
                      textDecoration: "none",
                      letterSpacing: "0.05em",
                      fontWeight: 500,
                      transition: "border-color 0.2s",
                    }}>
                    {fb.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form card */}
          <div
            style={{
              background: tokens.bgSurface,
              border: `1px solid ${tokens.borderSubtle}`,
              borderRadius: 24,
              padding: isMobile ? 28 : 44,
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
                    color: tokens.goldLight,
                    border: `1.5px solid ${tokens.goldMid}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    fontSize: "1.8rem",
                    fontWeight: 700,
                  }}>
                  ✓
                </div>
                <h3
                  style={{
                    color: tokens.goldLight,
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    marginBottom: 10,
                  }}>
                  Tour &amp; Assessment Request Received!
                </h3>
                <p
                  style={{
                    color: tokens.textMuted,
                    fontSize: "0.9rem",
                    maxWidth: 320,
                    lineHeight: 1.6,
                  }}>
                  Thank you, {form.name || "friend"}! A coach from our{" "}
                  {currentBranch} outlet will call you shortly at {form.phone}{" "}
                  to confirm your free gym tour and fitness assessment slot.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <div
                    style={{
                      fontSize: "0.62rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: tokens.goldMid,
                      fontWeight: 700,
                      marginBottom: 6,
                    }}>
                    Fast Response
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: tokens.textPrimary,
                      margin: 0,
                    }}>
                    Book Free Gym Tour
                  </h3>
                </div>

                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Phone Number (WhatsApp Preferred)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="017XXXXXXXX"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Preferred Outlet Branch</label>
                  <select
                    name="branch"
                    value={currentBranch}
                    onChange={handleChange}
                    required
                    style={{
                      ...inputStyle,
                      appearance: "none",
                      cursor: "pointer",
                    }}>
                    <option value="lalbagh">Lalbagh Branch (Flagship)</option>
                    <option value="dhanmondi">Dhanmondi Branch</option>
                    <option value="mirpur">Mirpur Branch (Lift 11)</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>
                    Primary Fitness Goal / Intent
                  </label>
                  <select
                    name="goal"
                    value={form.goal}
                    onChange={handleChange}
                    required
                    style={{
                      ...inputStyle,
                      appearance: "none",
                      cursor: "pointer",
                    }}>
                    <option value="Free Gym Tour & Fitness Assessment">
                      Free Gym Tour &amp; Fitness Assessment
                    </option>
                    <option value="Weight Loss">
                      Weight Loss &amp; Fat Reduction
                    </option>
                    <option value="Muscle Gain">
                      Muscle Gain &amp; Hypertrophy
                    </option>
                    <option value="General Fitness">
                      General Fitness &amp; Strength
                    </option>
                    <option value="Female Fitness">
                      Female Exclusive Training
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  style={{
                    ...s.goldBtn,
                    textAlign: "center",
                    padding: "16px",
                    marginTop: 6,
                    cursor: "pointer",
                    boxShadow: `0 8px 24px ${tokens.goldMid}25`,
                  }}>
                  Book Free Gym Tour →
                </button>

                <div style={{ marginTop: 8, textAlign: "center" }}>
                  <a
                    href={getGymTourWhatsAppUrl(currentBranch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.8rem",
                      color: tokens.goldLight,
                      textDecoration: "none",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}>
                    <span>💬</span> Prefer instant WhatsApp booking? Chat now →
                  </a>
                </div>
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
    Outlets: [
      { label: "Lalbagh Flagship", href: "#outlets" },
      { label: "Dhanmondi Branch", href: "#outlets" },
      { label: "Mirpur Branch (Lift 11)", href: "#outlets" },
    ],
    Programs: [
      { label: "Strength & Conditioning", href: "#packages" },
      { label: "Female Fitness Program", href: "#female-fitness" },
      { label: "Personal Training", href: "#packages" },
      { label: "Diet & Workout Charts", href: "#faq" },
    ],
    Company: [
      { label: "About Rayhan Fitness", href: "#about" },
      { label: "Pricing & Plans", href: "#packages" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact Hotline", href: "#contact" },
    ],
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
        padding: isMobile ? "64px 0 96px" : "96px 0",
        borderTop: `1px solid ${tokens.borderSubtle}`,
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
              alt="Rayhan Fitness"
              width={110}
              height={36}
              className="object-contain justify-self-start w-[100px] h-auto"
              priority
            />
            <p
              style={{
                fontSize: "0.85rem",
                color: tokens.textMuted,
                lineHeight: 1.7,
                maxWidth: 280,
                marginTop: 16,
                marginBottom: 20,
              }}>
              Home to national bodybuilding champions. 3 premier outlets across
              Dhaka with international equipment and dedicated female hours.
            </p>
            <div
              style={{
                fontSize: "0.8rem",
                color: tokens.textMuted,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}>
              <div>
                Hotline:{" "}
                <a
                  href={PHONE_TEL}
                  style={{
                    color: tokens.goldLight,
                    textDecoration: "none",
                    fontWeight: 600,
                  }}>
                  {PHONE_NUMBER}
                </a>
              </div>
              <div>
                Email:{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  style={{ color: tokens.goldLight, textDecoration: "none" }}>
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <div
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: tokens.goldMid,
                  fontWeight: 700,
                  marginBottom: 18,
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
                  <li key={item.label}>
                    <a
                      href={item.href}
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
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(to right, transparent, ${tokens.borderSubtle}, transparent)`,
            marginBottom: 28,
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: isMobile ? 12 : 0,
            textAlign: isMobile ? "center" : "left",
          }}>
          <span style={{ fontSize: "0.75rem", color: tokens.textMuted }}>
            © 2025 Rayhan Fitness. All rights reserved.
          </span>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span>Developed By</span>
            <a
              href="https://stellarworm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center">
              <img
                src="/stellarLogo.png"
                alt="Stellar Logo"
                className="w-24 h-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
