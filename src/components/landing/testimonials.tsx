
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Day Trader",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "The real-time alerts have completely transformed how I trade. I never miss an opportunity now."
  },
  {
    name: "Michael Chen",
    role: "Investment Analyst",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "The platform's analytics tools are incredibly powerful yet easy to use. A game-changer for my work."
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-yale-blue relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rich-black/20" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-white to-mikado-yellow bg-clip-text text-transparent">
            What Our Users Say
          </span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-oxford-blue p-8 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-mikado-yellow/20"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4 ring-2 ring-mikado-yellow"
                />
                <div>
                  <h4 className="font-bold text-mikado-yellow">{testimonial.name}</h4>
                  <p className="text-gray-300">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}