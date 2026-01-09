import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <footer className="bg-black border-t border-gray-800 py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-8 h-8 text-[#c4ff00]" />
                            <span className="text-white text-xl font-bold">SStockSense</span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-md">
                            A portfolio project showcasing modern web development with React,
                            TypeScript, and AI integration. Explore real stock market data
                            with professional-grade analytics.
                        </p>

                        {/* Newsletter */}
                        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#c4ff00] transition-colors"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-[#c4ff00] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d4ff33] transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Project Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Project</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#features" className="text-gray-400 hover:text-[#c4ff00] transition-colors text-sm">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c4ff00] transition-colors text-sm">
                                    View on GitHub
                                </a>
                            </li>
                            <li>
                                <a href="#tech" className="text-gray-400 hover:text-[#c4ff00] transition-colors text-sm">
                                    Tech Stack
                                </a>
                            </li>
                            <li>
                                <a href="#api" className="text-gray-400 hover:text-[#c4ff00] transition-colors text-sm">
                                    API Docs
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Developer Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Developer</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#about" className="text-gray-400 hover:text-[#c4ff00] transition-colors text-sm">
                                    About Me
                                </a>
                            </li>
                            <li>
                                <a href="#portfolio" className="text-gray-400 hover:text-[#c4ff00] transition-colors text-sm">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-gray-400 hover:text-[#c4ff00] transition-colors text-sm">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#hire" className="text-gray-400 hover:text-[#c4ff00] transition-colors text-sm">
                                    Hire Me
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} SStockSense. A portfolio project. Built with ❤️
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c4ff00] transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c4ff00] transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="mailto:hello@example.com" className="text-gray-400 hover:text-[#c4ff00] transition-colors">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
