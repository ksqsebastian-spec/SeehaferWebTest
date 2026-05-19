"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        display: "grid",
        gridTemplateColumns: "42% 1fr",
        minHeight: "100vh",
      }}
    >
      {/* Left — full-height photo */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/proj-07.jpg"
          alt="Seehafer Elemente Handwerk"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Right — dark column */}
      <div
        style={{
          background: "#19170e",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(48px, 6vw, 96px)",
        }}
      >
        <div />

        {/* Main content */}
        <div data-aos="fade-up">
          <h2
            style={{
              fontSize: "clamp(32px, 4.5vw, 68px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginBottom: 48,
            }}
          >
            Präzises Handwerk.
            <br />
            Unvergleichliche
            <br />
            Qualität.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <a
              href="tel:+4900000000000"
              style={{
                fontSize: "clamp(14px, 1.1vw, 16px)",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
            >
              +49 (0) 000 000 000
            </a>
            <a
              href="mailto:info@seehafer-elemente.de"
              style={{
                fontSize: "clamp(14px, 1.1vw, 16px)",
                color: "#9b926a",
                textDecoration: "none",
                letterSpacing: "0.02em",
                borderBottom: "1px solid rgba(155,146,106,0.4)",
                paddingBottom: 2,
                alignSelf: "flex-start",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9b926a")}
            >
              info@seehafer-elemente.de
            </a>
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 40,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <path d="M2 2L2 20L7 20L7 12L11 20L15 12L15 20L20 20L20 2L15 2L11 10L7 2L2 2Z"
                fill="none" stroke="#9b926a" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9b926a", fontWeight: 400 }}>
              Seehafer Elemente
            </span>
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}
