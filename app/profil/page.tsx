import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import AOSInit from "@/components/AOSInit";

export const metadata = {
  title: "Profil | Seehafer Elemente",
  description: "Über Seehafer Elemente – Handwerk und Naturstein aus Leidenschaft.",
};

export default function ProfilPage() {
  return (
    <>
      <AOSInit />
      <Cursor />
      <Navbar />
      <main>
        <Profile />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
