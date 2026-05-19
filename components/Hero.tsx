"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = [line1.current, line2.current];
    tl.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(60px)";
      el.style.transition = `opacity 1.2s cubic-bezier(0.85,0.09,0.15,0.91) ${i * 0.18}s, transform 1.2s cubic-bezier(0.85,0.09,0.15,0.91) ${i * 0.18}s`;
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 80);
      });
    });
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 40px 80px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          lineHeight: 0.92,
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <div
          ref={line1}
          style={{
            fontSize: "clamp(72px, 12vw, 180px)",
            fontWeight: 300,
            color: "rgba(53,49,31,0.11)",
            letterSpacing: "-0.02em",
            display: "block",
            WebkitTextStroke: "1px rgba(53,49,31,0.18)",
          }}
        >
          Seehafer
        </div>
        <div
          ref={line2}
          style={{
            fontSize: "clamp(72px, 12vw, 180px)",
            fontWeight: 300,
            color: "rgba(53,49,31,0.11)",
            WebkitTextStroke: "1px rgba(53,49,31,0.18)",
            letterSpacing: "-0.02em",
            display: "block",
          }}
        >
          Elemente
        </div>
      </div>

      {/* Tagline */}
      <p
        data-aos="fade-up"
        data-aos-delay="400"
        style={{
          marginTop: 48,
          fontSize: "clamp(13px, 1.2vw, 15px)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-text-brand)",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Handwerk & Naturstein
      </p>

      {/* Scroll indicator */}
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, transparent, var(--color-text-brand))",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}
