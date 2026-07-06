import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { CohortOffer } from "@/components/sections/CohortOffer";
import { SocialProof } from "@/components/sections/SocialProof";
import { About } from "@/components/sections/About";
import { CEODay } from "@/components/sections/CEODay";
import { WhoShouldJoin } from "@/components/sections/WhoShouldJoin";
import { Curriculum } from "@/components/sections/Curriculum";
import { Comparison } from "@/components/sections/Comparison";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CohortOffer />
        <SocialProof />
        <CEODay />
        <Curriculum />
        <WhoShouldJoin />
        <Comparison />
        <Testimonials />
        <About />
      </main>
      <Footer />
    </>
  );
}
