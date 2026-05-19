import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import AOSInit from "@/components/AOSInit";

export const metadata = {
  title: "Kontakt | Seehafer Elemente",
  description: "Nehmen Sie Kontakt mit Seehafer Elemente auf.",
};

export default function KontaktPage() {
  return (
    <>
      <AOSInit />
      <Cursor />
      <Navbar />
      <main>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
