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
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#9b926a",
              marginBottom: 24,
            }}
          >
            Kontakt
          </h1>

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
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <path
                d="M17 5.5C17 3.57 14.31 2 11 2C7.69 2 5 3.57 5 5.5C5 7.43 7.69 9 11 9C14.31 9 17 10.57 17 12.5C17 14.43 14.31 16 11 16C7.69 16 5 14.43 5 12.5"
                stroke="#fff"
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
