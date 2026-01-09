import { Zap, BarChart3, Globe, Shield } from 'lucide-react';

const stats = [
    {
        icon: <Zap className="w-5 h-5" />,
        value: '< 1s',
        label: 'Real-time Updates',
    },
    {
        icon: <BarChart3 className="w-5 h-5" />,
        value: 'AI-Powered',
        label: 'Smart Analytics',
    },
    {
        icon: <Globe className="w-5 h-5" />,
        value: '3000+',
        label: 'Stocks Covered',
    },
    {
        icon: <Shield className="w-5 h-5" />,
        value: '$0',
        label: 'Platform Fees',
    },
];

export function Stats() {
    return (
        <section className="bg-black py-12 px-6 md:px-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center group cursor-default"
                        >
                            <div className="flex justify-center mb-3">
                                <div className="text-[#c4ff00] transform group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="text-[#c4ff00] text-2xl md:text-3xl font-bold mb-1">
                                {stat.value}
                            </div>
                            <div className="text-gray-400 text-sm">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
