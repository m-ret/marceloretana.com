import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { CostaRicaLanes } from "@/components/sections/costa-rica-lanes";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CostaRicaLanes />
      <Testimonials />
      <About />
      <Experience />
      <SelectedWork />
      <Contact />
    </main>
  );
}
