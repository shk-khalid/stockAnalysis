import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    return (
        <section className="min-h-screen bg-black pt-24 pb-16 px-6 md:px-12 flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            The smartest
                            <br />
                            stock analytics
                            <br />
                            platform
                        </h1>

                        <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
                            Experience real-time market insights, intelligent alerts, and
                            professional-grade analytics.{' '}
                            <span className="text-[#c4ff00]">
                                Track 3000+ stocks with AI-powered recommendations
                            </span>
                            , all in one platform.
                            A portfolio project showcasing modern web development.
                        </p>

                        <Link to="/register">
                            <button className="group flex items-center gap-3 border-2 border-[#c4ff00] text-[#c4ff00] hover:bg-[#c4ff00] hover:text-black px-8 py-4 rounded-full font-medium text-lg transition-all duration-300">
                                Get started, it's free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    {/* Right Content - App Screenshot */}
                    <div className="relative">
                        <div className="relative z-10">
                            {/* Browser Window Mockup */}
                            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl shadow-[#c4ff00]/10 border border-gray-800">
                                {/* Browser Header */}
                                <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0d0d] border-b border-gray-800">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="flex-1 mx-4">
                                        <div className="bg-[#1a1a1a] rounded-md px-3 py-1 text-gray-500 text-xs text-center">
                                            sstocksense.app
                                        </div>
                                    </div>
                                </div>

                                {/* App Content */}
                                <div className="p-4 space-y-4">
                                    {/* Sidebar + Main Content Layout */}
                                    <div className="flex gap-4">
                                        {/* Sidebar */}
                                        <div className="w-40 space-y-3">
                                            <div className="bg-[#0d0d0d] rounded-lg p-3">
                                                <div className="text-[#c4ff00] text-xs font-medium mb-2">Dashboard</div>
                                                <div className="text-gray-400 text-xs">Watchlist</div>
                                            </div>
                                            <div className="space-y-2 text-gray-500 text-xs">
                                                <div className="flex items-center gap-2 px-3 py-2 hover:bg-[#0d0d0d] rounded">
                                                    <span>📊</span> Analytics
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-2 hover:bg-[#0d0d0d] rounded">
                                                    <span>🔔</span> Alerts
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-2 hover:bg-[#0d0d0d] rounded">
                                                    <span>⚙️</span> Settings
                                                </div>
                                            </div>
                                        </div>

                                        {/* Main Content */}
                                        <div className="flex-1 space-y-3">
                                            {/* Stock Summary */}
                                            <div className="bg-[#0d0d0d] rounded-lg p-3">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-white text-sm font-medium">Portfolio Summary</span>
                                                    <span className="text-[#c4ff00] text-xs">+5.42%</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    <div>
                                                        <div className="text-gray-500">Total Value</div>
                                                        <div className="text-white">$124,500</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-500">Day Gain</div>
                                                        <div className="text-[#c4ff00]">+$2,340</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-500">Stocks</div>
                                                        <div className="text-white">12</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stock Table */}
                                            <div className="bg-[#0d0d0d] rounded-lg p-3">
                                                <div className="text-gray-400 text-xs mb-2">Top Movers</div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-white">AAPL</span>
                                                        <span className="text-gray-400">$185.92</span>
                                                        <span className="text-[#c4ff00]">+2.34%</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-white">GOOGL</span>
                                                        <span className="text-gray-400">$141.80</span>
                                                        <span className="text-[#c4ff00]">+1.87%</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-white">TSLA</span>
                                                        <span className="text-gray-400">$248.50</span>
                                                        <span className="text-red-400">-0.92%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Panel */}
                                        <div className="w-36 space-y-3">
                                            <div className="bg-[#0d0d0d] rounded-lg p-3">
                                                <div className="text-[#c4ff00] text-xs font-medium mb-2">AI Insights</div>
                                                <div className="space-y-2">
                                                    <div className="text-gray-400 text-xs">
                                                        Market sentiment is bullish today. Tech sector showing strong momentum.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-[#0d0d0d] rounded-lg p-3">
                                                <div className="text-gray-400 text-xs mb-2">Alerts</div>
                                                <div className="text-[#c4ff00] text-xs">3 Active</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c4ff00]/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#c4ff00]/5 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
