import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Trailer } from '@/components/Trailer';
import { About } from '@/components/About';
import { HowItWorks } from '@/components/HowItWorks';
import { Roadmap } from '@/components/Roadmap';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Trailer />
        <About />
        <HowItWorks />
        <Roadmap />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
