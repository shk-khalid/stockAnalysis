import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'What is SStockSense?',
        answer: 'SStockSense is a portfolio project demonstrating modern web development with React, TypeScript, and AI integration. It provides real-time stock market data, portfolio tracking, and AI-powered insights to help users understand market analytics.',
    },
    {
        question: 'Is this a real trading platform?',
        answer: 'No, SStockSense is a demonstration/portfolio project and not a real trading platform. It showcases how to build a financial analytics application with real market data integration. No actual trading functionality is provided.',
    },
    {
        question: 'Where does the stock data come from?',
        answer: 'Stock data is fetched from Alpha Vantage API, which provides real-time and historical market data. The platform also integrates with news APIs and uses OpenAI for generating AI-powered market insights and analysis.',
    },
    {
        question: 'Is this project open source?',
        answer: 'Yes! This is a portfolio project and the codebase is available for viewing. It demonstrates full-stack development skills including React, TypeScript, Tailwind CSS, Supabase for backend services, and integration with multiple APIs.',
    },
    {
        question: 'What technologies are used?',
        answer: 'The frontend is built with React, TypeScript, and Tailwind CSS. The backend uses Supabase for authentication, database, and edge functions. External integrations include Alpha Vantage for stock data and OpenAI for AI-powered analysis.',
    },
    {
        question: 'Can I use this for learning?',
        answer: 'Absolutely! This project is perfect for learning about building financial applications, working with real-time APIs, implementing authentication, and integrating AI capabilities into web applications.',
    },
    {
        question: 'Is there a cost to use the platform?',
        answer: 'No, the platform is completely free to explore. It\'s a portfolio demonstration project, so there are no fees or subscriptions. You can create an account and explore all features at no cost.',
    },
    {
        question: 'How accurate is the AI analysis?',
        answer: 'The AI analysis is powered by OpenAI and provides general market insights based on available data. It\'s meant for educational and demonstration purposes only and should not be used as financial advice for real investment decisions.',
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-black py-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Everything you need to know about SStockSense
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left bg-gray-900/30 hover:bg-gray-900/50 transition-colors"
                            >
                                <span className="text-white font-medium pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-[#c4ff00] flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center">
                    <p className="text-gray-400 mb-4">
                        Still have questions?
                    </p>
                    <a
                        href="mailto:hello@example.com"
                        className="inline-flex items-center gap-2 text-[#c4ff00] hover:underline font-medium"
                    >
                        Get in touch →
                    </a>
                </div>
            </div>
        </section>
    );
}
