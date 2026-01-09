export function Comparison() {
    return (
        <section className="bg-black py-20 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        The hidden cost of poor analytics
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                        When you invest without proper data, the results can be disappointing.
                        Strategies that seemed promising fail because they weren't backed by
                        real market insights and comprehensive analysis.
                    </p>
                </div>

                {/* Comparison Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Basic Tracking */}
                    <div className="rounded-xl border border-gray-800 overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">Basic Portfolio Tracking</h3>
                            <p className="text-gray-500 text-sm mb-6">What most apps show you</p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                                    <span className="text-gray-300">Portfolio Value</span>
                                    <span className="text-green-500">✓ $45,230</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                                    <span className="text-gray-300">Daily Change</span>
                                    <span className="text-green-500">✓ +2.3%</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                                    <span className="text-gray-300">Stock Prices</span>
                                    <span className="text-green-500">✓ Delayed 15min</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                                <div className="text-green-500 text-2xl font-bold">Limited</div>
                                <div className="text-gray-400 text-sm">Insights Available</div>
                            </div>

                            <div className="mt-4 space-y-2 text-sm text-gray-500">
                                <div className="flex justify-between">
                                    <span>Market Analysis:</span>
                                    <span className="text-green-500">None</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>AI Recommendations:</span>
                                    <span className="text-green-500">None</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Risk Assessment:</span>
                                    <span className="text-green-500">None</span>
                                </div>
                            </div>

                            <p className="text-green-500 text-center mt-6 text-sm italic">
                                "I guess my portfolio is doing okay?"
                            </p>
                        </div>
                    </div>

                    {/* SStockSense */}
                    <div className="rounded-xl border border-[#c4ff00]/30 overflow-hidden bg-gradient-to-b from-[#c4ff00]/5 to-transparent">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-[#c4ff00] mb-2">SStockSense Analytics</h3>
                            <p className="text-gray-500 text-sm mb-6">What smart investors actually need</p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                    <span className="text-gray-300">Portfolio Value</span>
                                    <span className="text-[#c4ff00]">⚡ $45,230 (Real-time)</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                    <span className="text-gray-300">AI Sentiment</span>
                                    <span className="text-[#c4ff00]">📈 Bullish (78%)</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                    <span className="text-gray-300">Risk Score</span>
                                    <span className="text-yellow-400">⚠️ Medium (6.2/10)</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-[#c4ff00]/10 rounded-lg border border-[#c4ff00]/30">
                                <div className="text-[#c4ff00] text-2xl font-bold">Complete</div>
                                <div className="text-gray-400 text-sm">Investment Intelligence</div>
                            </div>

                            <div className="mt-4 space-y-2 text-sm text-gray-500">
                                <div className="flex justify-between">
                                    <span>Market Analysis:</span>
                                    <span className="text-[#c4ff00]">AI-Powered</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>AI Recommendations:</span>
                                    <span className="text-[#c4ff00]">Real-time</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Risk Assessment:</span>
                                    <span className="text-[#c4ff00]">Comprehensive</span>
                                </div>
                            </div>

                            <p className="text-red-400 text-center mt-6 text-sm italic">
                                "Now I understand my portfolio completely!"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <p className="text-center text-gray-400 max-w-2xl mx-auto">
                    <span className="text-[#c4ff00] font-semibold">SStockSense</span> shows you what
                    professional portfolio analysis actually looks like - with AI-powered insights,
                    real-time alerts, and comprehensive market data that basic apps ignore.
                </p>
            </div>
        </section>
    );
}
