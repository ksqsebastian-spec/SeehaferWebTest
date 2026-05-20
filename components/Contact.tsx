"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        display: "grid",
        gridTemplateColumns: "42% 1fr",
        minHeight: "100vh",
        background: "#19170e",
      }}
    >
      {/* Left — full-height image swiper area */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/proj-07.jpg"
          alt="Seehafer Elemente Handwerk"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Right — dark column with content + footer */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 40,
          minHeight: "100vh",
        }}
      >
        {/* Spacer top */}
        <div />

        {/* Main content */}
        <div>
          <p
            style={{
              fontSize: "clamp(48px, 5.5vw, 80px)",
              fontWeight: 400,
              color: "#9b926a",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              marginBottom: "clamp(40px, 5vw, 64px)",
            }}
          >
            Präzises Handwerk.
            <br />
            Unvergleichliche
            <br />
            Qualität.
          </p>

          {/* Contact details — DL structure matching real site */}
          <dl style={{ margin: 0 }}>
            <div
              style={{
                padding: "16px 0",
                borderTop: "1px solid rgba(155,146,106,0.2)",
              }}
            >
              <dt
                style={{
                  fontSize: 28,
                  fontWeight: 400,
                  color: "#9b926a",
                  letterSpacing: "-0.01em",
                  marginBottom: 4,
                }}
              >
                Telefon
              </dt>
              <dd style={{ margin: 0 }}>
                <a
                  href="tel:+4900000000000"
                  style={{
                    fontSize: 28,
                    fontWeight: 400,
                    color: "#9b926a",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#9b926a")
                  }
                >
                  +49 (0) 000 000 000
                </a>
              </dd>
            </div>

            <div
              style={{
                padding: "16px 0",
                borderTop: "1px solid rgba(155,146,106,0.2)",
              }}
            >
              <dt
                style={{
                  fontSize: 28,
                  fontWeight: 400,
                  color: "#9b926a",
                  letterSpacing: "-0.01em",
                  marginBottom: 4,
                }}
              >
                E-Mail
              </dt>
              <dd style={{ margin: 0 }}>
                <a
                  href="mailto:info@seehafer-elemente.de"
                  style={{
                    fontSize: 28,
                    fontWeight: 400,
                    color: "#9b926a",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#9b926a")
                  }
                >
                  info@seehafer-elemente.de
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Footer — integrated into contact page */}
        <footer
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 14,
            paddingTop: 40,
          }}
        >
          {/* Logo — stacked wordmark: ELEMENTE big & white on top,
              seehafer in signal red below */}
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "flex-start",
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#fff",
                lineHeight: 0.95,
              }}
            >
              Elemente
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: "#e11d2c",
                marginTop: 4,
                lineHeight: 1,
              }}
            >
              seehafer
            </span>
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <span>&copy; {new Date().getFullYear()} Seehafer Elemente</span>
              <a
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
              </a>
              <a
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
              </a>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 16 }}>
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
          </div>
        </footer>
      </div>
    </section>
  );
}
