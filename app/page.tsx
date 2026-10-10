import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Marquee } from "@/components/sections/Marquee";
import { Projects } from "@/components/sections/Projects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
