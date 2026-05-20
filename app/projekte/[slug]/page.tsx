import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import ProjectDetail from "@/components/ProjectDetail";
import NextProject from "@/components/NextProject";
import { projects, getProject, getNextProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projekt nicht gefunden | Seehafer Elemente" };
  return {
    title: `${project.name} | Seehafer Elemente`,
    description: project.subtitle,
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <ProjectDetail project={project} />
        <NextProject next={next} />
      </main>
    </>
  );
}
