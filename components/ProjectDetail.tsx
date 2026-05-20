"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import Reveal from "@/components/Reveal";

export default function ProjectDetail({ project }: { project: Project }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const heroImgRef = useRef<HTMLImageElement>(null);

  // Parallax on hero image
  useEffect(() => {
    const img = heroImgRef.current;
    if (!img) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const t = Math.min(y / window.innerHeight, 1);
        img.style.transform = `translate3d(0, ${t * 60}px, 0) scale(${1 + t * 0.05})`;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <article style={{ background: "#e9e4df", color: "#2d2a1f", overflowX: "hidden" }}>
      {/* HERO — image (75vh) + credits row (25vh) in one fold */}
      <section
        style={{
          width: "100%",
          height: "100vh",
          minHeight: 700,
          display: "flex",
          flexDirection: "column",
          background: "#e9e4df",
        }}
      >
        {/* Image block */}
        <div
          style={{
            position: "relative",
            flex: "1 1 75%",
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
                "linear-gradient(to bottom, rgba(35,30,18,0.10) 0%, rgba(35,30,18,0) 30%, rgba(35,30,18,0) 60%, rgba(35,30,18,0.35) 100%)",
              pointerEvents: "none",
            }}
          />
          {/* Title overlay — centered horizontally, anchored to bottom */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "clamp(48px, 8vh, 96px)",
              padding: "0 clamp(24px, 4vw, 64px)",
              textAlign: "center",
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
                  margin: "16px auto 0",
                  maxWidth: 820,
                  fontSize: "clamp(18px, 2vw, 28px)",
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
        </div>

        {/* Credits row */}
        <div
          style={{
            flex: "0 0 auto",
            padding: "clamp(28px, 4vh, 48px) clamp(24px, 4vw, 64px)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            columnGap: "clamp(16px, 2vw, 40px)",
            alignItems: "start",
          }}
        >
          {project.credits.map((c, i) => (
            <Reveal key={c.label} delay={i * 70}>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.04em",
                    color: "rgba(45,42,31,0.45)",
                    marginBottom: 8,
                  }}
                >
                  {c.label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 400, color: "#2d2a1f" }}>
                  {c.value}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section
        style={{
          background: "#cfccc0",
          padding: "clamp(80px, 14vw, 200px) clamp(24px, 4vw, 64px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(120px, 1fr) minmax(0, 3fr)",
            gap: "clamp(32px, 6vw, 96px)",
            maxWidth: 1760,
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
                fontSize: "clamp(24px, 2.4vw, 36px)",
                fontWeight: 400,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: "#2d2a1f",
                margin: 0,
                maxWidth: 1100,
              }}
            >
              <span style={{ marginLeft: "clamp(0px, 4vw, 80px)" }}>
                {project.overview}
              </span>
            </p>
          </Reveal>
        </div>

        {/* Project details disclosure */}
        <div
          style={{
            maxWidth: 1760,
            margin: "clamp(64px, 9vw, 128px) auto 0",
            display: "grid",
            gridTemplateColumns: "minmax(120px, 1fr) minmax(0, 3fr)",
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
                fontSize: 15,
                letterSpacing: "-0.005em",
                fontFamily: "inherit",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginLeft: "clamp(0px, 4vw, 80px)",
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
                marginTop: detailsOpen ? 28 : 0,
                marginLeft: "clamp(0px, 4vw, 80px)",
              }}
            >
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: "rgba(45,42,31,0.85)",
                  margin: 0,
                  maxWidth: 820,
                }}
              >
                {project.details}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-BLEED IMAGE RUNS — no horizontal padding, edge-to-edge */}
      <section
        style={{
          background: "#e9e4df",
          padding: "clamp(60px, 8vw, 120px) 0",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(24px, 4vw, 64px)",
        }}
      >
        {project.runs.map((run, i) => {
          if (run.kind === "full") {
            return (
              <Reveal key={i} y={48}>
                <div style={{ width: "100%", aspectRatio: "3/2", overflow: "hidden" }}>
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
          // pair — also full bleed with thin gutter
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(8px, 1.2vw, 24px)",
                width: "100%",
              }}
            >
              {run.images.map((im, j) => (
                <Reveal key={j} delay={j * 120} y={36}>
                  <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
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
      </section>
    </article>
  );
}
