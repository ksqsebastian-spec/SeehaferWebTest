import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Profil | Seehafer Elemente",
  description: "Über Seehafer Elemente – Handwerk und Naturstein aus Leidenschaft.",
};

export default function ProfilPage() {
  return (
    <>
      <Navbar />
      <main>
        <Profile />
      </main>
      <Footer />
    </>
  );
}
