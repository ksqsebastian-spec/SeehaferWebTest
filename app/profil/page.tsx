import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Profil | Seehafer Elemente",
  description: "Über Seehafer Elemente – Handwerk und Naturstein aus Leidenschaft.",
};

export default function ProfilPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Profile />
      </main>
      <Footer />
    </>
  );
}
