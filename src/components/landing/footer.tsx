import React, { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the newsletter subscription here
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-rich-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-mikado-yellow bg-clip-text text-transparent">
            Stay Updated with SStockSense
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-oxford-blue text-white px-4 py-2 rounded-lg sm:rounded-l-lg sm:rounded-r-none flex-1 focus:outline-none focus:ring-2 focus:ring-mikado-yellow"
              required
            />
            <button 
              type="submit"
              className="bg-mikado-yellow hover:bg-gold text-rich-black px-6 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg transition-colors hover:shadow-lg hover:shadow-mikado-yellow/20"
            >
              Subscribe
            </button>
          </form>
          <p className="text-gray-400 mt-4 text-sm">
            Join our newsletter for the latest updates and market insights.
          </p>
        </div>
      </div>
    </footer>
  );
}