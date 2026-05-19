import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Projekte | Seehafer Elemente",
  description: "Ausgewählte Naturstein- und Fliesenprojekte von Seehafer Elemente.",
};

export default function ProjektePage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Projects />
      </main>
    </>
  );
}
