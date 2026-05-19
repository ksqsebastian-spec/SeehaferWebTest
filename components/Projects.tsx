"use client";

import { useEffect, useRef, useCallback } from "react";

const projects = [
  { name: "Mühlenberg Bad", category: "Badezimmer", img: "/images/proj-01.jpg", x: 15, y: 8, w: 300, h: 450 },
  { name: "Seestraße Terrasse", category: "Außenbereich", img: "/images/proj-02.jpg", x: 55, y: 5, w: 450, h: 300 },
  { name: "Bergkamp Bad", category: "Badezimmer", img: "/images/proj-03.jpg", x: 80, y: 25, w: 200, h: 300 },
  { name: "Seeblick Pool", category: "Pool", img: "/images/proj-04.jpg", x: 5, y: 45, w: 360, h: 240 },
  { name: "Waldstraße Küche", category: "Küche", img: "/images/proj-05.jpg", x: 35, y: 40, w: 450, h: 300 },
  { name: "Lindenallee Wohnen", category: "Wohnbereich", img: "/images/proj-06.jpg", x: 70, y: 50, w: 240, h: 360 },
  { name: "Kalkstein Fassade", category: "Naturstein", img: "/images/proj-07.jpg", x: 10, y: 70, w: 280, h: 420 },
  { name: "Panorama Dusche", category: "Badezimmer", img: "/images/proj-08.jpg", x: 42, y: 65, w: 400, h: 267 },
  { name: "Eichenweg Küche", category: "Küche", img: "/images/proj-09.jpg", x: 75, y: 72, w: 300, h: 450 },
  { name: "Gartenpfad Projekt", category: "Garten", img: "/images/proj-10.jpg", x: 25, y: 80, w: 350, h: 233 },
];

const CANVAS_W = 5000;
const CANVAS_H = 3500;

export default function Projects() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

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
    if (card) { card.style.transform = "scale(1.03)"; card.style.zIndex = "10"; }
    if (img) img.style.transform = "scale(1.08)";
  }, []);

  const onCardLeave = useCallback((i: number) => {
    const card = cardRefs.current[i];
    const img  = imgRefs.current[i];
    if (card) { card.style.transform = "scale(1)"; card.style.zIndex = "2"; }
    if (img) img.style.transform = "scale(1)";
  }, []);

  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        background: "var(--color-bg, #ebe8e2)",
      }}
    >
      {/* Background text */}
      <div
        ref={bgTextRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontSize: "clamp(80px, 15vw, 240px)",
            fontWeight: 700,
            color: "rgba(53,49,31,0.06)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Projekte
        </span>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: CANVAS_W,
          height: CANVAS_H,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        {projects.map((p, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el; }}
            onMouseEnter={() => onCardEnter(i)}
            onMouseLeave={() => onCardLeave(i)}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.w,
              height: p.h,
              zIndex: 2,
              overflow: "hidden",
              borderRadius: 2,
              transition: "transform 0.4s cubic-bezier(0.85,0.09,0.15,0.91)",
              willChange: "transform",
              cursor: "pointer",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={el => { imgRefs.current[i] = el; }}
              src={p.img}
              alt={p.name}
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
                padding: "40px 14px 14px",
                background: "linear-gradient(to top, rgba(53,49,31,0.6) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                {p.category}
              </div>
              <div style={{ fontSize: 18, fontWeight: 300, color: "#fff", letterSpacing: "-0.01em" }}>
                {p.name}
              </div>
            </div>
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
