import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import AOSInit from "@/components/AOSInit";

export const metadata = {
  title: "Projekte | Seehafer Elemente",
  description: "Ausgewählte Naturstein- und Fliesenprojekte von Seehafer Elemente.",
};

export default function ProjektePage() {
  return (
    <>
      <AOSInit />
      <Cursor />
      <Navbar />
      <main>
        <Projects />
      </main>
      <Footer />
    </>
  );
}
