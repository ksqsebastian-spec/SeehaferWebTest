"use client";

import { useRef, useState } from "react";

const projects = [
  { id: 1, name: "Ainslie Street", category: "Badezimmer", year: "2024", aspect: "landscape" },
  { id: 2, name: "Beach Street", category: "Küche", year: "2024", aspect: "portrait" },
  { id: 3, name: "Duncraig Road", category: "Außenbereich", year: "2023", aspect: "landscape" },
  { id: 4, name: "Excelsior Street", category: "Wohnbereich", year: "2023", aspect: "portrait" },
  { id: 5, name: "Forrest Street", category: "Badezimmer", year: "2023", aspect: "landscape" },
  { id: 6, name: "Hubble Street", category: "Naturstein", year: "2022", aspect: "portrait" },
  { id: 7, name: "Sewell Street", category: "Außenbereich", year: "2022", aspect: "landscape" },
  { id: 8, name: "St. Leonards Ave", category: "Küche", year: "2022", aspect: "portrait" },
  { id: 9, name: "Vivaldi Avenue", category: "Pool", year: "2021", aspect: "landscape" },
  { id: 10, name: "Eco Outdoor", category: "Garten", year: "2021", aspect: "portrait" },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 10,
    });
  };

  const isLandscape = project.aspect === "landscape";

  return (
    <div
      ref={cardRef}
      data-aos="fade-up"
      data-aos-delay={Math.min(index * 60, 300)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        gridColumn: isLandscape ? "span 2" : "span 1",
        aspectRatio: isLandscape ? "16/9" : "3/4",
        background: "#e8e3dd",
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        cursor: "none",
        transition: "transform 0.6s cubic-bezier(0.85,0.09,0.15,0.91)",
        transform: hovered
          ? `perspective(1000px) rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg) scale(1.01)`
          : "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
      }}
    >
      {/* Placeholder image layer with parallax */}
      <div
        style={{
          position: "absolute",
          inset: "-10%",
          background: `linear-gradient(135deg,
            hsl(${30 + index * 8}, 20%, ${70 - index * 2}%) 0%,
            hsl(${25 + index * 5}, 15%, ${60 - index * 2}%) 100%)`,
          transform: hovered
            ? `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px) scale(1.05)`
            : "translate(0, 0) scale(1)",
          transition: "transform 0.6s cubic-bezier(0.85,0.09,0.15,0.91)",
        }}
      />

      {/* Subtle texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='1' height='1' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Info overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "24px 28px",
          background: hovered
            ? "linear-gradient(to top, rgba(53,49,31,0.75) 0%, transparent 60%)"
            : "linear-gradient(to top, rgba(53,49,31,0.4) 0%, transparent 50%)",
          transition: "background 0.4s ease",
        }}
      >
        <div
          style={{
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            opacity: hovered ? 1 : 0.85,
            transition: "transform 0.4s var(--easing), opacity 0.4s ease",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: 6,
              fontWeight: 400,
            }}
          >
            {project.category} · {project.year}
          </div>
          <div
            style={{
              fontSize: "clamp(16px, 1.5vw, 22px)",
              fontWeight: 300,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            {project.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "120px 0 80px" }}>
      <div className="container">
        {/* Header */}
        <div
          data-aos="fade-up"
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 64,
            borderTop: "1px solid var(--color-border)",
            paddingTop: 32,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(11px, 0.9vw, 13px)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-brand)",
              fontWeight: 400,
            }}
          >
            Projekte
          </h2>
          <span
            style={{
              fontSize: 12,
              color: "var(--color-text)",
              letterSpacing: "0.05em",
            }}
          >
            {projects.length} Arbeiten
          </span>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
