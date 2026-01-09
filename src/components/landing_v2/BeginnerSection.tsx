import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const reasons = [
    {
        number: '1',
        title: 'Explore without risk',
        description: 'Learn about stock markets and portfolio management with real data. Perfect for understanding market dynamics.',
    },
    {
        number: '2',
        title: 'Real market data',
        description: 'See actual stock prices, trends, and market movements. Understand how professional trading platforms work.',
    },
    {
        number: '3',
        title: 'AI-powered insights',
        description: 'Experience how AI can analyze markets and provide recommendations. Learn about sentiment analysis and predictions.',
    },
    {
        number: '4',
        title: 'Modern tech showcase',
        description: 'See a real-world implementation of React, TypeScript, Supabase, and AI APIs working together.',
    },
];

const features = [
    'Create and manage watchlists',
    'Real-time price tracking',
    'AI-generated market analysis',
    'Beautiful data visualizations',
    'Mobile-friendly responsive design',
    'Open source codebase',
];

export function BeginnerSection() {
    return (
        <section className="bg-gradient-to-b from-black via-gray-900/30 to-black py-20 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Badge */}
                <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c4ff00]/30 bg-[#c4ff00]/10 text-[#c4ff00] text-sm">
                        <span className="w-2 h-2 bg-[#c4ff00] rounded-full"></span>
                        Open Source
                    </span>
                </div>

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Perfect for exploring
                        <br />
                        stock market analytics
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Start your journey in understanding financial markets with a safe,
                        educational platform. Learn market mechanics - and build confidence
                        in reading market data.
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left - Reasons */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6">
                            Why explore SStockSense
                        </h3>

                        <div className="space-y-6">
                            {reasons.map((reason, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#c4ff00]/10 border border-[#c4ff00]/30 flex items-center justify-center text-[#c4ff00] text-sm font-medium">
                                        {reason.number}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">{reason.title}</h4>
                                        <p className="text-gray-400 text-sm">{reason.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link to="/register" className="inline-block mt-8">
                            <button className="group flex items-center gap-3 border-2 border-[#c4ff00] text-[#c4ff00] hover:bg-[#c4ff00] hover:text-black px-6 py-3 rounded-full font-medium transition-all duration-300">
                                Start exploring free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    {/* Right - Features Box */}
                    <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6">
                        <h3 className="text-white text-lg font-semibold mb-6">
                            What you can explore
                        </h3>

                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#c4ff00]/10 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-[#c4ff00]" />
                                    </div>
                                    <span className="text-gray-300 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 rounded-lg bg-[#c4ff00]/5 border border-[#c4ff00]/20">
                            <p className="text-gray-300 text-sm">
                                <span className="text-[#c4ff00] font-medium">Portfolio Project:</span> This is a demonstration
                                of full-stack development skills. Explore the codebase on GitHub to see the implementation
                                details and learn from the architecture.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
