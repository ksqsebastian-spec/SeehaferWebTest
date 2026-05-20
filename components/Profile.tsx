"use client";

import Reveal from "@/components/Reveal";

const services = [
  {
    title: "Naturstein",
    description:
      "Travertin, Marmor und Kalkstein bieten grenzenlose Möglichkeiten für Ihr Zuhause. Naturstein besticht in jedem Detail — von markanten Mustern und Strukturen bis hin zur haptischen Erfahrung unter dem Fuß, und seiner klassischen, mühelosen Schönheit. Immer im Trend, seine Präsenz in jedem Raum ist eine Wahl, die Sie für immer schätzen werden.",
    image: "/images/proj-01.jpg",
  },
  {
    title: "Fliesenarbeiten",
    description:
      "Langlebig und vielseitig — Fliesen sind die clevere Wahl für zeitgenössische Räume. Ob großformatige Bodenfliesen, Mosaik-Akzente oder Wandverkleidungen: Unser Fokus liegt auf makellose Fugenbilder, exakte Gehrungsschnitte und langlebige Abdichtung.",
    image: "/images/proj-03.jpg",
  },
  {
    title: "Spezial-\nFliesenarbeiten",
    description:
      "Die ungewöhnlichen Aufträge inspirieren uns jeden Tag. Unterschätzen Sie nie die jahrelange Vorbereitung unserer Expertise, noch die erfinderischen Ideen, die unsere mutige Ausführung antreiben. Unser methodischer Ansatz minimiert Störungen bei maximaler Projekteffizienz. So stellen wir absolute Präzision und unübertroffene Handwerkskunst in jedem Auftrag sicher.",
    image: "/images/proj-05.jpg",
  },
  {
    title: "Badsanierung",
    description:
      "Verwandeln Sie Ihr Badezimmer in ein Refugium aus Stil und Funktion. Von der Konzeption bis zur Fertigstellung kümmern wir uns um jeden Aspekt — Planung, Abriss, Rohinstallation, Abdichtung, Fliesen- und Steinarbeiten sowie die finale Ausstattung. Unsere umfassende Herangehensweise sorgt für ein nahtloses, stressfreies Erlebnis mit einem Ergebnis, das Ihre Erwartungen übertrifft.",
    image: "/images/proj-09.jpg",
  },
];

const clients = [
  "Müller Architekten",
  "Steinwerk GmbH",
  "Weber Bau",
  "Hoffmann Design",
  "Becker Projekte",
  "Schmidt & Partner",
  "Braun Interiors",
  "Keller Hausbau",
  "Richter Architektur",
];

const testimonials = [
  {
    name: "Thomas Richter",
    role: "Geschäftsführer",
    company: "Richter Architektur",
    quote:
      "Die Zusammenarbeit mit Seehafer Elemente war außergewöhnlich. Akribische Arbeit, professionelles Auftreten und höchste Pünktlichkeit — alle Merkmale eines erstklassigen Handwerkers. Absolute Empfehlung für Präzision und Qualität.",
    project: "Mühlenberg Bad",
    projectImage: "/images/proj-01.jpg",
  },
  {
    name: "Anna Weber",
    role: "Projektleiterin",
    company: "Weber Bau",
    quote:
      "Wir haben bei fünf Wohnprojekten zusammengearbeitet und sind stets von der Qualität und Zuverlässigkeit beeindruckt. Die Liebe zum Detail und das handwerkliche Können sind unübertroffen.",
    project: "Seestraße Terrasse",
    projectImage: "/images/proj-02.jpg",
  },
  {
    name: "Michael Hoffmann",
    role: "Inhaber",
    company: "Hoffmann Design",
    quote:
      "Seehafer Elemente hat eine komplexe Pflasterarbeit in unserem Garten übernommen. Die Ergebnisse waren hervorragend — Präzision und Sorgfalt in jedem Detail.",
    project: "Seeblick Pool",
    projectImage: "/images/proj-04.jpg",
  },
];

export default function Profile() {
  return (
    <>
      {/* ═══ HERO ═══ */}
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(25,23,14,0.5) 0%, rgba(25,23,14,0.15) 40%, transparent 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "clamp(80px, 10vw, 140px)",
            left: "clamp(24px, 5vw, 72px)",
            zIndex: 2,
          }}
        >
          <Reveal delay={150} y={36}>
            <p
              style={{
                fontSize: "clamp(56px, 8vw, 128px)",
                fontWeight: 400,
                color: "#ffffff",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              Handwerkliche
              <br />
              Methoden.
            </p>
          </Reveal>
        </div>

        {/* Second slide title hint */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(80px, 10vw, 140px)",
            right: "clamp(24px, 5vw, 72px)",
            zIndex: 2,
            textAlign: "right",
            opacity: 0.35,
          }}
        >
          <p
            style={{
              fontSize: "clamp(56px, 8vw, 128px)",
              fontWeight: 400,
              color: "#ffffff",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            Moderne
            <br />
            Ausführung.
          </p>
        </div>
      </section>

      {/* ═══ DARK SECTION — Overview + Services ═══ */}
      <section
        style={{
          background: "#35311f",
          color: "#9b926a",
          padding: "clamp(60px, 8vw, 120px) clamp(24px, 5vw, 72px)",
        }}
      >
        {/* Overview */}
        <Reveal>
          <div style={{ marginBottom: "clamp(80px, 10vw, 160px)" }}>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                marginBottom: 40,
              }}
            >
              Überblick
            </h2>
            <p
              style={{
                fontSize: "clamp(28px, 3.5vw, 48px)",
                fontWeight: 400,
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                maxWidth: 900,
              }}
            >
              ––– Ursprünglich aus der Tradition des deutschen Handwerks kommend,
              hat Gründer Sebastian Seehafer sein Können an anspruchsvollen
              Projekten perfektioniert. Mit über einem Jahrzehnt Erfahrung und
              der Gründung von Seehafer Elemente sind wir zu einer der
              führenden Adressen für Naturstein und Fliesenarbeiten geworden.
            </p>
          </div>
        </Reveal>

        {/* Meticulous Implementation heading */}
        <Reveal>
          <div style={{ marginBottom: "clamp(60px, 8vw, 100px)" }}>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 40,
              }}
            >
              Unsere Leistungen
            </h2>
            <p
              style={{
                fontSize: "clamp(56px, 8vw, 128px)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.0,
                marginBottom: 32,
              }}
            >
              Akribische
              <br />
              Umsetzung
            </p>
            <p
              style={{
                fontSize: "clamp(18px, 2vw, 28px)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.5,
                maxWidth: 800,
              }}
            >
              Wir arbeiten mit Ihnen, Ihrem Architekten, Designer oder Bauherrn
              zusammen, um eine fehlerfreie Umsetzung Ihrer Vision zu
              gewährleisten.
            </p>
          </div>
        </Reveal>

        {/* Service items */}
        {services.map((service, i) => (
          <Reveal key={i} y={40}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(24px, 4vw, 60px)",
              marginBottom: "clamp(60px, 8vw, 120px)",
              alignItems: "start",
            }}
          >
            <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
              <h3
                style={{
                  fontSize: "clamp(40px, 5vw, 80px)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.05,
                  marginBottom: 24,
                  whiteSpace: "pre-line",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: "clamp(16px, 1.8vw, 28px)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.5,
                }}
              >
                {service.description}
              </p>
            </div>
            <div
              style={{
                order: i % 2 === 0 ? 2 : 1,
                aspectRatio: "4/3",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={service.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
          </Reveal>
        ))}
      </section>

      {/* ═══ LIGHT SECTION — Clients ═══ */}
      <section
        style={{
          background: "#f3efeb",
          padding: "clamp(80px, 10vw, 160px) clamp(24px, 5vw, 72px)",
        }}
      >
        <Reveal>
          <h2
            style={{
              fontSize: "clamp(56px, 8vw, 128px)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              color: "#35311f",
              marginBottom: "clamp(60px, 8vw, 120px)",
            }}
          >
            Vertraut von den
            <br />
            besten Architekten
            <br />& Bauherren
          </h2>
        </Reveal>

        {/* Client logo grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 1,
          }}
        >
          {clients.map((client) => (
            <div
              key={client}
              style={{
                aspectRatio: "3/2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(53,49,31,0.1)",
                padding: 32,
              }}
            >
              <span
                style={{
                  fontSize: "clamp(16px, 1.6vw, 22px)",
                  fontWeight: 500,
                  color: "#35311f",
                  letterSpacing: "-0.01em",
                  textAlign: "center",
                }}
              >
                {client}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ENDORSEMENTS ═══ */}
      <section
        style={{
          background: "#f3efeb",
          padding: "0 clamp(24px, 5vw, 72px) clamp(80px, 10vw, 160px)",
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            color: "rgba(0,0,0,0.6)",
            marginBottom: 60,
            textAlign: "center",
          }}
        >
          Referenzen
        </h2>

        {testimonials.map((t, i) => (
          <Reveal key={i} y={40}>
          <div
            style={{
              marginBottom: "clamp(60px, 8vw, 100px)",
            }}
          >
            <blockquote
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
                color: "rgba(0,0,0,0.6)",
                marginBottom: 24,
                maxWidth: 900,
              }}
            >
              ––– {t.quote}
            </blockquote>
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#35311f",
                }}
              >
                {t.name}
              </span>
              <span
                style={{
                  fontSize: 16,
                  color: "rgba(0,0,0,0.4)",
                  marginLeft: 8,
                }}
              >
                {t.role}, {t.company}
              </span>
            </div>

            {/* Project link with images */}
            <div style={{ marginTop: 24 }}>
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(0,0,0,0.4)",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                {t.project}
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <div
                  style={{
                    width: 200,
                    height: 140,
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.projectImage}
                    alt={t.project}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          </Reveal>
        ))}
      </section>

      {/* ═══ FEATURED PROJECT ═══ */}
      <section
        style={{
          background: "#19170e",
          padding: "clamp(80px, 10vw, 160px) clamp(24px, 5vw, 72px)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            color: "rgba(255,255,255,0.6)",
            marginBottom: 40,
          }}
        >
          Ausgewähltes Projekt
        </h2>

        <Reveal y={40}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(12px, 2vw, 24px)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "clamp(56px, 8vw, 128px)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "#ffffff",
              lineHeight: 1.0,
            }}
          >
            Mühlenberg
          </span>

          {/* Inline image */}
          <div
            style={{
              width: "clamp(60px, 8vw, 120px)",
              height: "clamp(60px, 8vw, 120px)",
              overflow: "hidden",
              borderRadius: 4,
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/proj-01.jpg"
              alt="Mühlenberg Bad"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <span
            style={{
              fontSize: "clamp(56px, 8vw, 128px)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "#ffffff",
              lineHeight: 1.0,
            }}
          >
            Bad
          </span>
        </div>
        </Reveal>

        <div style={{ marginTop: 40 }}>
          <a
            href="/projekte/muehlenberg-bad"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "12px 24px",
              borderRadius: 100,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.5)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.6)";
            }}
          >
            Zum Projekt
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
