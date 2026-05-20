import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export const metadata = {
  title: "Projekte | Seehafer Elemente",
  description: "Ausgewählte Naturstein- und Fliesenprojekte von Seehafer Elemente.",
};

export default function ProjektePage() {
  return (
    <>
      <Navbar />
      <main>
        <Projects />
      </main>
    </>
  );
}
