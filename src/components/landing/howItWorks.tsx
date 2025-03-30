import { useState } from 'react';
import { UserPlus, BarChart3, Bell, LineChart, ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="w-12 h-12 text-mikado-yellow" />,
    title: "Sign Up",
    description: "Create your account in seconds and get started monitoring stocks."
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-mikado-yellow" />,
    title: "Add Stocks",
    description: "Build your personalized watchlist with your favorite stocks."
  },
  {
    icon: <Bell className="w-12 h-12 text-mikado-yellow" />,
    title: "Set Alerts",
    description: "Configure custom alerts for price movements and market events."
  },
  {
    icon: <LineChart className="w-12 h-12 text-mikado-yellow" />,
    title: "Track Progress",
    description: "Monitor your portfolio's performance with real-time updates."
  }
];

export function HowItWorks() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % steps.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className="py-20 bg-oxford-blue relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rich-black/20" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-white to-mikado-yellow bg-clip-text text-transparent">
            How It Works
          </span>
        </h2>
        <div className="relative">
          <div className="flex items-center justify-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 p-3 bg-yale-blue rounded-full hover:bg-mikado-yellow transition-colors hover:shadow-lg hover:shadow-mikado-yellow/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center justify-center">
              {steps[currentSlide] && (
                <div className="text-center px-4 max-w-md transform transition-all duration-500 ease-in-out">
                  <div className="flex justify-center mb-6 transform hover:scale-110 transition-transform">
                    {steps[currentSlide].icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{steps[currentSlide].title}</h3>
                  <p className="text-gray-300">{steps[currentSlide].description}</p>
                </div>
              )}
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 p-3 bg-yale-blue rounded-full hover:bg-mikado-yellow transition-colors hover:shadow-lg hover:shadow-mikado-yellow/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-mikado-yellow w-8' : 'bg-yale-blue w-2 hover:bg-mikado-yellow/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}