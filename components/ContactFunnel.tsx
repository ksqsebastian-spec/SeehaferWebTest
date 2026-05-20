"use client";

import { useState, useEffect, useMemo } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   Tokens
   ────────────────────────────────────────────────────────────────────────── */
const EASE = "cubic-bezier(0.85, 0.09, 0.15, 0.91)";
const POP = "cubic-bezier(0.16, 1, 0.3, 1)";
const TAN = "#9b926a";
const INK = "#0c0b07";
const GHOST = "rgba(12,11,7,0.16)";
const MUTED = "rgba(12,11,7,0.5)";

/* ──────────────────────────────────────────────────────────────────────────
   Data — every option carries its own image so the backdrop tracks the
   user's selections.
   ────────────────────────────────────────────────────────────────────────── */
type Pill = { id: string; label: string; image: string };

const PROJECT_KINDS: Pill[] = [
  { id: "bad",      label: "Badezimmer", image: "/images/proj-01.jpg" },
  { id: "kueche",   label: "Küche",      image: "/images/proj-05.jpg" },
  { id: "terrasse", label: "Terrasse",   image: "/images/proj-02.jpg" },
  { id: "stein",    label: "Naturstein", image: "/images/proj-07.jpg" },
];

const TIMELINES: Pill[] = [
  { id: "now",   label: "Sobald möglich",      image: "/images/proj-03.jpg" },
  { id: "3m",    label: "In drei Monaten",     image: "/images/proj-08.jpg" },
  { id: "6m",    label: "Im Halbjahr",         image: "/images/proj-06.jpg" },
  { id: "later", label: "Noch unverbindlich",  image: "/images/proj-09.jpg" },
];

/* Pool of all images we may show — used so we can preload + render them
   all stacked, only the active one opaque. */
const ALL_IMAGES = Array.from(
  new Set([
    ...PROJECT_KINDS.map((p) => p.image),
    ...TIMELINES.map((t) => t.image),
  ])
);

/* Anchor + alignment per step. Numbers are percentages of the viewport. */
type Anchor = { x: number; y: number; align: "left" | "right" | "center"; vAlign: "top" | "center" | "bottom" };
const STEP_ANCHORS: Anchor[] = [
  { x: 10, y: 50, align: "left",   vAlign: "center" }, // 0 project
  { x: 90, y: 56, align: "right",  vAlign: "center" }, // 1 timeline
  { x: 50, y: 50, align: "center", vAlign: "center" }, // 2 contact
  { x: 50, y: 50, align: "center", vAlign: "center" }, // 3 thanks
];

/* Per-step base color shown when no option is hovered or selected. */
const STEP_COLORS = [
  "#6e8a6e", // 0 — sage green
  "#6f9ec0", // 1 — sky blue
  "#8e424d", // 2 — burgundy
  "#ebe8e2", // 3 — cream (thanks)
];

const TOTAL_STEPS = 4;

/* ──────────────────────────────────────────────────────────────────────────
   Fill-reveal text: each character fades from ghost-grey to ink, in
   order. Wraps by word (not character) so long phrases break cleanly.
   ────────────────────────────────────────────────────────────────────────── */
function FillReveal({
  text,
  delay = 0,
  charMs = 26,
  duration = 0.55,
}: {
  text: string;
  delay?: number;
  charMs?: number;
  duration?: number;
}) {
  const words = text.split(" ");
  let i = 0;
  return (
    <>
      {words.map((word, wi) => {
        const chars = Array.from(word);
        const wordNode = (
          <span
            key={`w-${wi}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {chars.map((ch, ci) => {
              const idx = i++;
              return (
                <span
                  key={ci}
                  style={{
                    display: "inline-block",
                    color: GHOST,
                    animation: `cfFill ${duration}s linear both`,
                    animationDelay: `${delay + (idx * charMs) / 1000}s`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) {
          const spaceIdx = i++;
          return (
            <span key={wi}>
              {wordNode}
              <span
                style={{
                  color: GHOST,
                  animation: `cfFill ${duration}s linear both`,
                  animationDelay: `${delay + (spaceIdx * charMs) / 1000}s`,
                }}
              >
                {" "}
              </span>
            </span>
          );
        }
        return <span key={wi}>{wordNode}</span>;
      })}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────────────────────────────────── */
export default function ContactFunnel() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [revealKeys, setRevealKeys] = useState<number[]>(() =>
    Array(TOTAL_STEPS).fill(0)
  );

  const [project, setProject] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  /* Hover/commit preview — the image shows only while previewing or
     while a selection is being committed (reveal moment). Otherwise
     the step's base color is visible. */
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [revealing, setRevealing] = useState(false);
  const stepColor = STEP_COLORS[step] ?? "#ebe8e2";

  /* CTA reveal after hero intro */
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
    requestAnimationFrame(() => setMounted(true));
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
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setPreviewImage(null);
      setRevealing(false);
    }, 700);
  };

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

  const choose = (
    setter: (v: string) => void,
    value: string,
    advanceFrom: number,
    image: string
  ) => {
    setter(value);
    if (step === advanceFrom) {
      // Pin the preview to the selected image so the bg doesn't snap
      // back if the user's cursor leaves the pill mid-transition.
      setPreviewImage(image);
      setRevealing(true);
      setTimeout(() => {
        goNext();
      }, 720);
      setTimeout(() => {
        setRevealing(false);
        setPreviewImage(null);
      }, 1400);
    }
  };

  const canSubmit = name.trim().length > 1 && /.+@.+\..+/.test(email);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!canSubmit) return;
    goNext();
  };

  return (
    <>
      <style>{`
        @keyframes cfFill {
          from { color: ${GHOST}; }
          to   { color: ${INK}; }
        }
        @keyframes cfPing {
          0%   { transform: scale(0.6); opacity: 0.9; }
          80%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes cfRise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cfCheck {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes cfRing {
          from { transform: scale(0.55); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* ─── CTA ─── */}
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
          background: INK,
          color: "#fff",
          borderRadius: 999,
          fontFamily: "inherit",
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow:
            "0 14px 34px rgba(25,23,14,0.22), 0 2px 6px rgba(25,23,14,0.16)",
          transition: `opacity 0.9s ${EASE}, transform 0.9s ${EASE}, background 0.3s ease, box-shadow 0.3s ease`,
          willChange: "transform, opacity",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#1f1d14";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = INK;
        }}
      >
        <span
          aria-hidden
          style={{ position: "relative", width: 8, height: 8, display: "inline-block" }}
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
            overflow: "hidden",
            opacity: mounted ? 1 : 0,
            transition: `opacity 0.6s ${EASE}`,
          }}
        >
          {/* Base — solid step color, fades on step change */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: stepColor,
              transition: `background 0.8s ${EASE}`,
            }}
          />

          {/* Image layers — only become visible while previewing an
              option or committing one. Heavy blur so they read as
              atmospheric, not photographic. */}
          {ALL_IMAGES.map((src) => (
            <div
              key={src}
              aria-hidden
              style={{
                position: "absolute",
                inset: -80,
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: revealing
                  ? "blur(30px) saturate(1.3)"
                  : "blur(52px) saturate(1.2)",
                transform: `scale(${revealing ? 1.06 : 1.16})`,
                opacity: previewImage === src ? 1 : 0,
                transition: `opacity 0.9s ${EASE}, transform 1.6s ${EASE}, filter 1.2s ${EASE}`,
              }}
            />
          ))}

          {/* Milky wash — full when at rest (color soft), thins on
              hover so the image reads through, lifts further on
              commit so it "ports" you through. */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: revealing
                ? "linear-gradient(180deg, rgba(245,243,238,0.28) 0%, rgba(235,232,226,0.24) 50%, rgba(245,243,238,0.32) 100%)"
                : previewImage
                ? "linear-gradient(180deg, rgba(245,243,238,0.4) 0%, rgba(235,232,226,0.36) 50%, rgba(245,243,238,0.44) 100%)"
                : "linear-gradient(180deg, rgba(245,243,238,0.55) 0%, rgba(235,232,226,0.5) 50%, rgba(245,243,238,0.58) 100%)",
              backdropFilter: revealing
                ? "blur(3px) saturate(1.05)"
                : previewImage
                ? "blur(5px) saturate(1.1)"
                : "blur(10px) saturate(1.15)",
              WebkitBackdropFilter: revealing
                ? "blur(3px) saturate(1.05)"
                : previewImage
                ? "blur(5px) saturate(1.1)"
                : "blur(10px) saturate(1.15)",
              transition: `background 0.6s ${EASE}, backdrop-filter 0.6s ${EASE}, -webkit-backdrop-filter 0.6s ${EASE}`,
            }}
          />

          {/* Very faint grain to break up flatness */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/tile-bg.svg)",
              opacity: revealing ? 0.06 : previewImage ? 0.1 : 0.16,
              mixBlendMode: "multiply",
              pointerEvents: "none",
              transition: `opacity 0.6s ${EASE}`,
            }}
          />

          {/* Close */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Schließen"
            style={{
              position: "absolute",
              top: 28,
              right: 32,
              zIndex: 5,
              width: 42,
              height: 42,
              borderRadius: 999,
              border: "1px solid rgba(12,11,7,0.18)",
              background: "rgba(235,232,226,0.5)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: INK,
              transition: "background 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(235,232,226,0.85)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(235,232,226,0.5)")
            }
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

          {/* Back — just a serif italic arrow, sitting bottom-left */}
          {step > 0 && step < TOTAL_STEPS - 1 && (
            <button
              type="button"
              onClick={goBack}
              aria-label="Zurück"
              style={{
                position: "absolute",
                left: 40,
                bottom: 32,
                zIndex: 5,
                width: 56,
                height: 56,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                background: "transparent",
                color: MUTED,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                fontSize: 38,
                lineHeight: 1,
                cursor: "pointer",
                padding: 0,
                transition: "color 0.25s ease, transform 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = INK;
                (e.currentTarget as HTMLElement).style.transform =
                  "translateX(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = MUTED;
                (e.currentTarget as HTMLElement).style.transform =
                  "translateX(0)";
              }}
            >
              ←
            </button>
          )}

          {/* Step content — anchored per step */}
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
            const isActive = step === i;
            const anchor = STEP_ANCHORS[i];
            return (
              <StepStage
                key={i}
                anchor={anchor}
                isActive={isActive}
                direction={i < step ? -1 : i > step ? 1 : 0}
              >
                {i === 0 && (
                  <ProjectStep
                    revealKey={revealKeys[0]}
                    selected={project}
                    onSelect={(id, image) => choose(setProject, id, 0, image)}
                    onHover={setPreviewImage}
                  />
                )}
                {i === 1 && (
                  <PillStep
                    revealKey={revealKeys[1]}
                    title="Wann darf es losgehen?"
                    options={TIMELINES}
                    selected={timeline}
                    onSelect={(id, image) => choose(setTimeline, id, 1, image)}
                    onHover={setPreviewImage}
                    align="right"
                  />
                )}
                {i === 2 && (
                  <ContactStep
                    revealKey={revealKeys[2]}
                    name={name}
                    email={email}
                    phone={phone}
                    message={message}
                    onName={setName}
                    onEmail={setEmail}
                    onPhone={setPhone}
                    onMessage={setMessage}
                    onSubmit={handleSubmit}
                    canSubmit={canSubmit}
                  />
                )}
                {i === 3 && (
                  <ThanksStep
                    revealKey={revealKeys[3]}
                    name={name}
                    onClose={handleClose}
                  />
                )}
              </StepStage>
            );
          })}
        </div>
      )}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Stage wrapper — anchors the step at its offset and fades it in/out
   ────────────────────────────────────────────────────────────────────────── */
function StepStage({
  anchor,
  isActive,
  direction,
  children,
}: {
  anchor: Anchor;
  isActive: boolean;
  direction: -1 | 0 | 1;
  children: React.ReactNode;
}) {
  // Translate the anchored point so x/y act as the alignment edge
  const tx =
    anchor.align === "left" ? "0%" : anchor.align === "right" ? "-100%" : "-50%";
  const ty =
    anchor.vAlign === "top"
      ? "0%"
      : anchor.vAlign === "bottom"
      ? "-100%"
      : "-50%";

  const slide = isActive ? 0 : direction === -1 ? -28 : 28;

  return (
    <div
      aria-hidden={!isActive}
      style={{
        position: "absolute",
        left: `${anchor.x}vw`,
        top: `${anchor.y}vh`,
        transform: `translate(${tx}, ${ty}) translateX(${slide}px)`,
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        transition: `opacity 0.55s ${EASE}, transform 0.7s ${EASE}`,
        width: anchor.align === "center" ? "min(92vw, 560px)" : "min(86vw, 480px)",
      }}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Step 0 — project kind, with image-circle pills
   ────────────────────────────────────────────────────────────────────────── */
function ProjectStep({
  revealKey,
  selected,
  onSelect,
  onHover,
}: {
  revealKey: number;
  selected: string | null;
  onSelect: (id: string, image: string) => void;
  onHover: (image: string | null) => void;
}) {
  return (
    <div key={revealKey} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <Question text="Was haben Sie vor?" />
      <OptionList
        options={PROJECT_KINDS}
        selected={selected}
        onSelect={onSelect}
        onHover={onHover}
        align="left"
        startDelay={0.45}
        variant="image"
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Steps 1 & 2 — pills (compact glass pills, alignment varies)
   ────────────────────────────────────────────────────────────────────────── */
function PillStep({
  revealKey,
  title,
  options,
  selected,
  onSelect,
  onHover,
  align,
}: {
  revealKey: number;
  title: string;
  options: Pill[];
  selected: string | null;
  onSelect: (id: string, image: string) => void;
  onHover: (image: string | null) => void;
  align: "left" | "right";
}) {
  return (
    <div
      key={revealKey}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 28,
        alignItems: align === "right" ? "flex-end" : "flex-start",
        textAlign: align,
      }}
    >
      <Question text={title} align={align} />
      <OptionList
        options={options}
        selected={selected}
        onSelect={onSelect}
        onHover={onHover}
        align={align}
        startDelay={0.4}
        variant="plain"
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Question — fills grey → ink
   ────────────────────────────────────────────────────────────────────────── */
function Question({
  text,
  align = "left",
}: {
  text: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <h2
      style={{
        fontSize: "clamp(34px, 4.4vw, 56px)",
        fontWeight: 300,
        letterSpacing: "-0.035em",
        lineHeight: 1.04,
        margin: 0,
        textAlign: align,
        color: GHOST,
        maxWidth: "min(90vw, 560px)",
        wordSpacing: "0.01em",
        hyphens: "manual",
      }}
    >
      <FillReveal text={text} delay={0.05} charMs={28} duration={0.5} />
    </h2>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Compact option list — text rows that fill in, hover reveals indicator
   ────────────────────────────────────────────────────────────────────────── */
function OptionList({
  options,
  selected,
  onSelect,
  onHover,
  align,
  startDelay,
  variant,
}: {
  options: Pill[];
  selected: string | null;
  onSelect: (id: string, image: string) => void;
  onHover: (image: string | null) => void;
  align: "left" | "right";
  startDelay: number;
  variant: "image" | "plain";
}) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: variant === "image" ? 14 : 10,
        alignItems: align === "right" ? "flex-end" : "flex-start",
      }}
      onMouseLeave={() => onHover(null)}
    >
      {options.map((o, i) => {
        const isSelected = selected === o.id;
        const isDimmed = selected !== null && !isSelected;
        return (
          <li
            key={o.id}
            style={{
              animation: `cfRise 0.6s ${EASE} both`,
              animationDelay: `${startDelay + i * 0.07}s`,
              maxWidth: "min(86vw, 420px)",
            }}
          >
            <OptionPill
              label={o.label}
              image={o.image}
              isSelected={isSelected}
              isDimmed={isDimmed}
              fillDelay={startDelay + i * 0.07 + 0.08}
              variant={variant}
              align={align}
              onClick={() => onSelect(o.id, o.image)}
              onHover={onHover}
            />
          </li>
        );
      })}
    </ul>
  );
}

/* Glass pill — frosted translucent surface over the milky backdrop.
   In "image" variant, a circular thumbnail of the option's image sits
   on the leading edge, expanding subtly on hover. */
function OptionPill({
  label,
  image,
  isSelected,
  isDimmed,
  fillDelay,
  variant,
  align,
  onClick,
  onHover,
}: {
  label: string;
  image: string;
  isSelected: boolean;
  isDimmed: boolean;
  fillDelay: number;
  variant: "image" | "plain";
  align: "left" | "right";
  onClick: () => void;
  onHover: (image: string | null) => void;
}) {
  const [hover, setHover] = useState(false);

  const surfaceBase = "rgba(255,255,255,0.32)";
  const surfaceHover = "rgba(255,255,255,0.55)";
  const surfaceSelected = "rgba(155,146,106,0.22)";
  const borderBase = "rgba(255,255,255,0.55)";
  const borderHover = "rgba(255,255,255,0.85)";
  const borderSelected = "rgba(155,146,106,0.55)";

  const bg = isSelected ? surfaceSelected : hover ? surfaceHover : surfaceBase;
  const border = isSelected ? borderSelected : hover ? borderHover : borderBase;

  const handleEnter = () => {
    setHover(true);
    onHover(image);
  };
  const handleLeave = () => {
    setHover(false);
  };

  const isImage = variant === "image";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        flexDirection: align === "right" ? "row-reverse" : "row",
        gap: isImage ? 16 : 14,
        padding: isImage ? "10px 26px 10px 12px" : "14px 26px 14px 28px",
        borderRadius: 999,
        border: `1px solid ${border}`,
        background: bg,
        color: INK,
        fontFamily: "inherit",
        fontSize: isImage
          ? "clamp(18px, 1.65vw, 22px)"
          : "clamp(17px, 1.6vw, 21px)",
        fontWeight: 300,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        cursor: "pointer",
        backdropFilter: "blur(22px) saturate(1.6)",
        WebkitBackdropFilter: "blur(22px) saturate(1.6)",
        boxShadow: hover
          ? "inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -1px 0 rgba(12,11,7,0.05), 0 18px 38px rgba(12,11,7,0.14)"
          : "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(12,11,7,0.05), 0 10px 28px rgba(12,11,7,0.08)",
        opacity: isDimmed ? 0.4 : 1,
        transition: `background 0.4s ${EASE}, border-color 0.4s ${EASE}, opacity 0.4s ${EASE}, transform 0.5s ${POP}, box-shadow 0.5s ${EASE}`,
        transform: `translateY(${isSelected ? -3 : hover ? -2 : 0}px) translateX(${
          hover && align === "left" ? 4 : hover && align === "right" ? -4 : 0
        }px)`,
      }}
    >
      {isImage && (
        <span
          aria-hidden
          style={{
            position: "relative",
            display: "inline-block",
            width: hover || isSelected ? 50 : 44,
            height: hover || isSelected ? 50 : 44,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: isSelected
              ? `inset 0 0 0 1.5px ${TAN}, 0 6px 14px rgba(12,11,7,0.18)`
              : "0 6px 14px rgba(12,11,7,0.16)",
            transition: `width 0.5s ${POP}, height 0.5s ${POP}, box-shadow 0.4s ${EASE}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            draggable="false"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: `scale(${hover ? 1.15 : 1})`,
              transition: `transform 0.7s ${EASE}`,
            }}
          />
        </span>
      )}

      <span style={{ display: "inline-block", flex: 1 }}>
        <FillReveal text={label} delay={fillDelay} charMs={22} duration={0.45} />
      </span>

      <span
        aria-hidden
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: isSelected ? TAN : "transparent",
          border: isSelected
            ? `1px solid ${TAN}`
            : "1px solid rgba(12,11,7,0.25)",
          color: isSelected ? "#fff" : INK,
          opacity: hover || isSelected ? 1 : 0.55,
          transition: `background 0.3s ease, border-color 0.3s ease, opacity 0.3s ease, transform 0.4s ${POP}`,
          transform: `scale(${hover && !isSelected ? 1.1 : 1})`,
          flexShrink: 0,
        }}
      >
        {isSelected ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1.6 5.2L4 7.6 8.4 2.6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4h7M5.5 1L8.5 4l-3 3"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Step 3 — contact form (compact)
   ────────────────────────────────────────────────────────────────────────── */
function ContactStep({
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
  canSubmit,
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
  canSubmit: boolean;
}) {
  return (
    <div
      key={revealKey}
      style={{ display: "flex", flexDirection: "column", gap: 28 }}
    >
      <Question text="Wie erreichen wir Sie?" align="center" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "18px 22px",
          marginTop: 6,
        }}
      >
        <Field label="Name" value={name} onChange={onName} delay={0.35} required />
        <Field
          label="E-Mail"
          value={email}
          onChange={onEmail}
          delay={0.42}
          type="email"
          required
        />
        <div style={{ gridColumn: "1 / -1" }}>
          <Field
            label="Telefon (optional)"
            value={phone}
            onChange={onPhone}
            delay={0.49}
          />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field
            label="Worum geht es? (optional)"
            value={message}
            onChange={onMessage}
            delay={0.56}
            multiline
          />
        </div>
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            justifyContent: "center",
            marginTop: 6,
            animation: `cfRise 0.7s ${EASE} 0.7s both`,
          }}
        >
          <SubmitButton disabled={!canSubmit} />
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
    fontWeight: 300,
    color: INK,
    outline: "none",
    letterSpacing: "-0.02em",
  };

  return (
    <label
      style={{
        position: "relative",
        display: "block",
        borderBottom: `1px solid ${focused ? TAN : "rgba(12,11,7,0.2)"}`,
        transition: "border-color 0.3s ease",
        animation: `cfRise 0.6s ${EASE} both`,
        animationDelay: `${delay}s`,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 2,
          top: lifted ? 4 : 26,
          fontSize: lifted ? 10 : 16,
          fontWeight: 300,
          letterSpacing: lifted ? "0.22em" : "-0.015em",
          textTransform: lifted ? "uppercase" : "none",
          color: lifted ? TAN : "rgba(12,11,7,0.4)",
          transition: `top 0.4s ${POP}, font-size 0.4s ${POP}, color 0.3s ease, letter-spacing 0.4s ${POP}`,
          pointerEvents: "none",
        }}
      >
        {label}
        {required && <span aria-hidden style={{ color: TAN }}> *</span>}
      </span>
      {multiline ? (
        <textarea
          rows={2}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...sharedInput, resize: "none", minHeight: 52 }}
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

function SubmitButton({ disabled }: { disabled: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 24px",
        border: "none",
        background: disabled ? "rgba(12,11,7,0.18)" : INK,
        color: disabled ? "rgba(12,11,7,0.5)" : "#fff",
        borderRadius: 999,
        fontFamily: "inherit",
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: `background 0.3s ease, color 0.3s ease, transform 0.3s ${EASE}`,
        boxShadow: disabled ? "none" : "0 8px 22px rgba(12,11,7,0.22)",
      }}
      onMouseEnter={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLElement).style.transform = "translateX(3px)";
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
   Step 4 — thanks
   ────────────────────────────────────────────────────────────────────────── */
function ThanksStep({
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 22,
      }}
    >
      <div
        style={{
          width: 78,
          height: 78,
          borderRadius: "50%",
          border: `1.5px solid ${TAN}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          animation: `cfRing 0.9s ${POP} both`,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
          <path
            d="M9 18.5l6 6L27 12.5"
            stroke={INK}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 60,
              strokeDashoffset: 60,
              animation: `cfCheck 0.7s ${POP} 0.4s forwards`,
            }}
          />
        </svg>
      </div>

      <Question
        text={firstName ? `Danke, ${firstName}.` : "Danke."}
        align="center"
      />
      <p
        style={{
          fontSize: 15,
          fontWeight: 300,
          color: MUTED,
          maxWidth: 420,
          lineHeight: 1.5,
          letterSpacing: "-0.01em",
          margin: 0,
          animation: `cfRise 0.7s ${EASE} 0.55s both`,
        }}
      >
        Ihre Anfrage liegt bei uns. Wir melden uns persönlich innerhalb eines
        Werktags.
      </p>

      <button
        type="button"
        onClick={onClose}
        style={{
          marginTop: 8,
          padding: "11px 22px",
          border: "none",
          background: INK,
          color: "#fff",
          borderRadius: 999,
          fontFamily: "inherit",
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          animation: `cfRise 0.7s ${EASE} 0.75s both`,
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "#1f1d14")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = INK)
        }
      >
        Schließen
      </button>
    </div>
  );
}
