import { Check } from 'lucide-react';

const dataSources = [
    'Alpha Vantage',
    'Yahoo Finance',
    'Real-time Quotes',
    'Historical Data',
    'News API',
    'Market Indices',
    'S&P 500',
    'NASDAQ',
    'Dow Jones',
    'Sector ETFs',
    'Top Gainers',
    'Top Losers',
    'Most Active',
    'Trending',
];

const benefits = [
    {
        title: 'Comprehensive Coverage',
        description: 'Access data for 3000+ stocks across major exchanges including NYSE and NASDAQ.',
    },
    {
        title: 'Real-Time Updates',
        description: 'Live price feeds with minimal latency. Stay ahead with instant market data.',
    },
    {
        title: 'Historical Analysis',
        description: 'Years of historical data for backtesting strategies and understanding trends.',
    },
    {
        title: 'Market Insights',
        description: 'AI-powered analysis combining multiple data sources for smarter decisions.',
    },
];

export function DataSources() {
    return (
        <section className="bg-black py-20 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Badge */}
                <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c4ff00]/30 bg-[#c4ff00]/10 text-[#c4ff00] text-sm">
                        <span className="w-2 h-2 bg-[#c4ff00] rounded-full"></span>
                        Portfolio Project
                    </span>
                </div>

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Explore real market data
                        <br />
                        <span className="text-[#c4ff00]">in one place</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        This portfolio project demonstrates how to integrate and visualize
                        real market data from multiple sources. Perfect for learning
                        about financial APIs and data visualization.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Left - Data Sources Preview */}
                    <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6">
                        <h3 className="text-white font-semibold mb-6">Available Data Sources</h3>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-gray-800">
                                <div>
                                    <span className="text-white font-medium">Alpha Vantage</span>
                                    <span className="text-gray-500 text-sm ml-2">Primary API</span>
                                </div>
                                <span className="text-[#c4ff00] text-sm">Real-time + Historical</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-gray-800">
                                <div>
                                    <span className="text-white font-medium">News API</span>
                                    <span className="text-gray-500 text-sm ml-2">Market news</span>
                                </div>
                                <span className="text-[#c4ff00] text-sm">Latest headlines</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-gray-800">
                                <div>
                                    <span className="text-white font-medium">AI Analysis</span>
                                    <span className="text-gray-500 text-sm ml-2">Sentiment</span>
                                </div>
                                <span className="text-[#c4ff00] text-sm">OpenAI powered</span>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm mt-4 italic">
                            Built with modern web technologies and real financial APIs
                        </p>
                    </div>

                    {/* Right - Benefits */}
                    <div className="space-y-6">
                        <h3 className="text-white font-semibold text-lg">Why this project matters</h3>

                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#c4ff00]/10 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-[#c4ff00]" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">{benefit.title}</h4>
                                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Sources Grid */}
                <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6">
                    <h3 className="text-white font-semibold text-center mb-6">Integrated data & features</h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {dataSources.map((source, index) => (
                            <div
                                key={index}
                                className="px-4 py-3 rounded-lg border border-gray-700 bg-black/50 text-center text-gray-300 text-sm hover:border-[#c4ff00]/30 transition-colors"
                            >
                                {source}
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        A demonstration of full-stack development with financial data integration.
                        <br />
                        <span className="text-[#c4ff00]">More features coming soon</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
