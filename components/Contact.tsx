"use client";

import { useState } from "react";

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null);

  const inputStyle = (name: string) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === name ? "var(--color-text-strong)" : "var(--color-border)"}`,
    padding: "16px 0",
    fontSize: "clamp(15px, 1.1vw, 16px)",
    color: "var(--color-text-strong)",
    fontFamily: "inherit",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.3s ease",
    cursor: "none",
  });

  return (
    <section id="contact" style={{ padding: "120px 0 160px" }}>
      <div className="container">
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: 32,
            marginBottom: 80,
          }}
        >
          <h2
            data-aos="fade-up"
            style={{
              fontSize: "clamp(11px, 0.9vw, 13px)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-brand)",
              fontWeight: 400,
            }}
          >
            Kontakt
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px 120px",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div data-aos="fade-up">
            <h3
              style={{
                fontSize: "clamp(32px, 4vw, 60px)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--color-text-strong)",
                marginBottom: 32,
              }}
            >
              Lassen Sie uns
              <br />
              sprechen.
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <a
                href="mailto:info@seehafer-elemente.de"
                style={{
                  color: "var(--color-text-brand)",
                  textDecoration: "none",
                  fontSize: 14,
                  letterSpacing: "0.04em",
                }}
              >
                info@seehafer-elemente.de
              </a>
              <a
                href="tel:+49000000000"
                style={{
                  color: "var(--color-text)",
                  textDecoration: "none",
                  fontSize: 14,
                  letterSpacing: "0.04em",
                }}
              >
                +49 (0) 000 000 000
              </a>
            </div>
          </div>

          {/* Right: form */}
          <form
            data-aos="fade-up"
            data-aos-delay="120"
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", flexDirection: "column", gap: 0 }}
          >
            {[
              { name: "name", placeholder: "Ihr Name", type: "text" },
              { name: "email", placeholder: "E-Mail Adresse", type: "email" },
              { name: "phone", placeholder: "Telefon (optional)", type: "tel" },
            ].map((f) => (
              <div key={f.name} style={{ marginBottom: 8 }}>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  style={inputStyle(f.name)}
                  onFocus={() => setFocused(f.name)}
                  onBlur={() => setFocused(null)}
                />
              </div>
            ))}
            <div style={{ marginBottom: 40 }}>
              <textarea
                placeholder="Ihre Nachricht"
                rows={4}
                style={{
                  ...inputStyle("message"),
                  resize: "none",
                  paddingTop: 20,
                }}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
              />
            </div>
            <button
              type="submit"
              style={{
                alignSelf: "flex-start",
                background: "var(--color-text-strong)",
                color: "#fff",
                border: "none",
                padding: "14px 36px",
                borderRadius: 100,
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "inherit",
                fontWeight: 400,
                cursor: "none",
                transition: "background 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-text-brand)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-text-strong)";
              }}
            >
              Senden
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
