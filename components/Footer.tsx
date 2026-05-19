"use client";

import Link from "next/link";

const navLinks = [
  { label: "Projekte", href: "/projekte" },
  { label: "Profil", href: "/profil" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#19170e" }}>
      {/* Main footer section */}
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          padding: "80px 48px 60px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Left — brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M17 5.5C17 3.57 14.31 2 11 2C7.69 2 5 3.57 5 5.5C5 7.43 7.69 9 11 9C14.31 9 17 10.57 17 12.5C17 14.43 14.31 16 11 16C7.69 16 5 14.43 5 12.5"
                stroke="#9b926a"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#9b926a",
                fontWeight: 400,
              }}
            >
              Seehafer Elemente
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.3)",
              maxWidth: 360,
            }}
          >
            Traditionelles Handwerk. Naturstein und Fliesen
            mit Präzision und Leidenschaft.
          </p>
        </div>

        {/* Right — navigation */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 48px",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
          &copy; {new Date().getFullYear()} Seehafer Elemente
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link
            href="/datenschutz"
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.2)")}
          >
            Datenschutz
          </Link>
          <Link
            href="/impressum"
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.2)")}
          >
            Impressum
          </Link>
        </div>
      </div>
    </footer>
  );
}
