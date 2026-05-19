import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Kontakt | Seehafer Elemente",
  description: "Nehmen Sie Kontakt mit Seehafer Elemente auf.",
};

export default function KontaktPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Contact />
      </main>
    </>
  );
}
