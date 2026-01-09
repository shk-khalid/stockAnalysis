import { Link } from 'react-router-dom';

const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBklEQVR4nO3aXU7CQBRA4b4ayg58lcXjzxqM9MHNkIgbuKbEqFEJAabcM9Nzkj4qTD+nY+B2nU1aDH38vKZ9NTuaILAEgSUILEFgCQJLEFiCJBSvN7exWdzHZvH+G+Dotf+ZxVO8LFcZ771VjO3JEH9htuPvyl5P9cW4My7F+L7W2eupvjjnMXV4l+yy11N9UW53+FlXiQSBJQgsQWAJAksQWILAEgSWILAEgSUILEFgCQKrWRDsGzuSILAEgSUILEFgZ5cghROkNZBN0SGHt45StSDD4rEgyMM0q6xowi8uBXlZrooNyj0v70qurcoJvyiwM/drG/r1OFd1xnp24864KgZ5wi+SHpXpUSf8YrYg5XZHnHrjMs8uLHgWSCSfXYLAzi5BYGeXIKCz67/X77q5nyGDIKgbE8kg2ASBJQgsQWAJAksQWILAEgSWILAEgSUILEEKVeqzHEEKJUjfKEjShF+09mlvuR2SM+EXgrAm/EIQ1oRfCMIqWptOxx1qc5hOJ0ylTwUftU2nZ0/2XWMnRk3T6dmTfa08GouVPdn39T4EKXMjSt3ILJCg/SEI0gtCKgRhFYKwCkFYhSBWxX9Z9pkgsASBJQgsQWAJAksQWILAEgSWILAEgSUILEFgNTfZV3tVTva1XHWTfXOoqsk+M7PD+RUtLEFgCQJLEFiCwBKku2ofvNIIiVfZgPAAAAAASUVORK5CYII=";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-black/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={LOGO_SRC} alt="SStockSense" className="w-8 h-8 transform group-hover:rotate-12 transition-transform" />
                    <span className="text-white text-xl font-bold">SStockSense</span>
                </Link>

                {/* Navigation Links - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm">
                        Features
                    </a>
                    <a href="#watchlist" className="text-gray-300 hover:text-white transition-colors text-sm">
                        Watchlist
                    </a>
                    <a href="#analytics" className="text-gray-300 hover:text-white transition-colors text-sm">
                        Analytics
                    </a>
                    <a href="#api" className="text-gray-300 hover:text-white transition-colors text-sm">
                        API
                    </a>
                    <a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm">
                        Pricing
                    </a>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="text-[#c4ff00] hover:text-white transition-colors text-sm font-medium"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-transparent border border-[#c4ff00] text-[#c4ff00] hover:bg-[#c4ff00] hover:text-black px-4 py-2 rounded-full text-sm font-medium transition-all"
                    >
                        Get started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
