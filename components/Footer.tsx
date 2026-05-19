"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#19170e",
        padding: "clamp(32px, 4vw, 48px) clamp(24px, 5vw, 72px)",
        color: "rgba(255,255,255,0.6)",
        fontSize: 14,
        display: "grid",
        gridTemplateAreas: '"logo content socials"',
        gridTemplateColumns: "auto 1fr auto",
        gap: "1.5rem 2rem",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <div style={{ gridArea: "logo" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "#fff",
          }}
        >
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
              color: "#fff",
              fontWeight: 400,
            }}
          >
            Seehafer Elemente
          </span>
        </Link>
      </div>

      {/* Content — copyright + links */}
      <div
        style={{
          gridArea: "content",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5ch",
          flexWrap: "wrap",
        }}
      >
        <span>&copy; {new Date().getFullYear()} Seehafer Elemente</span>
        <Link
          href="/datenschutz"
          style={{
            color: "rgba(255,255,255,0.6)",
            textDecoration: "underline",
            textUnderlineOffset: 2,
            textDecorationThickness: 1,
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#fff")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.6)")
          }
        >
          Datenschutz
        </Link>
        <Link
          href="/impressum"
          style={{
            color: "rgba(255,255,255,0.6)",
            textDecoration: "underline",
            textUnderlineOffset: 2,
            textDecorationThickness: 1,
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#fff")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.6)")
          }
        >
          Impressum
        </Link>
      </div>

      {/* Socials */}
      <div
        style={{
          gridArea: "socials",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <a
          href="#"
          aria-label="Instagram"
          style={{
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#fff")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.6)")
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
          </svg>
        </a>
        <a
          href="#"
          aria-label="Facebook"
          style={{
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#fff")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.6)")
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
