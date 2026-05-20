"use client";

import { useState, useEffect, useMemo } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   Design tokens — match the rest of the site
   ────────────────────────────────────────────────────────────────────────── */
const EASE = "cubic-bezier(0.85, 0.09, 0.15, 0.91)";
const POP = "cubic-bezier(0.16, 1, 0.3, 1)";
const TAN = "#9b926a";
const CREAM = "#ebe8e2";
const BROWN = "#35311f";

/* ──────────────────────────────────────────────────────────────────────────
   Funnel data
   ────────────────────────────────────────────────────────────────────────── */
type ProjectKind = { id: string; label: string; image: string };
type Pill = { id: string; label: string; hint?: string };

const PROJECT_KINDS: ProjectKind[] = [
  { id: "bad",       label: "Badezimmer",   image: "/images/proj-01.jpg" },
  { id: "kueche",    label: "Küche",        image: "/images/proj-05.jpg" },
  { id: "terrasse",  label: "Terrasse",     image: "/images/proj-02.jpg" },
  { id: "stein",     label: "Naturstein",   image: "/images/proj-07.jpg" },
];

const TIMELINES: Pill[] = [
  { id: "now",   label: "Diesen Monat",  hint: "Sofortiger Start" },
  { id: "3m",    label: "In 3 Monaten",  hint: "Bald planen"      },
  { id: "6m",    label: "In 6 Monaten",  hint: "Mit Vorlauf"      },
  { id: "later", label: "Später",        hint: "Erstmal informieren" },
];

const BUDGETS: Pill[] = [
  { id: "s",  label: "Bis 10.000 €" },
  { id: "m",  label: "10 – 25.000 €" },
  { id: "l",  label: "25 – 50.000 €" },
  { id: "xl", label: "Über 50.000 €" },
];

const TOTAL_STEPS = 5; // 0..4 — last is the thank-you screen

/* ──────────────────────────────────────────────────────────────────────────
   Char-reveal heading (matches Hero's SplitText vibe)
   ────────────────────────────────────────────────────────────────────────── */
function SplitHeading({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.1 }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            animation: `cfReveal 0.9s ${EASE} both`,
            animationDelay: `${baseDelay + i * 0.025}s`,
            whiteSpace: "pre",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────────────────────────────────── */
export default function ContactFunnel() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // controls modal animation
  const [ctaVisible, setCtaVisible] = useState(false);
  const [step, setStep] = useState(0);
  // Per-step heading reveal keys — incremented on entry so headlines replay
  const [revealKeys, setRevealKeys] = useState<number[]>(() => Array(TOTAL_STEPS).fill(0));

  const [project, setProject] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  /* Show CTA after the hero intro completes (~2.2s) */
  useEffect(() => {
    const t = setTimeout(() => setCtaVisible(true), 2400);
    return () => clearTimeout(t);
  }, []);

  const bumpRevealKey = (target: number) => {
    setRevealKeys((keys) => {
      const next = [...keys];
      next[target] += 1;
      return next;
    });
  };

  const handleOpen = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
    // Allow one paint with hidden state, then animate to visible
    requestAnimationFrame(() => setMounted(true));
    // Replay the first step's heading on each open
    bumpRevealKey(0);
  };

  const handleClose = () => {
    setMounted(false);
    setTimeout(() => {
      setOpen(false);
      document.body.style.overflow = "";
      setStep(0);
      setProject(null);
      setTimeline(null);
      setBudget(null);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 700);
  };

  /* Esc closes */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const goNext = () => {
    const ns = Math.min(TOTAL_STEPS - 1, step + 1);
    if (ns === step) return;
    setStep(ns);
    bumpRevealKey(ns);
  };
  const goBack = () => {
    const ns = Math.max(0, step - 1);
    if (ns === step) return;
    setStep(ns);
    bumpRevealKey(ns);
  };

  /* Auto-advance on selection for the choice steps */
  const choose = (
    setter: (v: string) => void,
    value: string,
    advanceFrom: number
  ) => {
    setter(value);
    if (step === advanceFrom) {
      setTimeout(() => goNext(), 420);
    }
  };

  const canSubmit = name.trim().length > 1 && /.+@.+\..+/.test(email);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!canSubmit) return;
    // Simulated submit — no backend wired up
    goNext();
  };

  /* ────────────────────────────────────────────────────────────────────────
     Render
     ──────────────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* keyframes used throughout */}
      <style>{`
        @keyframes cfReveal {
          from { opacity: 0; transform: translate3d(0, 110%, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes cfPing {
          0%   { transform: scale(0.6); opacity: 0.9; }
          80%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes cfFloat {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50%      { transform: translateY(-4px) translateX(-50%); }
        }
        @keyframes cfBackdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cfRiseIn {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes cfCheck {
          0%   { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes cfRing {
          0%   { transform: scale(0.6); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* ─── Floating CTA on the hero ─── */}
      <button
        type="button"
        onClick={handleOpen}
        data-no-transition
        aria-label="Projekt anfragen"
        style={{
          position: "fixed",
          bottom: 36,
          left: "50%",
          transform: `translateX(-50%) translateY(${ctaVisible ? 0 : 24}px)`,
          opacity: ctaVisible ? 1 : 0,
          zIndex: 50,
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 22px 14px 26px",
          border: "none",
          background: BROWN,
          color: "#fff",
          borderRadius: 999,
          fontFamily: "inherit",
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow: "0 14px 34px rgba(25,23,14,0.22), 0 2px 6px rgba(25,23,14,0.16)",
          transition: `opacity 0.9s ${EASE}, transform 0.9s ${EASE}, background 0.3s ease, box-shadow 0.3s ease`,
          willChange: "transform, opacity",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#2c2a1a";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 18px 40px rgba(25,23,14,0.28), 0 3px 8px rgba(25,23,14,0.2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = BROWN;
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 14px 34px rgba(25,23,14,0.22), 0 2px 6px rgba(25,23,14,0.16)";
        }}
      >
        {/* Pulsing tan dot — the attention-grabber */}
        <span
          aria-hidden
          style={{
            position: "relative",
            width: 8,
            height: 8,
            display: "inline-block",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: TAN,
              animation: "cfPing 2.2s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: TAN,
            }}
          />
        </span>
        Projekt anfragen
        <svg width="14" height="12" viewBox="0 0 16 14" fill="none" aria-hidden>
          <path
            d="M1 7h13M8 1l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ─── Modal ─── */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Projekt anfragen"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            pointerEvents: "auto",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={handleClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(25, 23, 14, 0.78)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              opacity: mounted ? 1 : 0,
              transition: `opacity 0.6s ${EASE}`,
            }}
          />

          {/* Panel */}
          <div
            style={{
              position: "relative",
              width: "min(100%, 1100px)",
              margin: "auto",
              maxHeight: "min(92vh, 760px)",
              height: "min(92vh, 760px)",
              borderRadius: 24,
              background: CREAM,
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(25,23,14,0.5)",
              transform: mounted ? "translateY(0)" : "translateY(60px)",
              opacity: mounted ? 1 : 0,
              transition: `transform 0.8s ${EASE}, opacity 0.5s ${EASE}`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Tile grid background — subtle, matches Hero */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "url(/tile-bg.svg)",
                opacity: 0.5,
                pointerEvents: "none",
              }}
            />

            {/* Header: progress + close */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "22px 28px 0",
              }}
            >
              {/* Step counter */}
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(53,49,31,0.5)",
                  whiteSpace: "nowrap",
                }}
              >
                {step < TOTAL_STEPS - 1
                  ? `Schritt ${step + 1} / ${TOTAL_STEPS - 1}`
                  : "Geschafft"}
              </div>

              {/* Progress bar */}
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: "rgba(53,49,31,0.12)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
                    background: TAN,
                    borderRadius: 2,
                    transition: `width 0.7s ${EASE}`,
                  }}
                />
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Schließen"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  border: "1px solid rgba(53,49,31,0.18)",
                  background: "transparent",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: BROWN,
                  transition: "background 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(53,49,31,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Sliding track */}
            <div
              style={{
                position: "relative",
                flex: 1,
                overflow: "hidden",
              }}
            >
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                const offset = i - step;
                const isActive = i === step;
                return (
                  <div
                    key={i}
                    aria-hidden={!isActive}
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform: `translateX(${offset * 100}%)`,
                      transition: `transform 0.75s ${EASE}, opacity 0.6s ${EASE}`,
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                      overflowY: "auto",
                    }}
                  >
                    {i === 0 && (
                      <StepProject
                        revealKey={revealKeys[0]}
                        selected={project}
                        onSelect={(id) => choose(setProject, id, 0)}
                      />
                    )}
                    {i === 1 && (
                      <StepPills
                        revealKey={revealKeys[1]}
                        eyebrow="02 · Zeitrahmen"
                        title="Wann soll es losgehen?"
                        subtitle="Damit wir Werkstatt und Kalender abstimmen."
                        options={TIMELINES}
                        selected={timeline}
                        onSelect={(id) => choose(setTimeline, id, 1)}
                      />
                    )}
                    {i === 2 && (
                      <StepPills
                        revealKey={revealKeys[2]}
                        eyebrow="03 · Budgetrahmen"
                        title="In welchem Rahmen?"
                        subtitle="Eine grobe Spanne genügt — alles vertraulich."
                        options={BUDGETS}
                        selected={budget}
                        onSelect={(id) => choose(setBudget, id, 2)}
                      />
                    )}
                    {i === 3 && (
                      <StepContact
                        revealKey={revealKeys[3]}
                        name={name}
                        email={email}
                        phone={phone}
                        message={message}
                        onName={setName}
                        onEmail={setEmail}
                        onPhone={setPhone}
                        onMessage={setMessage}
                        onSubmit={handleSubmit}
                      />
                    )}
                    {i === 4 && (
                      <StepThanks
                        revealKey={revealKeys[4]}
                        name={name}
                        onClose={handleClose}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer nav — only on input steps */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 28px 24px",
                borderTop: "1px solid rgba(53,49,31,0.08)",
                background: "rgba(235,232,226,0.6)",
              }}
            >
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0 || step === TOTAL_STEPS - 1}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  border: "none",
                  background: "transparent",
                  color: BROWN,
                  fontFamily: "inherit",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: step === 0 || step === TOTAL_STEPS - 1 ? 0.25 : 0.7,
                  pointerEvents:
                    step === 0 || step === TOTAL_STEPS - 1 ? "none" : "auto",
                  transition: "opacity 0.25s ease, transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateX(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.7";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateX(0)";
                }}
              >
                <svg width="14" height="12" viewBox="0 0 16 14" fill="none">
                  <path
                    d="M15 7H2M8 1L2 7l6 6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Zurück
              </button>

              {/* Right side: skip on first three steps, submit on step 3 */}
              {step <= 2 && (
                <button
                  type="button"
                  onClick={goNext}
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    background: "transparent",
                    color: "rgba(53,49,31,0.5)",
                    fontFamily: "inherit",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = BROWN)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(53,49,31,0.5)")
                  }
                >
                  Überspringen
                </button>
              )}
              {step === 3 && (
                <SubmitButton
                  disabled={!canSubmit}
                  onClick={() => handleSubmit()}
                />
              )}
              {step === TOTAL_STEPS - 1 && <span />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Step 1 — Project kind (image cards)
   ────────────────────────────────────────────────────────────────────────── */
function StepProject({
  revealKey,
  selected,
  onSelect,
}: {
  revealKey: number;
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div style={{ padding: "40px 44px 32px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Eyebrow text="01 · Ihr Vorhaben" />
      <Headline key={revealKey} text="Was haben Sie vor?" />
      <Subtitle text="Wählen Sie die Kategorie, die Ihrem Projekt am nächsten kommt." />

      <div
        style={{
          marginTop: 32,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 18,
          flex: 1,
        }}
      >
        {PROJECT_KINDS.map((k, i) => {
          const isSelected = selected === k.id;
          const isFaded = selected !== null && !isSelected;
          return (
            <button
              type="button"
              key={k.id}
              onClick={() => onSelect(k.id)}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 18,
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: "#000",
                aspectRatio: "3 / 4",
                opacity: isFaded ? 0.35 : 1,
                transform: isSelected ? "scale(1.02)" : "scale(1)",
                transition: `opacity 0.4s ${EASE}, transform 0.5s ${EASE}, box-shadow 0.4s ${EASE}`,
                boxShadow: isSelected
                  ? `0 0 0 2px ${TAN}, 0 16px 32px rgba(25,23,14,0.25)`
                  : "0 6px 16px rgba(25,23,14,0.12)",
                animation: `cfRiseIn 0.7s ${EASE} both`,
                animationDelay: `${0.15 + i * 0.06}s`,
              }}
              onMouseEnter={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector("img");
                if (img) (img as HTMLElement).style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector("img");
                if (img) (img as HTMLElement).style.transform = "scale(1)";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={k.image}
                alt={k.label}
                draggable="false"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: `transform 0.8s ${EASE}`,
                }}
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 40%, rgba(25,23,14,0.72) 100%)",
                  pointerEvents: "none",
                }}
              />
              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  left: 16,
                  right: 16,
                  bottom: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 400,
                  letterSpacing: "-0.005em",
                }}
              >
                <span>{k.label}</span>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    border: `1.5px solid ${isSelected ? TAN : "rgba(255,255,255,0.7)"}`,
                    background: isSelected ? TAN : "transparent",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: `background 0.3s ease, border-color 0.3s ease`,
                  }}
                >
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1.5 5.2L4 7.7l4.5-5"
                        stroke="#19170e"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Steps 2 & 3 — Pill selectors
   ────────────────────────────────────────────────────────────────────────── */
function StepPills({
  revealKey,
  eyebrow,
  title,
  subtitle,
  options,
  selected,
  onSelect,
}: {
  revealKey: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  options: Pill[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div style={{ padding: "40px 44px 32px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Eyebrow text={eyebrow} />
      <Headline key={revealKey} text={title} />
      <Subtitle text={subtitle} />

      <div
        style={{
          marginTop: 32,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 14,
        }}
      >
        {options.map((o, i) => {
          const isSelected = selected === o.id;
          return (
            <button
              type="button"
              key={o.id}
              onClick={() => onSelect(o.id)}
              style={{
                position: "relative",
                textAlign: "left",
                padding: "20px 22px",
                borderRadius: 16,
                border: `1px solid ${isSelected ? TAN : "rgba(53,49,31,0.15)"}`,
                background: isSelected ? "rgba(155,146,106,0.12)" : "rgba(255,255,255,0.5)",
                color: BROWN,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: `background 0.3s ease, border-color 0.3s ease, transform 0.3s ${EASE}`,
                transform: isSelected ? "translateY(-2px)" : "translateY(0)",
                animation: `cfRiseIn 0.6s ${EASE} both`,
                animationDelay: `${0.15 + i * 0.06}s`,
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.85)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(53,49,31,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.5)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(53,49,31,0.15)";
                }
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: "-0.005em" }}>
                    {o.label}
                  </span>
                  {o.hint && (
                    <span style={{ fontSize: 12, color: "rgba(53,49,31,0.5)" }}>
                      {o.hint}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    border: `1.5px solid ${isSelected ? TAN : "rgba(53,49,31,0.25)"}`,
                    background: isSelected ? TAN : "transparent",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: `background 0.3s ease, border-color 0.3s ease`,
                    flexShrink: 0,
                  }}
                >
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1.5 5.2L4 7.7l4.5-5"
                        stroke="#19170e"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Step 4 — Contact form
   ────────────────────────────────────────────────────────────────────────── */
function StepContact({
  revealKey,
  name,
  email,
  phone,
  message,
  onName,
  onEmail,
  onPhone,
  onMessage,
  onSubmit,
}: {
  revealKey: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onPhone: (v: string) => void;
  onMessage: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div style={{ padding: "40px 44px 32px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Eyebrow text="04 · Kontaktdaten" />
      <Headline key={revealKey} text="Wer dürfen wir kontaktieren?" />
      <Subtitle text="Wir melden uns innerhalb von 24 Stunden zurück." />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        style={{
          marginTop: 28,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px 24px",
        }}
      >
        <Field label="Name" value={name} onChange={onName} delay={0.15} required />
        <Field
          label="E-Mail"
          value={email}
          onChange={onEmail}
          delay={0.21}
          type="email"
          required
        />
        <Field label="Telefon (optional)" value={phone} onChange={onPhone} delay={0.27} />
        <div />
        <div style={{ gridColumn: "1 / -1" }}>
          <Field
            label="Nachricht (optional)"
            value={message}
            onChange={onMessage}
            delay={0.33}
            multiline
          />
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  delay,
  required,
  type = "text",
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  delay: number;
  required?: boolean;
  type?: string;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const lifted = focused || hasValue;

  const sharedInput: React.CSSProperties = {
    width: "100%",
    border: "none",
    background: "transparent",
    padding: "26px 2px 8px",
    fontSize: 18,
    fontFamily: "inherit",
    fontWeight: 400,
    color: BROWN,
    outline: "none",
    letterSpacing: "-0.005em",
  };

  return (
    <label
      style={{
        position: "relative",
        display: "block",
        borderBottom: `1px solid ${focused ? TAN : "rgba(53,49,31,0.2)"}`,
        transition: "border-color 0.3s ease",
        animation: `cfRiseIn 0.6s ${EASE} both`,
        animationDelay: `${delay}s`,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 2,
          top: lifted ? 4 : 26,
          fontSize: lifted ? 10 : 16,
          letterSpacing: lifted ? "0.12em" : "-0.005em",
          textTransform: lifted ? "uppercase" : "none",
          color: lifted ? TAN : "rgba(53,49,31,0.45)",
          transition: `top 0.35s ${POP}, font-size 0.35s ${POP}, color 0.3s ease, letter-spacing 0.3s ease`,
          pointerEvents: "none",
        }}
      >
        {label}
        {required && <span aria-hidden> *</span>}
      </span>
      {multiline ? (
        <textarea
          rows={2}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...sharedInput, resize: "none", minHeight: 56 }}
        />
      ) : (
        <input
          required={required}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedInput}
        />
      )}
    </label>
  );
}

function SubmitButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 22px",
        border: "none",
        background: disabled ? "rgba(53,49,31,0.15)" : BROWN,
        color: disabled ? "rgba(53,49,31,0.5)" : "#fff",
        borderRadius: 999,
        fontFamily: "inherit",
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: `background 0.3s ease, color 0.3s ease, transform 0.3s ${EASE}`,
        boxShadow: disabled ? "none" : "0 6px 18px rgba(25,23,14,0.18)",
      }}
      onMouseEnter={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLElement).style.transform = "translateX(2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
      }}
    >
      Anfrage senden
      <svg width="14" height="12" viewBox="0 0 16 14" fill="none">
        <path
          d="M1 7h13M8 1l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Step 5 — Thank you
   ────────────────────────────────────────────────────────────────────────── */
function StepThanks({
  revealKey,
  name,
  onClose,
}: {
  revealKey: number;
  name: string;
  onClose: () => void;
}) {
  const firstName = useMemo(() => name.trim().split(/\s+/)[0] || "", [name]);
  return (
    <div
      key={revealKey}
      style={{
        padding: "40px 44px 32px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Animated check */}
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          border: `1.5px solid ${TAN}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 28,
          animation: `cfRing 0.9s ${POP} both`,
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path
            d="M9 18.5l6 6L27 12.5"
            stroke={BROWN}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 60,
              strokeDashoffset: 60,
              animation: `cfCheck 0.7s ${POP} 0.35s forwards`,
            }}
          />
        </svg>
      </div>

      <div
        style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 400,
          color: BROWN,
          letterSpacing: "-0.015em",
          lineHeight: 1.05,
          marginBottom: 14,
          overflow: "hidden",
        }}
      >
        <SplitHeading text={firstName ? `Danke, ${firstName}.` : "Danke."} />
      </div>
      <p
        style={{
          fontSize: 17,
          color: "rgba(53,49,31,0.65)",
          maxWidth: 460,
          lineHeight: 1.45,
          marginBottom: 32,
          animation: `cfRiseIn 0.7s ${EASE} 0.5s both`,
        }}
      >
        Ihre Anfrage ist eingegangen. Wir melden uns innerhalb von 24&nbsp;Stunden
        persönlich bei Ihnen.
      </p>

      <button
        type="button"
        onClick={onClose}
        style={{
          padding: "12px 22px",
          border: "none",
          background: BROWN,
          color: "#fff",
          borderRadius: 999,
          fontFamily: "inherit",
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
          animation: `cfRiseIn 0.7s ${EASE} 0.65s both`,
          transition: `background 0.3s ease`,
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "#2c2a1a")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = BROWN)
        }
      >
        Schließen
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Shared step typography
   ────────────────────────────────────────────────────────────────────────── */
function Eyebrow({ text }: { text: string }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: TAN,
        marginBottom: 14,
      }}
    >
      {text}
    </div>
  );
}

function Headline({ text }: { text: string }) {
  return (
    <h2
      style={{
        fontSize: "clamp(34px, 4.4vw, 52px)",
        fontWeight: 400,
        color: BROWN,
        letterSpacing: "-0.015em",
        lineHeight: 1.05,
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      <SplitHeading text={text} />
    </h2>
  );
}

function Subtitle({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: 15,
        color: "rgba(53,49,31,0.55)",
        maxWidth: 540,
        lineHeight: 1.45,
        animation: `cfRiseIn 0.7s ${EASE} 0.25s both`,
      }}
    >
      {text}
    </p>
  );
}
