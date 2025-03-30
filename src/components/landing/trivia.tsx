import { useState, useEffect } from 'react';
import { CircleDollarSign, TrendingUp, LineChart, Landmark, DollarSign, PieChart, Clock, Award } from 'lucide-react';

const triviaItems = [
  {
    icon: <Landmark className="w-8 h-8 text-mikado-yellow" />,
    fact: "The NYSE was founded in 1792 under a buttonwood tree on Wall Street."
  },
  {
    icon: <Award className="w-8 h-8 text-mikado-yellow" />,
    fact: "The term 'Blue Chip' comes from poker, where blue chips have the highest value."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-mikado-yellow" />,
    fact: "The first electronic stock market was NASDAQ, launched in 1971."
  },
  {
    icon: <DollarSign className="w-8 h-8 text-mikado-yellow" />,
    fact: "The largest IPO in history was Alibaba Group, raising $25 billion in 2014."
  },
  {
    icon: <PieChart className="w-8 h-8 text-mikado-yellow" />,
    fact: "The S&P 500 index was introduced in 1957, replacing the S&P 90."
  },
  {
    icon: <Clock className="w-8 h-8 text-mikado-yellow" />,
    fact: "The shortest trading day in NYSE history was 33 minutes on September 11, 2001."
  },
  {
    icon: <LineChart className="w-8 h-8 text-mikado-yellow" />,
    fact: "The term 'Wall Street' originated from a wall built in 1653 to protect New Amsterdam."
  },
  {
    icon: <CircleDollarSign className="w-8 h-8 text-mikado-yellow" />,
    fact: "The first stock ticker was invented by Edward Calahan in 1867."
  }
];

const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

export function Trivia() {
  const getRandomTriviaIndex = () => Math.floor(Math.random() * triviaItems.length);

  const [triviaIndex, setTriviaIndex] = useState(() => {
    const savedIndex = localStorage.getItem('triviaIndex');
    const lastUpdate = localStorage.getItem('triviaLastUpdate');

    if (savedIndex && lastUpdate) {
      const timePassed = Date.now() - parseInt(lastUpdate, 10);
      if (timePassed < ONE_HOUR) {
        return parseInt(savedIndex, 10);
      }
    }
    return getRandomTriviaIndex();
  });

  useEffect(() => {
    const updateTrivia = () => {
      const newIndex = getRandomTriviaIndex();
      setTriviaIndex(newIndex);
      localStorage.setItem('triviaIndex', newIndex.toString());
      localStorage.setItem('triviaLastUpdate', Date.now().toString());
    };

    if (!localStorage.getItem('triviaLastUpdate')) {
      updateTrivia();
    }

    const checkAndUpdateTrivia = () => {
      const lastUpdate = parseInt(localStorage.getItem('triviaLastUpdate') || '0', 10);
      const timePassed = Date.now() - lastUpdate;

      if (timePassed >= ONE_HOUR) {
        updateTrivia();
      }
    };

    const interval = setInterval(checkAndUpdateTrivia, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const currentTrivia = triviaItems[triviaIndex];

  return (
    <section className="py-20 bg-rich-black relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-white to-mikado-yellow bg-clip-text text-transparent">
            Market Trivia
          </span>
        </h2>
        <div className="max-w-2xl mx-auto">
          <div
            className="bg-oxford-blue p-8 rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-mikado-yellow/20"
          >
            <div className="mb-6 transform hover:rotate-12 transition-transform flex justify-center">
              {currentTrivia.icon}
            </div>
            <p className="text-gray-300 text-center text-lg">{currentTrivia.fact}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
