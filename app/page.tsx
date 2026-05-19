import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}
