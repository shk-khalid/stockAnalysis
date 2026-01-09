import { Eye, Bell, LineChart, TrendingUp, PieChart, Shield } from 'lucide-react';

const features = [
    {
        icon: <Eye className="w-8 h-8" />,
        title: 'Smart Watchlist',
        description: 'Build and manage your personalized watchlist with real-time price updates and instant notifications.',
    },
    {
        icon: <Bell className="w-8 h-8" />,
        title: 'Intelligent Alerts',
        description: 'Set custom price alerts and get notified instantly when your target prices are reached.',
    },
    {
        icon: <LineChart className="w-8 h-8" />,
        title: 'Advanced Analytics',
        description: 'Leverage AI-powered analytics to understand market trends and make informed decisions.',
    },
    {
        icon: <TrendingUp className="w-8 h-8" />,
        title: 'Market Insights',
        description: 'Get daily market summaries, top movers, and sector performance at a glance.',
    },
    {
        icon: <PieChart className="w-8 h-8" />,
        title: 'Portfolio Tracking',
        description: 'Track your entire portfolio performance with detailed breakdowns and profit/loss analysis.',
    },
    {
        icon: <Shield className="w-8 h-8" />,
        title: 'Secure & Private',
        description: 'Your data is encrypted and protected. We never share your information with third parties.',
    },
];

export function Features() {
    return (
        <section id="features" className="bg-black py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Everything you need to{' '}
                        <span className="text-[#c4ff00]">master the market</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Professional-grade tools designed for both beginners and experienced traders.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-transparent hover:border-[#c4ff00]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#c4ff00]/5"
                        >
                            <div className="text-[#c4ff00] mb-4 transform group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-white text-xl font-semibold mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
