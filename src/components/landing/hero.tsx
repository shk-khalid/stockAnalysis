import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-rich-black via-oxford-blue to-yale-blue overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-mikado-yellow bg-clip-text text-transparent">
            SStockSense
            <span className="text-mikado-yellow">.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
            Stay ahead of the market with real-time stock alerts and professional-grade analytics
          </p>
          <Link to="/register">
            <button className="bg-mikado-yellow hover:bg-gold text-rich-black px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-mikado-yellow/20">
              Get Started Free
              <ArrowRight className="inline ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}