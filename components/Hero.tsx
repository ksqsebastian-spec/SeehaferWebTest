"use client";

import { useEffect, useRef, useCallback } from "react";

/* ── Types ── */
interface CardDef {
  col: number;            // 1-based grid column (out of 7)
  align: "flex-start" | "flex-end" | "center";
  w: number;              // px
  h: number;              // px
  src: string;
  name: string;
}

/* ── Project card definitions ── */
const CARDS: CardDef[] = [
  { col: 5, align: "flex-start", w: 300, h: 450, src: "/images/proj-01.jpg", name: "Mühlenberg Bad" },
  { col: 6, align: "flex-end",   w: 450, h: 300, src: "/images/proj-02.jpg", name: "Seestraße Terrasse" },
  { col: 7, align: "center",     w: 160, h: 240, src: "/images/proj-03.jpg", name: "Bergkamp Bad" },
  { col: 1, align: "flex-start", w: 240, h: 160, src: "/images/proj-04.jpg", name: "Seeblick Pool" },
  { col: 3, align: "flex-end",   w: 450, h: 300, src: "/images/proj-05.jpg", name: "Waldstraße Küche" },
  { col: 4, align: "flex-start", w: 240, h: 360, src: "/images/proj-06.jpg", name: "Lindenallee Wohnen" },
  { col: 6, align: "flex-start", w: 160, h: 240, src: "/images/proj-07.jpg", name: "Kalkstein Fassade" },
  { col: 1, align: "flex-end",   w: 360, h: 240, src: "/images/proj-08.jpg", name: "Panorama Dusche" },
  { col: 3, align: "center",     w: 300, h: 450, src: "/images/proj-09.jpg", name: "Eichenweg Küche" },
];

/* Split "Seehafer Elemente" into individual character spans for entry animation */
function SplitText({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          data-char={ch}
          style={{
            display: "inline-block",
            animation: `charReveal 1.2s cubic-bezier(0.85,0.09,0.15,0.91) both`,
            animationDelay: `${baseDelay + i * 0.035}s`,
          }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  /* ── Refs for animation state ── */
  const wrapRef     = useRef<HTMLDivElement>(null);   // the 100vw/100vh viewport wrapper
  const canvasRef   = useRef<HTMLDivElement>(null);   // the 4450×2870 inner canvas
  const heroTextRef = useRef<HTMLDivElement>(null);   // the parallax text

  /* Current displayed offset (lerped) */
  const dispX = useRef(0);
  const dispY = useRef(0);

  /* Target offset (updated on pointer events + inertia) */
  const tgtX = useRef(0);
  const tgtY = useRef(0);

  /* Drag state */
  const dragging    = useRef(false);
  const startPtrX   = useRef(0);
  const startPtrY   = useRef(0);
  const startTgtX   = useRef(0);
  const startTgtY   = useRef(0);

  /* Velocity for inertia */
  const velX  = useRef(0);
  const velY  = useRef(0);
  const prevX = useRef(0);
  const prevY = useRef(0);

  /* Card hover refs for per-card image parallax */
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs  = useRef<(HTMLImageElement | null)[]>([]);

  const rafId = useRef<number | null>(null);

  /* ── Canvas size constants ── */
  const CANVAS_W = 4450;
  const CANVAS_H = 2870;
  /* Half-extents: how far the canvas can slide */
  const halfW = CANVAS_W / 2;
  const halfH = CANVAS_H / 2;

  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;

  /* ── Apply transforms ── */
  const applyTransform = useCallback((tx: number, ty: number, textTx: number, textTy: number) => {
    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
    }
    if (heroTextRef.current) {
      heroTextRef.current.style.transform = `translate(-50%, -50%) translate(${textTx}px, ${textTy}px)`;
    }
  }, []);

  /* ── RAF loop: lerp + inertia ── */
  useEffect(() => {
    const tick = () => {
      if (!dragging.current) {
        /* Apply inertia decay */
        velX.current *= 0.92;
        velY.current *= 0.92;
        if (Math.abs(velX.current) > 0.1 || Math.abs(velY.current) > 0.1) {
          tgtX.current = clamp(tgtX.current + velX.current, -(halfW / 2), halfW / 2);
          tgtY.current = clamp(tgtY.current + velY.current, -(halfH / 2), halfH / 2);
        }
      }

      const nx = lerp(dispX.current, tgtX.current, 0.08);
      const ny = lerp(dispY.current, tgtY.current, 0.08);
      dispX.current = nx;
      dispY.current = ny;

      applyTransform(nx, ny, nx * 0.12, ny * 0.12);

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Pointer handlers ── */
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current  = true;
    startPtrX.current = e.clientX;
    startPtrY.current = e.clientY;
    startTgtX.current = tgtX.current;
    startTgtY.current = tgtY.current;
    prevX.current     = e.clientX;
    prevY.current     = e.clientY;
    velX.current      = 0;
    velY.current      = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (wrapRef.current) wrapRef.current.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - startPtrX.current;
    const dy = e.clientY - startPtrY.current;
    tgtX.current = clamp(startTgtX.current + dx, -(halfW / 2), halfW / 2);
    tgtY.current = clamp(startTgtY.current + dy, -(halfH / 2), halfH / 2);

    /* Track velocity */
    velX.current = e.clientX - prevX.current;
    velY.current = e.clientY - prevY.current;
    prevX.current = e.clientX;
    prevY.current = e.clientY;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    if (wrapRef.current) wrapRef.current.style.cursor = "grab";
  }, []);

  /* ── Card hover parallax ── */
  const onCardEnter = useCallback((i: number) => {
    const card = cardRefs.current[i];
    const img  = imgRefs.current[i];
    if (card) {
      card.style.transform = "scale(1.025)";
      card.style.zIndex    = "10";
    }
    if (img) img.style.transform = "scale(1.08) translateY(-4px)";
  }, []);

  const onCardLeave = useCallback((i: number) => {
    const card = cardRefs.current[i];
    const img  = imgRefs.current[i];
    if (card) {
      card.style.transform = "scale(1)";
      card.style.zIndex    = "2";
    }
    if (img) img.style.transform = "scale(1) translateY(0)";
  }, []);

  /* ── Grid layout helpers ── */
  /* 7 columns, each ~600px wide, total ~4450px */
  const COL_W   = Math.floor(CANVAS_W / 7);   // ≈635
  const ROW_H   = Math.floor(CANVAS_H / 5);   // ≈574

  /* Row assignment for each card (spread across 5 rows) */
  const ROW_MAP = [1, 3, 5, 1, 4, 2, 2, 5, 4];

  const cardLeft = (col: number) => (col - 1) * COL_W + 40;
  const cardTop  = (row: number, align: CardDef["align"], h: number) => {
    const rowStart = (row - 1) * ROW_H;
    if (align === "flex-start") return rowStart + 40;
    if (align === "flex-end")   return rowStart + ROW_H - h - 40;
    return rowStart + (ROW_H - h) / 2;
  };

  return (
    <>
      {/* ── Keyframe styles injected once ── */}
      <style>{`
        @keyframes charReveal {
          from { opacity: 0; transform: translateY(140px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Viewport wrapper ── */}
      <div
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          position:    "fixed",
          inset:       0,
          width:       "100vw",
          height:      "100vh",
          overflow:    "hidden",
          cursor:      "grab",
          userSelect:  "none",
          touchAction: "none",
          background:  "var(--color-bg, #e9e4df)",
        }}
      >
        {/* ── Hero text — BEHIND images (z-index 1) ── */}
        <div
          ref={heroTextRef}
          style={{
            position:       "absolute",
            top:            "50%",
            left:           "50%",
            transform:      "translate(-50%, -50%)",
            zIndex:         1,
            textAlign:      "center",
            pointerEvents:  "none",
            willChange:     "transform",
            whiteSpace:     "nowrap",
          }}
        >
          {/* Sub-label above */}
          <p
            style={{
              fontSize:      "clamp(9px, 1.1vw, 14px)",
              color:         "var(--color-text-brand, #9b926a)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom:  "0.35em",
              fontWeight:    400,
              opacity:       0.9,
              animation:     "charReveal 1.2s cubic-bezier(0.85,0.09,0.15,0.91) 0.1s both",
            }}
          >
            Traditionelles
          </p>

          {/* Line 1 */}
          <div
            style={{
              fontSize:      "clamp(72px, 13.5vw, 210px)",
              fontWeight:    700,
              color:         "rgba(255,255,255,0.95)",
              letterSpacing: "-0.005em",
              lineHeight:    0.95,
              display:       "block",
              overflow:      "hidden",
            }}
          >
            <SplitText text="Seehafer" baseDelay={0.2} />
          </div>

          {/* Mid-label */}
          <p
            style={{
              fontSize:      "clamp(9px, 1.1vw, 14px)",
              color:         "var(--color-text-brand, #9b926a)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin:        "0.3em 0",
              fontWeight:    400,
              opacity:       0.9,
              animation:     "charReveal 1.2s cubic-bezier(0.85,0.09,0.15,0.91) 0.55s both",
            }}
          >
            Handwerk
          </p>

          {/* Line 2 */}
          <div
            style={{
              fontSize:      "clamp(72px, 13.5vw, 210px)",
              fontWeight:    700,
              color:         "rgba(255,255,255,0.95)",
              letterSpacing: "-0.005em",
              lineHeight:    0.95,
              display:       "block",
              overflow:      "hidden",
            }}
          >
            <SplitText text="Elemente" baseDelay={0.55} />
          </div>
        </div>

        {/* ── Infinite canvas ── */}
        <div
          ref={canvasRef}
          style={{
            position:    "absolute",
            top:         "50%",
            left:        "50%",
            width:       CANVAS_W,
            height:      CANVAS_H,
            transform:   "translate(-50%, -50%)",
            willChange:  "transform",
          }}
        >
          {CARDS.map((card, i) => {
            const row  = ROW_MAP[i];
            const top  = cardTop(row, card.align, card.h);
            const left = cardLeft(card.col);

            return (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el; }}
                onMouseEnter={() => onCardEnter(i)}
                onMouseLeave={() => onCardLeave(i)}
                style={{
                  position:   "absolute",
                  top,
                  left,
                  width:      card.w,
                  height:     card.h,
                  zIndex:     2,
                  overflow:   "hidden",
                  transition: "transform 0.45s cubic-bezier(0.85,0.09,0.15,0.91)",
                  willChange: "transform",
                  cursor:     "pointer",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={el => { imgRefs.current[i] = el; }}
                  src={card.src}
                  alt={card.name}
                  draggable="false"
                  style={{
                    width:      "100%",
                    height:     "100%",
                    objectFit:  "cover",
                    display:    "block",
                    transition: "transform 0.6s cubic-bezier(0.85,0.09,0.15,0.91)",
                    willChange: "transform",
                  }}
                />
                {/* Gradient name overlay */}
                <div
                  style={{
                    position:   "absolute",
                    bottom:     0,
                    left:       0,
                    right:      0,
                    padding:    "32px 14px 14px",
                    background: "linear-gradient(to top, rgba(35,30,18,0.72) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                >
                  <span
                    style={{
                      fontSize:      10,
                      letterSpacing: "0.1em",
                      color:         "rgba(255,255,255,0.75)",
                      textTransform: "uppercase",
                      fontWeight:    400,
                    }}
                  >
                    {card.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Drag hint (bottom-right) ── */}
        <div
          style={{
            position:      "fixed",
            bottom:        36,
            right:         40,
            zIndex:        20,
            display:       "flex",
            alignItems:    "center",
            gap:           8,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize:      10,
              letterSpacing: "0.1em",
              color:         "rgba(53,49,31,0.3)",
              textTransform: "uppercase",
            }}
          >
            Ziehen
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 0v12M0 6h12"
              stroke="rgba(53,49,31,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
