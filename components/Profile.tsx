"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

/* ──────────────────────────────────────────────────────────────────────────
   Stacking-panel profile page.

   Each <section> is `position: sticky; top: 0` with a fixed 100vh height
   and an increasing z-index. As the user scrolls, the panel underneath
   stays pinned at the top while the next panel rises up from below and
   covers it — giving the "current page replaced by an emerging bottom
   page" effect.
   ────────────────────────────────────────────────────────────────────────── */

const services = [
  { title: "Naturstein",     image: "/images/proj-01.jpg" },
  { title: "Fliesenarbeiten", image: "/images/proj-03.jpg" },
  { title: "Sonderaufträge", image: "/images/proj-05.jpg" },
  { title: "Badsanierung",   image: "/images/proj-09.jpg" },
];

const clients = [
  "Müller Architekten",
  "Steinwerk GmbH",
  "Weber Bau",
  "Hoffmann Design",
  "Becker Projekte",
  "Schmidt & Partner",
  "Braun Interiors",
  "Keller Hausbau",
  "Richter Architektur",
];

const testimonial = {
  name: "Thomas Richter",
  role: "Geschäftsführer",
  company: "Richter Architektur",
  quote:
    "Die Zusammenarbeit mit Seehafer Elemente war außergewöhnlich. Akribische Arbeit, professionelles Auftreten und höchste Pünktlichkeit — alle Merkmale eines erstklassigen Handwerkers.",
  project: "Mühlenberg Bad",
};

/* Shared shell for each sticky panel */
function Panel({
  children,
  zIndex,
  background,
  color,
}: {
  children: React.ReactNode;
  zIndex: number;
  background: string;
  color: string;
}) {
  return (
    <section
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        zIndex,
        overflow: "hidden",
        background,
        color,
      }}
    >
      {children}
    </section>
  );
}

/* Full-bleed image background panel — used for the two hero panels */
function ImagePanel({
  src,
  alt,
  children,
  zIndex,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  zIndex: number;
}) {
  return (
    <Panel zIndex={zIndex} background="#0c0b07" color="#fff">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(12,11,7,0.55) 0%, rgba(12,11,7,0.18) 45%, transparent 100%)",
        }}
      />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {children}
      </div>
    </Panel>
  );
}

export default function Profile() {
  return (
    <div style={{ position: "relative" }}>
      {/* ─── Panel 1 — Handwerkliche Methoden ────────────────────────── */}
      <ImagePanel
        src="/images/profile-hero.jpg"
        alt="Seehafer Elemente Handwerk"
        zIndex={1}
      >
        <PanelHeading
          eyebrow="01 / Profil"
          title={<>Handwerkliche<br />Methoden.</>}
          align="left"
          color="#fff"
        />
      </ImagePanel>

      {/* ─── Panel 2 — Moderne Ausführung ─────────────────────────────── */}
      <ImagePanel
        src="/images/proj-06.jpg"
        alt="Moderne Architektur"
        zIndex={2}
      >
        <PanelHeading
          eyebrow="02 / Anspruch"
          title={<>Moderne<br />Ausführung.</>}
          align="right"
          color="#fff"
        />
      </ImagePanel>

      {/* ─── Panel 3 — Überblick / story ──────────────────────────────── */}
      <Panel zIndex={3} background="#35311f" color="#9b926a">
        <div style={containerStyle}>
          <Reveal>
            <Eyebrow text="03 / Überblick" color="rgba(155,146,106,0.75)" />
          </Reveal>
          <Reveal delay={120}>
            <p
              style={{
                fontSize: "clamp(28px, 3.4vw, 46px)",
                fontWeight: 300,
                lineHeight: 1.32,
                letterSpacing: "-0.018em",
                maxWidth: 980,
                color: "#9b926a",
              }}
            >
              ––– Ursprünglich aus der Tradition des deutschen Handwerks
              kommend, hat Gründer Sebastian Seehafer sein Können an
              anspruchsvollen Projekten perfektioniert. Mit über einem Jahrzehnt
              Erfahrung und der Gründung von Seehafer Elemente sind wir zu
              einer der führenden Adressen für Naturstein und Fliesenarbeiten
              geworden.
            </p>
          </Reveal>
        </div>
      </Panel>

      {/* ─── Panel 4 — Akribische Umsetzung / services ────────────────── */}
      <Panel zIndex={4} background="#35311f" color="#9b926a">
        <div style={containerStyle}>
          <Reveal>
            <Eyebrow text="04 / Leistungen" color="rgba(255,255,255,0.5)" />
          </Reveal>
          <Reveal delay={120}>
            <h2
              style={{
                fontSize: "clamp(48px, 7vw, 112px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                marginBottom: "clamp(40px, 5vw, 64px)",
                color: "#fff",
              }}
            >
              Akribische<br />Umsetzung.
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "clamp(14px, 1.6vw, 22px)",
            }}
          >
            {services.map((s, i) => (
              <Reveal key={s.title} delay={180 + i * 80}>
                <ServiceTile title={s.title} image={s.image} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>

      {/* ─── Panel 5 — Clients ────────────────────────────────────────── */}
      <Panel zIndex={5} background="#f3efeb" color="#35311f">
        <div style={containerStyle}>
          <Reveal>
            <Eyebrow text="05 / Vertrauen" color="rgba(53,49,31,0.55)" />
          </Reveal>
          <Reveal delay={120}>
            <h2
              style={{
                fontSize: "clamp(40px, 5.6vw, 88px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                marginBottom: "clamp(40px, 5vw, 60px)",
                color: "#35311f",
              }}
            >
              Vertraut von den besten<br />Architekten &amp; Bauherren.
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              border: "1px solid rgba(53,49,31,0.12)",
            }}
          >
            {clients.map((client) => (
              <div
                key={client}
                style={{
                  background: "#f3efeb",
                  aspectRatio: "5/2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 24px",
                  outline: "1px solid rgba(53,49,31,0.12)",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(15px, 1.4vw, 20px)",
                    fontWeight: 400,
                    color: "#35311f",
                    letterSpacing: "-0.005em",
                    textAlign: "center",
                  }}
                >
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* ─── Panel 6 — Referenzen / testimonial ───────────────────────── */}
      <Panel zIndex={6} background="#f3efeb" color="#35311f">
        <div style={containerStyle}>
          <Reveal>
            <Eyebrow text="06 / Referenzen" color="rgba(53,49,31,0.55)" />
          </Reveal>
          <Reveal delay={120}>
            <blockquote
              style={{
                fontSize: "clamp(28px, 3.4vw, 46px)",
                fontWeight: 300,
                letterSpacing: "-0.022em",
                lineHeight: 1.32,
                color: "rgba(53,49,31,0.78)",
                marginBottom: 36,
                maxWidth: 1000,
              }}
            >
              ––– {testimonial.quote}
            </blockquote>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#35311f",
                  letterSpacing: "-0.005em",
                }}
              >
                {testimonial.name}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(53,49,31,0.5)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {testimonial.role} · {testimonial.company}
              </span>
            </div>
          </Reveal>
        </div>
      </Panel>

      {/* ─── Panel 7 — Featured project ───────────────────────────────── */}
      <Panel zIndex={7} background="#19170e" color="#fff">
        <div
          style={{
            ...containerStyle,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Reveal>
            <Eyebrow text="07 / Ausgewählt" color="rgba(255,255,255,0.5)" />
          </Reveal>
          <Reveal delay={120}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(14px, 2.2vw, 28px)",
                flexWrap: "wrap",
                marginBottom: 40,
              }}
            >
              <span
                style={{
                  fontSize: "clamp(56px, 8vw, 128px)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  lineHeight: 0.98,
                }}
              >
                Mühlenberg
              </span>
              <div
                style={{
                  width: "clamp(72px, 8vw, 130px)",
                  height: "clamp(72px, 8vw, 130px)",
                  overflow: "hidden",
                  borderRadius: 6,
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/proj-01.jpg"
                  alt="Mühlenberg Bad"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "clamp(56px, 8vw, 128px)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  lineHeight: 0.98,
                }}
              >
                Bad.
              </span>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <Link
              href="/projekte/muehlenberg-bad"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fff",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(18px) saturate(1.6)",
                WebkitBackdropFilter: "blur(18px) saturate(1.6)",
                padding: "14px 24px",
                borderRadius: 999,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.2), 0 12px 28px rgba(12,11,7,0.28)",
                transition: "background 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.14)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.22)";
              }}
            >
              Zum Projekt
              <svg width="14" height="12" viewBox="0 0 16 14" fill="none">
                <path
                  d="M1 7h13M8 1l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>
        </div>
      </Panel>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────────────────────────────────── */
const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  maxWidth: 1400,
  margin: "0 auto",
  padding: "clamp(96px, 12vw, 160px) clamp(28px, 5vw, 72px) clamp(48px, 6vw, 96px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

function Eyebrow({ text, color }: { text: string; color: string }) {
  const [num, ...rest] = text.split(" / ");
  const label = rest.join(" / ");
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color,
        marginBottom: 22,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span>{num}</span>
      <span
        aria-hidden
        style={{ width: 22, height: 1, background: color, opacity: 0.6 }}
      />
      <span>{label}</span>
    </div>
  );
}

function PanelHeading({
  eyebrow,
  title,
  align,
  color,
}: {
  eyebrow: string;
  title: React.ReactNode;
  align: "left" | "right";
  color: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: align === "left" ? "clamp(28px, 5vw, 72px)" : "auto",
        right: align === "right" ? "clamp(28px, 5vw, 72px)" : "auto",
        bottom: "clamp(72px, 10vw, 128px)",
        textAlign: align,
        color,
      }}
    >
      <Reveal delay={100}>
        <Eyebrow text={eyebrow} color="rgba(255,255,255,0.78)" />
      </Reveal>
      <Reveal delay={220} y={40}>
        <h1
          style={{
            fontSize: "clamp(56px, 8vw, 128px)",
            fontWeight: 300,
            letterSpacing: "-0.035em",
            lineHeight: 0.96,
            color,
            margin: 0,
          }}
        >
          {title}
        </h1>
      </Reveal>
    </div>
  );
}

function ServiceTile({
  title,
  image,
  index,
}: {
  title: string;
  image: string;
  index: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "3/4",
        overflow: "hidden",
        borderRadius: 6,
        background: "#19170e",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.7s cubic-bezier(0.85, 0.09, 0.15, 0.91)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 40%, rgba(12,11,7,0.78) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 14,
          top: 14,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.85)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span>{String(index).padStart(2, "0")}</span>
        <span
          aria-hidden
          style={{ width: 14, height: 1, background: "rgba(255,255,255,0.6)" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 18,
          color: "#fff",
          fontSize: "clamp(18px, 1.7vw, 24px)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          whiteSpace: "pre-line",
        }}
      >
        {title}
      </div>
    </div>
  );
}
