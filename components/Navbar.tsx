"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const projects = [
  { label: "Mühlenberg Bad", href: "/projekte/muehlenberg-bad" },
  { label: "Seestraße Terrasse", href: "/projekte/seestrase-terrasse" },
  { label: "Bergkamp Bad", href: "/projekte/bergkamp-bad" },
  { label: "Seeblick Pool", href: "/projekte/seeblick-pool" },
  { label: "Waldstraße Küche", href: "/projekte/waldstrase-kueche" },
  { label: "Lindenallee Wohnen", href: "/projekte/lindenallee-wohnen" },
  { label: "Kalkstein Fassade", href: "/projekte/kalkstein-fassade" },
  { label: "Panorama Dusche", href: "/projekte/panorama-dusche" },
  { label: "Eichenweg Küche", href: "/projekte/eichenweg-kueche" },
];

const mainLinks = [
  { label: "Profil", href: "/profil" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  const isProjectsActive = pathname.startsWith("/projekte");

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
      {/* Pill container — frosted glass */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          background: scrolled
            ? "rgba(28,25,15,0.55)"
            : "rgba(28,25,15,0.45)",
          borderRadius: 100,
          padding: "10px 24px",
          border: "1px solid rgba(255,255,255,0.14)",
          backdropFilter: "blur(22px) saturate(1.6)",
          WebkitBackdropFilter: "blur(22px) saturate(1.6)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.18), 0 14px 32px rgba(12,11,7,0.22)",
          transition: "background 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Stacked wordmark — ELEMENTE big & white, seehafer signal red below */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            lineHeight: 1,
            marginRight: 28,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#fff",
              lineHeight: 0.95,
            }}
          >
            Elemente
          </span>
          <span
            style={{
              fontSize: 8.5,
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "#e11d2c",
              marginTop: 2,
              lineHeight: 1,
            }}
          >
            seehafer
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {/* Projects link + dropdown */}
          <div
            ref={dropdownRef}
            style={{ position: "relative" }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              href="/projekte"
              style={{
                color: isProjectsActive || dropdownOpen ? "#fff" : "rgba(255,255,255,0.75)",
                background: isProjectsActive || dropdownOpen ? "rgba(255,255,255,0.08)" : "transparent",
                textDecoration: "none",
                fontSize: "0.8125rem",
                fontWeight: 400,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: 100,
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                transition: "color 0.2s ease, background 0.2s ease",
              }}
            >
              Projekte
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                style={{
                  transition: "transform 0.25s ease",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Dropdown panel — wrapper carries the 10px hover-bridge as padding */}
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                paddingTop: 10,
                minWidth: 200,
                opacity: dropdownOpen ? 1 : 0,
                pointerEvents: dropdownOpen ? "auto" : "none",
                transform: dropdownOpen
                  ? "translateX(-50%) translateY(0px)"
                  : "translateX(-50%) translateY(-6px)",
                transition: "opacity 0.22s ease, transform 0.22s cubic-bezier(0.85, 0.09, 0.15, 0.91)",
              }}
            >
            <div
              style={{
                background: "rgba(28,25,15,0.55)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 14,
                padding: "8px",
                backdropFilter: "blur(22px) saturate(1.6)",
                WebkitBackdropFilter: "blur(22px) saturate(1.6)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.2), 0 14px 32px rgba(12,11,7,0.28)",
              }}
            >
              {projects.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  style={{
                    display: "block",
                    color: pathname === p.href ? "#fff" : "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "7px 12px",
                    borderRadius: 8,
                    background: pathname === p.href ? "rgba(255,255,255,0.08)" : "transparent",
                    transition: "color 0.15s ease, background 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const active = pathname === p.href;
                    (e.currentTarget as HTMLElement).style.color = active ? "#fff" : "rgba(255,255,255,0.65)";
                    (e.currentTarget as HTMLElement).style.background = active ? "rgba(255,255,255,0.08)" : "transparent";
                  }}
                >
                  {p.label}
                </Link>
              ))}
            </div>
            </div>
          </div>

          {/* Main links */}
          {mainLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: active ? "#fff" : "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  fontSize: "0.8125rem",
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: 100,
                  background: active ? "rgba(255,255,255,0.08)" : "transparent",
                  transition: "color 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = active ? "#fff" : "rgba(255,255,255,0.75)";
                  (e.currentTarget as HTMLElement).style.background = active ? "rgba(255,255,255,0.08)" : "transparent";
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
