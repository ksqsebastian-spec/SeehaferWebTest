import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Profile from "@/components/Profile";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import AOSInit from "@/components/AOSInit";

export default function Home() {
  return (
    <>
      <AOSInit />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Profile />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
