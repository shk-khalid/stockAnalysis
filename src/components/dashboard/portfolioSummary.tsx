import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Calendar, TrendingDown } from 'lucide-react';
import { getWatchlistOverview } from '../../services/stockService';
import { WatchlistOverview } from '../types/stock';
import { format } from 'date-fns';

export function PortfolioSummary() {
  const [overview, setOverview] = useState<WatchlistOverview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const data = await getWatchlistOverview();
        setOverview(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch portfolio data');
        console.error('Error fetching portfolio overview:', err);
      }
    };

    fetchOverview();
  }, []);

  // Transform historical data for the chart
  const chartData = overview?.stocks.reduce((acc, stock) => {
    stock.historicalData.forEach((dataPoint) => {
      const date = format(new Date(dataPoint.date), 'MMM dd');
      const existingPoint = acc.find(point => point.date === date);
      if (existingPoint) {
        existingPoint.value += dataPoint.price;
      } else {
        acc.push({ date, value: dataPoint.price });
      }
    });
    return acc;
  }, [] as { date: string; value: number }[]) || [];

  // Get upcoming dividends
  const upcomingDividends = overview?.stocks
    .filter(stock => stock.mostRecentDividend)
    .map(stock => ({
      symbol: stock.symbol,
      date: stock.mostRecentDividend.paymentDate,
      amount: stock.mostRecentDividend.amount,
      yield: (stock.mostRecentDividend.yield * 100).toFixed(2) + '%'
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3) || [];

  const overallTotalValue = overview?.overallTotalValue ?? 0;
  const overallTotalGainLoss = overview?.overallTotalGainLoss ?? 0;

  /* if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
        <p className="text-red-400">{error}</p>
      </div>
    );
  } */

  if (error) {
    return (
      <div
        role="alert"
        className="flex items-start gap-3 bg-red-50 border border-red-400 rounded-lg p-4 mb-8"
      >
        <svg
          className="w-6 h-6 text-red-500 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
        <div>
          <h3 className="text-red-800 font-bold mb-1">Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

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
                ${overallTotalValue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-[rgb(var(--color-mikado-yellow))]" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Gain/Loss</p>
              <p className={`text-2xl font-bold ${overallTotalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {overallTotalGainLoss >= 0 ? '+' : ''}{overallTotalGainLoss.toLocaleString()}
              </p>
            </div>
            {overallTotalGainLoss >= 0 ? (
              <TrendingUp className="h-8 w-8 text-green-400" />
            ) : (
              <TrendingDown className="h-8 w-8 text-red-400" />
            )}
          </div>
        </div>
      </div>

      {/* Portfolio Chart Card */}
      <div className="lg:col-span-2 bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))] p-6">
        <h2 className="text-xl font-semibold mb-4 text-[rgb(var(--color-mikado-yellow))]">
          Portfolio Performance
        </h2>
        <div className="h-64">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                  activeDot={{ r: 4, fill: 'rgb(var(--color-mikado-yellow))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center bg-[rgb(var(--color-rich-black))]/50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-300 font-medium">No performance data available</p>
                <p className="text-sm text-gray-400 mt-1">Chart data will appear here once available</p>
              </div>
            </div>
          )}
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
        {upcomingDividends.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingDividends.map((dividend) => (
              <div
                key={dividend.symbol}
                className="bg-[rgb(var(--color-yale-blue))] rounded-lg p-4 border border-[rgb(var(--color-yale-blue))]"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{dividend.symbol}</h3>
                  <span className="text-sm text-[rgb(var(--color-mikado-yellow))]">{dividend.yield}</span>
                </div>
                <p className="text-sm text-gray-300">
                  Payment Date: {format(new Date(dividend.date), 'MMM dd, yyyy')}
                </p>
                <p className="text-lg font-semibold text-white mt-2">
                  ${dividend.amount.toFixed(2)} per share
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-[rgb(var(--color-rich-black))]/50 rounded-lg">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-300 font-medium">No upcoming dividends</p>
            <p className="text-sm text-gray-400 mt-1">Dividend information will appear here when available</p>
          </div>
        )}
      </div>
    </div>
  );
}