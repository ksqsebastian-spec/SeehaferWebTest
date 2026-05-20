import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContactFunnel from "@/components/ContactFunnel";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
      <ContactFunnel />
    </>
  );
}
