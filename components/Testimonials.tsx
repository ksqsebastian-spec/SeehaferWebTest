"use client";

const testimonials = [
  {
    quote:
      "Die Qualität der Arbeit hat unsere Erwartungen übertroffen. Jedes Detail wurde mit größter Sorgfalt ausgeführt.",
    name: "Familie Becker",
    project: "Ainslie Street",
  },
  {
    quote:
      "Professionell, pünktlich und das Ergebnis ist einfach wunderschön. Wir empfehlen Seehafer Elemente ohne Einschränkung weiter.",
    name: "M. Hoffmann",
    project: "Beach Street",
  },
  {
    quote:
      "Unser Badezimmer ist jetzt ein echter Rückzugsort. Die Natursteinarbeiten wirken zeitlos und elegant.",
    name: "Familie Richter",
    project: "Vivaldi Avenue",
  },
];

export default function Testimonials() {
  return (
    <section
      style={{
        padding: "120px 0",
        background: "#35311f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid overlay on dark bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
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
              color: "#9b926a",
              fontWeight: 400,
            }}
          >
            Referenzen
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 48,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.12)",
                paddingTop: 32,
              }}
            >
              <p
                style={{
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.75)",
                  fontWeight: 300,
                  marginBottom: 32,
                  letterSpacing: "-0.01em",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#ffffff",
                    letterSpacing: "0.02em",
                    marginBottom: 4,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#9b926a",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {t.project}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
