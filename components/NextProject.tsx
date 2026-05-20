"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/projects";

export default function NextProject({ next }: { next: Project }) {
  const [hover, setHover] = useState(false);
  const parts = next.name.split(" ");
  const left = parts.slice(0, Math.ceil(parts.length / 2)).join(" ");
  const right = parts.slice(Math.ceil(parts.length / 2)).join(" ");

  return (
    <section
      style={{
        background: "#e9e4df",
        padding: "180px 48px 96px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          fontSize: 14,
          letterSpacing: "0.04em",
          color: "rgba(53,49,31,0.5)",
          marginBottom: 32,
        }}
      >
        Nächstes Projekt
      </div>

      <Link
        href={`/projekte/${next.slug}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "1.5vw",
          textDecoration: "none",
          color: "#2d2a1f",
          fontSize: "clamp(56px, 9vw, 128px)",
          fontWeight: 400,
          lineHeight: 0.95,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        <span>{left}</span>
        <span
          style={{
            display: "inline-block",
            width: "clamp(60px, 7vw, 110px)",
            height: "clamp(40px, 4.8vw, 76px)",
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
            transform: hover ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={next.hero}
            alt=""
            draggable="false"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hover ? "scale(1.12)" : "scale(1)",
              transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </span>
        <span>{right}</span>
      </Link>
    </section>
  );
}
