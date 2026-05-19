"use client";

const stats = [
  { value: "12+", label: "Jahre Erfahrung" },
  { value: "300+", label: "Projekte" },
  { value: "100%", label: "Qualitätsgarantie" },
];

export default function Profile() {
  return (
    <>
      {/* Full-bleed hero image */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/profile-hero.jpg"
          alt="Seehafer Elemente Handwerk"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(25,23,14,0.7) 0%, rgba(25,23,14,0.1) 50%, transparent 100%)",
          }}
        />

        {/* Heading overlay — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(48px, 6vw, 80px)",
            left: "clamp(24px, 5vw, 72px)",
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(40px, 7vw, 100px)",
              fontWeight: 300,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.0,
            }}
          >
            Handwerkliche
            <br />
            Methoden.
          </h1>
        </div>

        {/* Sub-nav — bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            gap: 32,
            padding: "16px clamp(24px, 5vw, 72px)",
            background: "rgba(25,23,14,0.65)",
            backdropFilter: "blur(4px)",
          }}
        >
          {["Geschichte", "Leistungen", "Referenzen", "Team"].map((label) => (
            <span
              key={label}
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 400,
                cursor: "none",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")
              }
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* About content */}
      <section id="profile" style={{ padding: "120px 0" }}>
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
              Profil
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
            <div data-aos="fade-up">
              <h3
                style={{
                  fontSize: "clamp(32px, 4vw, 64px)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-strong)",
                }}
              >
                Handwerk,
                <br />
                das bleibt.
              </h3>
            </div>

            <div data-aos="fade-up" data-aos-delay="120">
              <p
                style={{
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  lineHeight: 1.7,
                  color: "var(--color-text)",
                  marginBottom: 32,
                }}
              >
                Seehafer Elemente steht für höchste Qualität in der Verarbeitung
                von Naturstein und handwerklichen Elementen. Mit über einem Jahrzehnt
                Erfahrung gestalten wir Räume, die durch Materialität und Präzision
                überzeugen.
              </p>
              <p
                style={{
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  lineHeight: 1.7,
                  color: "var(--color-text)",
                }}
              >
                Von der ersten Beratung bis zur finalen Ausführung begleiten wir
                unsere Kunden mit persönlichem Engagement und handwerklichem
                Anspruch.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              marginTop: 80,
              borderTop: "1px solid var(--color-border)",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                style={{
                  padding: "40px 0",
                  borderRight:
                    i < stats.length - 1 ? "1px solid var(--color-border)" : "none",
                  paddingRight: 40,
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(40px, 5vw, 72px)",
                    fontWeight: 300,
                    color: "var(--color-text-strong)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-text-brand)",
                    fontWeight: 400,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom image band */}
      <section style={{ position: "relative", height: "50vh", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/proj-05.jpg"
          alt="Seehafer Elemente Arbeit"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </section>
    </>
  );
}
