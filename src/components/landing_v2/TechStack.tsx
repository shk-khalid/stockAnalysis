export function TechStack() {
    return (
        <section className="bg-black py-20 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Badge */}
                <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c4ff00]/30 bg-[#c4ff00]/10 text-[#c4ff00] text-sm">
                        <span className="w-2 h-2 bg-[#c4ff00] rounded-full"></span>
                        Technical Implementation
                    </span>
                </div>

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Advanced features built with
                        <br />
                        <span className="text-[#c4ff00]">modern tech stack</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        This portfolio project showcases professional development practices
                        and tools. Perfect for demonstrating full-stack capabilities to
                        <span className="text-[#c4ff00]"> potential employers</span>.
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Frontend Stack */}
                    <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6">
                        <h3 className="text-white text-xl font-semibold mb-4">Frontend Stack</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Modern React application with TypeScript for type safety and better development experience.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-black/50 border border-gray-700">
                                <span className="text-[#c4ff00] font-mono text-sm">REACT</span>
                                <span className="text-gray-400 text-sm">Component-based UI architecture</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-black/50 border border-gray-700">
                                <span className="text-blue-400 font-mono text-sm">TS</span>
                                <span className="text-gray-400 text-sm">TypeScript for type safety</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-black/50 border border-gray-700">
                                <span className="text-cyan-400 font-mono text-sm">TAILWIND</span>
                                <span className="text-gray-400 text-sm">Utility-first CSS framework</span>
                            </div>
                        </div>
                    </div>

                    {/* Backend & APIs */}
                    <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6">
                        <h3 className="text-white text-xl font-semibold mb-4">Backend & APIs</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Serverless architecture with edge functions and real-time database capabilities.
                        </p>

                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-gray-300">
                                <span className="text-[#c4ff00]">•</span>
                                <div>
                                    <span className="text-white font-medium">Supabase</span>
                                    <span className="text-gray-400"> - Auth, Database & Edge Functions</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <span className="text-[#c4ff00]">•</span>
                                <div>
                                    <span className="text-white font-medium">Alpha Vantage API</span>
                                    <span className="text-gray-400"> - Real-time market data</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <span className="text-[#c4ff00]">•</span>
                                <div>
                                    <span className="text-white font-medium">OpenAI API</span>
                                    <span className="text-gray-400"> - AI-powered analysis & insights</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <span className="text-[#c4ff00]">•</span>
                                <div>
                                    <span className="text-white font-medium">Vite</span>
                                    <span className="text-gray-400"> - Fast build tool & dev server</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Code Preview */}
                <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6">
                    <h3 className="text-white font-semibold text-center mb-6">See it in action</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Code Block 1 */}
                        <div className="rounded-lg bg-black border border-gray-700 overflow-hidden">
                            <div className="px-4 py-2 border-b border-gray-700">
                                <span className="text-gray-400 text-sm">Real-time Stock Data</span>
                            </div>
                            <div className="p-4 font-mono text-sm">
                                <div className="text-gray-500">// Fetch live stock data</div>
                                <div className="mt-2">
                                    <span className="text-purple-400">const</span>
                                    <span className="text-white"> stockData </span>
                                    <span className="text-gray-400">= </span>
                                    <span className="text-yellow-400">await </span>
                                    <span className="text-blue-400">getStockQuote</span>
                                    <span className="text-gray-400">(</span>
                                    <span className="text-green-400">'AAPL'</span>
                                    <span className="text-gray-400">);</span>
                                </div>
                                <div className="mt-1 text-gray-500">
                                    {'// => { price: 185.92, change: +2.34% }'}
                                </div>
                                <div className="mt-4 text-[#c4ff00]">✓ Data fetched successfully</div>
                            </div>
                        </div>

                        {/* Code Block 2 */}
                        <div className="rounded-lg bg-black border border-gray-700 overflow-hidden">
                            <div className="px-4 py-2 border-b border-gray-700">
                                <span className="text-gray-400 text-sm">AI Analysis Integration</span>
                            </div>
                            <div className="p-4 font-mono text-sm">
                                <div className="text-gray-500">// Get AI-powered insights</div>
                                <div className="mt-2">
                                    <span className="text-purple-400">const</span>
                                    <span className="text-white"> analysis </span>
                                    <span className="text-gray-400">= </span>
                                    <span className="text-yellow-400">await </span>
                                    <span className="text-blue-400">analyzeStock</span>
                                    <span className="text-gray-400">({'{'}</span>
                                </div>
                                <div className="ml-4">
                                    <span className="text-cyan-400">symbol</span>
                                    <span className="text-gray-400">: </span>
                                    <span className="text-green-400">'AAPL'</span>
                                    <span className="text-gray-400">,</span>
                                </div>
                                <div className="ml-4">
                                    <span className="text-cyan-400">includeNews</span>
                                    <span className="text-gray-400">: </span>
                                    <span className="text-orange-400">true</span>
                                </div>
                                <div className="text-gray-400">{'}'});</div>
                                <div className="mt-2 text-[#c4ff00]">✓ Analysis complete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
