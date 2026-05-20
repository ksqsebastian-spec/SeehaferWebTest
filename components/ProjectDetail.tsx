"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import Reveal from "@/components/Reveal";

export default function ProjectDetail({ project }: { project: Project }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const heroImgRef = useRef<HTMLImageElement>(null);

  // Subtle parallax on hero image — moves at 0.3× scroll speed
  useEffect(() => {
    const img = heroImgRef.current;
    if (!img) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = window.innerHeight;
        const t = Math.min(y / max, 1);
        img.style.transform = `translate3d(0, ${t * 80}px, 0) scale(${1 + t * 0.06})`;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <article style={{ background: "#e9e4df", color: "#2d2a1f", overflowX: "hidden" }}>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: 640,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={heroImgRef}
          src={project.hero}
          alt={project.name}
          draggable="false"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(35,30,18,0.18) 0%, rgba(35,30,18,0) 35%, rgba(35,30,18,0) 65%, rgba(35,30,18,0.45) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "120px clamp(24px, 4vw, 64px) clamp(140px, 14vh, 200px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            color: "#fff",
            pointerEvents: "none",
          }}
        >
          <Reveal delay={150} y={36}>
            <h1
              aria-label={project.name}
              style={{
                fontSize: "clamp(56px, 9vw, 128px)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={350} y={20}>
            <p
              style={{
                margin: "16px 0 0",
                maxWidth: 720,
                fontSize: "clamp(18px, 1.9vw, 28px)",
                fontWeight: 400,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {project.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CREDITS ROW */}
      <Reveal>
        <section
          style={{
            padding: "clamp(40px, 5vw, 72px) clamp(24px, 4vw, 64px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            columnGap: 32,
            rowGap: 24,
            borderBottom: "1px solid rgba(53,49,31,0.12)",
          }}
        >
          {project.credits.map((c) => (
            <div key={c.label}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(53,49,31,0.5)",
                  marginBottom: 8,
                }}
              >
                {c.label}
              </div>
              <div style={{ fontSize: 16, fontWeight: 400, color: "#2d2a1f" }}>
                {c.value}
              </div>
            </div>
          ))}
        </section>
      </Reveal>

      {/* OVERVIEW */}
      <section
        style={{
          background: "#cfccc0",
          padding: "clamp(80px, 12vw, 180px) clamp(24px, 4vw, 64px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(140px, 1fr) minmax(0, 3fr)",
            gap: "clamp(32px, 6vw, 96px)",
            maxWidth: 1600,
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          <Reveal>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "rgba(45,42,31,0.45)",
                margin: 0,
                position: "sticky",
                top: 120,
              }}
            >
              Überblick
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p
              style={{
                fontSize: "clamp(22px, 2vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: "#2d2a1f",
                margin: 0,
                maxWidth: 980,
              }}
            >
              {project.overview}
            </p>
          </Reveal>
        </div>

        {/* Details disclosure */}
        <div
          style={{
            maxWidth: 1600,
            margin: "clamp(48px, 7vw, 96px) auto 0",
            display: "grid",
            gridTemplateColumns: "minmax(140px, 1fr) minmax(0, 3fr)",
            gap: "clamp(32px, 6vw, 96px)",
          }}
        >
          <span />
          <div>
            <button
              type="button"
              onClick={() => setDetailsOpen((v) => !v)}
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "rgba(45,42,31,0.6)",
                fontSize: 14,
                letterSpacing: "0.04em",
                fontFamily: "inherit",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: detailsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                ↓
              </span>
              Projektdetails
            </button>
            <div
              style={{
                overflow: "hidden",
                maxHeight: detailsOpen ? 800 : 0,
                opacity: detailsOpen ? 1 : 0,
                transition:
                  "max-height 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
                marginTop: detailsOpen ? 24 : 0,
              }}
            >
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "rgba(45,42,31,0.85)",
                  margin: 0,
                  maxWidth: 720,
                }}
              >
                {project.details}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE RUNS */}
      <section style={{ padding: "clamp(80px, 10vw, 160px) 0", background: "#e9e4df" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(32px, 5vw, 80px)",
          }}
        >
          {project.runs.map((run, i) => {
            if (run.kind === "full") {
              return (
                <Reveal key={i} y={48}>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 1600,
                      margin: "0 auto",
                      padding: "0 clamp(24px, 4vw, 64px)",
                      aspectRatio: "16/9",
                      overflow: "hidden",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={run.images[0].src}
                      alt={run.images[0].alt}
                      draggable="false"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </Reveal>
              );
            }
            // pair
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(16px, 2.4vw, 40px)",
                  maxWidth: 1600,
                  margin: "0 auto",
                  padding: "0 clamp(24px, 4vw, 64px)",
                }}
              >
                {run.images.map((im, j) => (
                  <Reveal key={j} delay={j * 120} y={36}>
                    <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={im.src}
                        alt={im.alt}
                        draggable="false"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
