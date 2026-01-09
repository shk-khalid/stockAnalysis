import { Zap, Clock, Layers, AlertTriangle, DollarSign, PieChart } from 'lucide-react';

const features = [
    {
        icon: <Zap className="w-6 h-6" />,
        title: 'Real-Time Data Engine',
        description: 'Live stock prices with instant updates. Track market movements as they happen with our real-time data integration.',
        link: 'Powered by Alpha Vantage',
    },
    {
        icon: <Clock className="w-6 h-6" />,
        title: 'Smart Watchlist',
        description: 'Create and manage personalized watchlists. Get instant notifications when your tracked stocks hit target prices.',
    },
    {
        icon: <Layers className="w-6 h-6" />,
        title: 'Portfolio Analytics',
        description: 'Comprehensive portfolio tracking with profit/loss analysis, sector allocation, and performance metrics.',
    },
    {
        icon: <AlertTriangle className="w-6 h-6" />,
        title: 'AI-Powered Alerts',
        description: 'Intelligent price alerts and market notifications. Never miss important market movements or trading opportunities.',
    },
    {
        icon: <DollarSign className="w-6 h-6" />,
        title: 'Market Insights',
        description: 'Daily market summaries with top gainers, losers, and trending stocks. AI-generated analysis and recommendations.',
        link: 'Learn more',
    },
    {
        icon: <PieChart className="w-6 h-6" />,
        title: 'Visual Analytics',
        description: 'Beautiful charts and visualizations. Track your investment journey with interactive graphs and sector breakdowns.',
    },
];

export function FeaturesGrid() {
    return (
        <section id="features" className="py-20 px-6 md:px-12 bg-gradient-to-b from-black via-[#1a1a0a] to-black">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Built for smart investing
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Every feature designed to give you the edge in understanding markets.
                        Experience professional-grade analytics without the complexity.
                        <span className="text-[#c4ff00]"> Perfect for learning and exploring.</span>
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-xl border border-gray-800 bg-black/50 hover:border-[#c4ff00]/30 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-lg border border-[#c4ff00]/30 flex items-center justify-center mb-4 text-[#c4ff00] group-hover:bg-[#c4ff00]/10 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-white text-lg font-semibold mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-3">
                                {feature.description}
                            </p>
                            {feature.link && (
                                <a href="#" className="text-[#c4ff00] text-sm hover:underline">
                                    {feature.link}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
