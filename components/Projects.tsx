"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";

interface CardDef {
  col: number;
  align: "flex-start" | "flex-end" | "center";
  w: number;
  h: number;
  src: string;
  name: string;
  category: string;
  slug: string;
}

const ROW1_CARDS: CardDef[] = [
  { col: 1, align: "center",     w: 300, h: 450, src: "/images/proj-01.jpg", name: "Mühlenberg Bad",       category: "Badezimmer",   slug: "muehlenberg-bad" },
  { col: 2, align: "flex-start", w: 240, h: 160, src: "/images/proj-02.jpg", name: "Seestraße Terrasse",   category: "Außenbereich", slug: "seestrase-terrasse" },
  { col: 3, align: "flex-end",   w: 240, h: 360, src: "/images/proj-03.jpg", name: "Bergkamp Bad",         category: "Badezimmer",   slug: "bergkamp-bad" },
  { col: 4, align: "center",     w: 360, h: 240, src: "/images/proj-04.jpg", name: "Seeblick Pool",        category: "Pool",         slug: "seeblick-pool" },
  { col: 5, align: "flex-start", w: 300, h: 450, src: "/images/proj-05.jpg", name: "Waldstraße Küche",     category: "Küche",        slug: "waldstrase-kueche" },
  { col: 6, align: "flex-end",   w: 450, h: 300, src: "/images/proj-06.jpg", name: "Lindenallee Wohnen",   category: "Wohnbereich",  slug: "lindenallee-wohnen" },
  { col: 7, align: "center",     w: 160, h: 240, src: "/images/proj-07.jpg", name: "Kalkstein Fassade",    category: "Naturstein",   slug: "kalkstein-fassade" },
];

const ROW2_CARDS: CardDef[] = [
  { col: 1, align: "flex-start", w: 280, h: 420, src: "/images/proj-08.jpg", name: "Panorama Dusche",  category: "Badezimmer", slug: "panorama-dusche" },
  { col: 2, align: "flex-end",   w: 400, h: 267, src: "/images/proj-09.jpg", name: "Eichenweg Küche",  category: "Küche",      slug: "eichenweg-kueche" },
  { col: 3, align: "center",     w: 350, h: 233, src: "/images/proj-10.jpg", name: "Eichenweg Küche",  category: "Küche",      slug: "eichenweg-kueche" },
];

const CANVAS_W = 2400;
const CANVAS_H = 1500;

export default function Projects() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
  const movedDistance = useRef(0);
  const wasDragging = useRef(false);

  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const imgRefs  = useRef<(HTMLImageElement | null)[]>([]);
  const rafId    = useRef<number | null>(null);

  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;
  const halfW = CANVAS_W / 2;
  const halfH = CANVAS_H / 2;

  const applyTransform = useCallback((tx: number, ty: number) => {
    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
    }
    if (bgTextRef.current) {
      bgTextRef.current.style.transform = `translate(-50%, -50%) translate(${tx * 0.05}px, ${ty * 0.05}px)`;
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
      dispX.current = lerp(dispX.current, tgtX.current, 0.08);
      dispY.current = lerp(dispY.current, tgtY.current, 0.08);
      applyTransform(dispX.current, dispY.current);
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
    movedDistance.current = 0;
    wasDragging.current = false;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - startPtrX.current;
    const dy = e.clientY - startPtrY.current;
    movedDistance.current = Math.max(movedDistance.current, Math.abs(dx) + Math.abs(dy));
    if (movedDistance.current > 6 && !wasDragging.current) {
      wasDragging.current = true;
      try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch {}
      if (wrapRef.current) wrapRef.current.style.cursor = "grabbing";
    }
    if (!wasDragging.current) return;
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

  const onClickCapture = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (wasDragging.current) {
      e.preventDefault();
      e.stopPropagation();
      wasDragging.current = false;
    }
  }, []);

  const onCardEnter = useCallback((i: number) => {
    setHoveredIdx(i);
    const card = cardRefs.current[i];
    const img  = imgRefs.current[i];
    if (card) { card.style.transform = "scale(1.025)"; }
    if (img) img.style.transform = "scale(1.06)";
  }, []);

  const onCardLeave = useCallback((i: number) => {
    setHoveredIdx(null);
    const card = cardRefs.current[i];
    const img  = imgRefs.current[i];
    if (card) { card.style.transform = "scale(1)"; }
    if (img) img.style.transform = "scale(1)";
  }, []);

  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
      style={{
        position:    "fixed",
        inset:       0,
        width:       "100vw",
        height:      "100vh",
        overflow:    "hidden",
        cursor:      "grab",
        userSelect:  "none",
        touchAction: "none",
        background:  "#e9e4df",
      }}
    >
      {/* SVG grid tile overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "url(/tile-bg.svg)",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Background text */}
      <div
        ref={bgTextRef}
        style={{
          position:      "absolute",
          top:           "50%",
          left:          "50%",
          transform:     "translate(-50%, -50%)",
          zIndex:        1,
          pointerEvents: "none",
          whiteSpace:    "nowrap",
        }}
      >
        <span
          style={{
            fontSize:      "clamp(80px, 15vw, 240px)",
            fontWeight:    400,
            color:         "#fff",
            letterSpacing: "-0.01em",
            lineHeight:    0.95,
          }}
        >
          Projekte
        </span>
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
          gap:            80,
          justifyContent: "center",
        }}
      >
        {[ROW1_CARDS, ROW2_CARDS].map((row, rowI) => (
          <div
            key={rowI}
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gridTemplateColumns: row.map(c => `${c.w}px`).join(" "),
              gap: 120,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {row.map((card, i) => {
              const idx = rowI === 0 ? i : ROW1_CARDS.length + i;
              const isHovered = hoveredIdx === idx;
              const isFaded = hoveredIdx !== null && !isHovered;
              return (
                <Link
                  key={i}
                  href={`/projekte/${card.slug}`}
                  ref={el => { cardRefs.current[idx] = el; }}
                  onMouseEnter={() => onCardEnter(idx)}
                  onMouseLeave={() => onCardLeave(idx)}
                  style={{
                    gridColumn: card.col,
                    gridRow: 1,
                    alignSelf: card.align,
                    width: card.w,
                    height: card.h,
                    overflow: "hidden",
                    borderRadius: 2,
                    transition:
                      "transform 0.4s cubic-bezier(0.85,0.09,0.15,0.91), opacity 0.45s cubic-bezier(0.85,0.09,0.15,0.91)",
                    willChange: "transform, opacity",
                    cursor: "pointer",
                    zIndex: isHovered ? 10 : 2,
                    position: "relative",
                    display: "block",
                    textDecoration: "none",
                    opacity: isFaded ? 0.25 : 1,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={el => { imgRefs.current[idx] = el; }}
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
                  {/* Hover pill */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.9})`,
                      opacity: isHovered ? 1 : 0,
                      transition:
                        "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)",
                      background: "rgba(35,30,18,0.85)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      padding: "12px 22px",
                      borderRadius: 999,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      whiteSpace: "nowrap",
                      fontSize: 16,
                      fontWeight: 400,
                      letterSpacing: "-0.005em",
                      pointerEvents: "none",
                    }}
                  >
                    {card.name}
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path d="M1 7h13M8 1l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Drag hint */}
      <div style={{ position: "fixed", bottom: 36, right: 40, zIndex: 20, display: "flex", alignItems: "center", gap: 8, pointerEvents: "none" }}>
        <span style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(53,49,31,0.3)", textTransform: "uppercase" }}>Ziehen</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 0v12M0 6h12" stroke="rgba(53,49,31,0.3)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
