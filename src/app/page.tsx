import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Social } from "@/components/Social";
import { Journal } from "@/components/Journal";
import { Consultations } from "@/components/Consultations";
import { Partnerships } from "@/components/Partnerships";
import { MediaKit } from "@/components/MediaKit";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { site } from "@/content/profile";

export default function Page() {
  return (
    <>
      <Header name={site.name} />
      <main>
        <Hero />
        <About />
        <Social />
        <Journal />
        <Consultations />
        <Partnerships />
        <MediaKit />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
