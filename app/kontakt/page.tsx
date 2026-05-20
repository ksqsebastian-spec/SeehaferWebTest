import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Kontakt | Seehafer Elemente",
  description: "Nehmen Sie Kontakt mit Seehafer Elemente auf.",
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main>
        <Contact />
      </main>
    </>
  );
}
