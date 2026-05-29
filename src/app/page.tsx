import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SelectedWorks from "@/components/sections/SelectedWorks";
import TechOrbit from "@/components/sections/TechOrbit";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <About />
      <TechOrbit />
      <ExperienceTimeline />
      <Footer />
    </>
  );
}
