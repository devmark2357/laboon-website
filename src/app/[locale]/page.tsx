import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Trailer } from '@/components/Trailer';
import { About } from '@/components/About';
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
        <CTA />
        <Footer />
      </main>
    </>
  );
}
