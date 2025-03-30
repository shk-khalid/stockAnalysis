import { Hero } from '../components/landing/hero';
import { HowItWorks } from '../components/landing/howItWorks';
import { Trivia } from '../components/landing/trivia';
import { Testimonials } from '../components/landing/testimonials';
import { Footer } from '../components/landing/footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-rich-black text-white">
      <Hero />
      <HowItWorks />
      <Trivia />
      <Testimonials />
      <Footer />
    </div>
  );
}