"use client";

const stats = [
  { value: "12+", label: "Jahre Erfahrung" },
  { value: "300+", label: "Projekte" },
  { value: "100%", label: "Qualitätsgarantie" },
];

export default function Profile() {
  return (
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
          {/* Left: headline */}
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

          {/* Right: text */}
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
                borderRight: i < stats.length - 1 ? "1px solid var(--color-border)" : "none",
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
  );
}
