"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#19170e",
        padding: "48px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.04em",
          }}
        >
          © {new Date().getFullYear()} Seehafer Elemente
        </div>

        <nav style={{ display: "flex", gap: 24 }}>
          {["Projekte", "Profil", "Kontakt", "Impressum"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")
              }
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
