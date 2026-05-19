"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Projekte", href: "#projects" },
  { label: "Profil", href: "#profile" },
  { label: "Kontakt", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        transition: "all 0.5s cubic-bezier(0.85, 0.09, 0.15, 0.91)",
      }}
    >
      {/* Desktop nav pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          background: scrolled ? "rgba(53,49,31,0.97)" : "#35311f",
          borderRadius: 100,
          padding: "10px 24px",
          backdropFilter: "blur(12px)",
          transition: "background 0.4s ease",
        }}
      >
        {/* Logo mark */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: 28,
            textDecoration: "none",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M2 2L2 20L7 20L7 12L11 20L15 12L15 20L20 20L20 2L15 2L11 10L7 2L2 2Z"
              fill="none"
              stroke="#9b926a"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Links */}
        <div
          className="nav-links"
          style={{ display: "flex", gap: 4, alignItems: "center" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                fontSize: "0.8125rem",
                fontWeight: 400,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: 100,
                transition: "color 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
