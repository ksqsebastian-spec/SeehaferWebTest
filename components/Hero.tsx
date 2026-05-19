"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface CardDef {
  col: number;
  align: "flex-start" | "flex-end" | "center";
  w: number;
  h: number;
  src: string;
  name: string;
  row: number;
}

const ROW1_CARDS: CardDef[] = [
  { row: 1, col: 1, align: "center",     w: 300, h: 450, src: "/images/proj-01.jpg", name: "Mühlenberg Bad" },
  { row: 1, col: 2, align: "flex-start", w: 240, h: 160, src: "/images/proj-04.jpg", name: "Seeblick Pool" },
  { row: 1, col: 3, align: "flex-end",   w: 240, h: 360, src: "/images/proj-06.jpg", name: "Lindenallee Wohnen" },
  { row: 1, col: 4, align: "center",     w: 360, h: 240, src: "/images/proj-05.jpg", name: "Waldstraße Küche" },
  { row: 1, col: 5, align: "flex-start", w: 300, h: 450, src: "/images/proj-02.jpg", name: "Seestraße Terrasse" },
  { row: 1, col: 6, align: "flex-end",   w: 450, h: 300, src: "/images/proj-03.jpg", name: "Bergkamp Bad" },
  { row: 1, col: 7, align: "center",     w: 160, h: 240, src: "/images/proj-07.jpg", name: "Kalkstein Fassade" },
];

const ROW2_CARDS: CardDef[] = [
  { row: 2, col: 1, align: "flex-start", w: 240, h: 160, src: "/images/proj-08.jpg", name: "Panorama Dusche" },
  { row: 2, col: 2, align: "flex-end",   w: 240, h: 360, src: "/images/proj-09.jpg", name: "Eichenweg Küche" },
];

function SplitText({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            animation: `charReveal 1.2s cubic-bezier(0.85,0.09,0.15,0.91) both`,
            animationDelay: `${baseDelay + i * 0.035}s`,
          }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

function CardItem({
  card,
  index,
  cardRefs,
  imgRefs,
  onCardEnter,
  onCardLeave,
}: {
  card: CardDef;
  index: number;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  imgRefs: React.MutableRefObject<(HTMLImageElement | null)[]>;
  onCardEnter: (i: number) => void;
  onCardLeave: (i: number) => void;
}) {
  return (
    <div
      ref={el => { cardRefs.current[index] = el; }}
      onMouseEnter={() => onCardEnter(index)}
      onMouseLeave={() => onCardLeave(index)}
      style={{
        gridColumn: card.col,
        gridRow: 1,
        alignSelf: card.align,
        width: card.w,
        height: card.h,
        overflow: "hidden",
        transition: "transform 0.45s cubic-bezier(0.85,0.09,0.15,0.91)",
        willChange: "transform",
        cursor: "pointer",
        zIndex: 2,
        position: "relative",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={el => { imgRefs.current[index] = el; }}
        src={card.src}
        alt={card.name}
        draggable="false"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.6s cubic-bezier(0.85,0.09,0.15,0.91)",
          willChange: "transform",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "32px 14px 14px",
          background: "linear-gradient(to top, rgba(35,30,18,0.72) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.75)",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          {card.name}
        </span>
      </div>
    </div>
  );
}

const INTRO_DURATION = 2200;

export default function Hero() {
  const [intro, setIntro] = useState(true);

  const wrapRef     = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

  const dispX = useRef(0);
  const dispY = useRef(0);
  const tgtX  = useRef(0);
  const tgtY  = useRef(0);

  const dragging  = useRef(false);
  const startPtrX = useRef(0);
  const startPtrY = useRef(0);
  const startTgtX = useRef(0);
  const startTgtY = useRef(0);

  const velX  = useRef(0);
  const velY  = useRef(0);
  const prevX = useRef(0);
  const prevY = useRef(0);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs  = useRef<(HTMLImageElement | null)[]>([]);
  const rafId    = useRef<number | null>(null);

  const CANVAS_W = 4450;
  const CANVAS_H = 2870;
  const halfW = CANVAS_W / 2;
  const halfH = CANVAS_H / 2;

  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), INTRO_DURATION);
    return () => clearTimeout(timer);
  }, []);

  const applyTransform = useCallback((tx: number, ty: number, textTx: number, textTy: number) => {
    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
    }
    if (heroTextRef.current) {
      heroTextRef.current.style.transform = `translate(-50%, -50%) translate(${textTx}px, ${textTy}px)`;
    }
  }, []);

  useEffect(() => {
    const tick = () => {
      if (!dragging.current) {
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

  const onCardEnter = useCallback((i: number) => {
    const card = cardRefs.current[i];
    const img  = imgRefs.current[i];
    if (card) { card.style.transform = "scale(1.025)"; card.style.zIndex = "10"; }
    if (img) img.style.transform = "scale(1.08) translateY(-4px)";
  }, []);

  const onCardLeave = useCallback((i: number) => {
    const card = cardRefs.current[i];
    const img  = imgRefs.current[i];
    if (card) { card.style.transform = "scale(1)"; card.style.zIndex = "2"; }
    if (img) img.style.transform = "scale(1) translateY(0)";
  }, []);

  const hintColor = intro ? "rgba(255,255,255,0.3)" : "rgba(53,49,31,0.3)";
  const easing = "cubic-bezier(0.85, 0.09, 0.15, 0.91)";

  return (
    <>
      <style>{`
        @keyframes charReveal {
          from { opacity: 0; transform: translate3d(0%, -100%, 0px); }
          to   { opacity: 1; transform: translate3d(0%, 0%, 0px); }
        }
      `}</style>

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
          background:  intro ? "#2c2a21" : "#e9e4df",
          transition:  `background-color 1.5s ${easing}`,
        }}
      >
        {/* SVG grid tile overlay — 0.1 during intro, 1 after */}
        <div
          ref={gridRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "url(/tile-bg.svg)",
            opacity: intro ? 0.1 : 1,
            transition: `opacity 1.5s ${easing}`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Hero text — fixed center, parallax on drag */}
        <div
          ref={heroTextRef}
          style={{
            position:      "fixed",
            top:           "50%",
            left:          "50%",
            transform:     "translate(-50%, -50%)",
            zIndex:        1,
            textAlign:     "center",
            pointerEvents: "none",
            willChange:    "transform",
            whiteSpace:    "nowrap",
          }}
        >
          <div
            style={{
              fontSize:      "clamp(56px, 12vw, 192px)",
              fontWeight:    400,
              color:         "#fff",
              letterSpacing: "-0.01em",
              lineHeight:    0.95,
              overflow:      "hidden",
            }}
          >
            <SplitText text="Seehafer" baseDelay={0.2} />
          </div>

          <div
            style={{
              fontSize:      "clamp(56px, 12vw, 192px)",
              fontWeight:    400,
              color:         "#fff",
              letterSpacing: "-0.01em",
              lineHeight:    0.95,
              overflow:      "hidden",
            }}
          >
            <SplitText text="Elemente" baseDelay={0.55} />
          </div>
        </div>

        {/* Canvas with CSS Grid rows */}
        <div
          ref={canvasRef}
          style={{
            position:       "absolute",
            top:            "50%",
            left:           "50%",
            width:          CANVAS_W,
            height:         CANVAS_H,
            transform:      "translate(-50%, -50%)",
            willChange:     "transform",
            display:        "flex",
            flexDirection:  "column",
            gap:            200,
            justifyContent: "center",
          }}
        >
          {/* Row 1 */}
          <div
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gridTemplateColumns: ROW1_CARDS.map(c => `${c.w}px`).join(" "),
              gap: 300,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {ROW1_CARDS.map((card, i) => (
              <CardItem
                key={i}
                card={card}
                index={i}
                cardRefs={cardRefs}
                imgRefs={imgRefs}
                onCardEnter={onCardEnter}
                onCardLeave={onCardLeave}
              />
            ))}
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gridTemplateColumns: ROW2_CARDS.map(c => `${c.w}px`).join(" "),
              gap: 300,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {ROW2_CARDS.map((card, i) => (
              <CardItem
                key={i}
                card={card}
                index={ROW1_CARDS.length + i}
                cardRefs={cardRefs}
                imgRefs={imgRefs}
                onCardEnter={onCardEnter}
                onCardLeave={onCardLeave}
              />
            ))}
          </div>
        </div>

        {/* Drag hint */}
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
              color:         hintColor,
              textTransform: "uppercase",
              transition:    `color 1.5s ${easing}`,
            }}
          >
            Ziehen
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 0v12M0 6h12"
              stroke={hintColor}
              strokeWidth="1"
              strokeLinecap="round"
              style={{ transition: `stroke 1.5s ${easing}` }}
            />
          </svg>
        </div>
      </div>
    </>
  );
}
