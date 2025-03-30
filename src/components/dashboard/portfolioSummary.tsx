import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

interface PortfolioSummaryProps {
  totalValue: number;
  totalGainLoss: number;
}

const mockPortfolioHistory = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  value: 100000 + Math.random() * 20000,
}));

const mockDividends = [
  { symbol: 'AAPL', date: '2024-03-25', amount: 0.24, yield: '0.51%' },
  { symbol: 'MSFT', date: '2024-04-08', amount: 0.75, yield: '0.82%' },
  { symbol: 'JNJ', date: '2024-03-19', amount: 1.19, yield: '2.91%' },
];

export function PortfolioSummary({ totalValue, totalGainLoss }: PortfolioSummaryProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Main Portfolio Value Card */}
      <div className="bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))] p-6">
        <h2 className="text-xl font-semibold mb-4 text-[rgb(var(--color-mikado-yellow))]">
          Portfolio Overview
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Value</p>
              <p className="text-2xl font-bold text-white">
                ${totalValue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-[rgb(var(--color-mikado-yellow))]" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Gain/Loss</p>
              <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalGainLoss >= 0 ? '+' : ''}{totalGainLoss.toLocaleString()}
              </p>
            </div>
            <TrendingUp className={`h-8 w-8 ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`} />
          </div>
        </div>
      </div>

      {/* Portfolio Chart Card */}
      <div className="lg:col-span-2 bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))] p-6">
        <h2 className="text-xl font-semibold mb-4 text-[rgb(var(--color-mikado-yellow))]">
          Portfolio Performance
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPortfolioHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-oxford-blue))" />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgb(var(--color-rich-black))',
                  border: `1px solid rgb(var(--color-yale-blue))`,
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#9ca3af' }}
                itemStyle={{ color: 'rgb(var(--color-mikado-yellow))' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="rgb(var(--color-mikado-yellow))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Dividends Card */}
      <div className="lg:col-span-3 bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[rgb(var(--color-mikado-yellow))]">
            Upcoming Dividends
          </h2>
          <Calendar className="h-6 w-6 text-[rgb(var(--color-mikado-yellow))]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockDividends.map((dividend) => (
            <div 
              key={dividend.symbol}
              className="bg-[rgb(var(--color-yale-blue))] rounded-lg p-4 border border-[rgb(var(--color-yale-blue))]"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">{dividend.symbol}</h3>
                <span className="text-sm text-[rgb(var(--color-mikado-yellow))]">{dividend.yield}</span>
              </div>
              <p className="text-sm text-gray-300">Payment Date: {dividend.date}</p>
              <p className="text-lg font-semibold text-white mt-2">
                ${dividend.amount.toFixed(2)} per share
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
