import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface ChartData {
  day: number;
  price: number;
}

interface StockChartProps {
  data: ChartData[];
}

export function StockChart({ data }: StockChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center bg-[rgb(var(--color-rich-black))]/50 rounded-lg">
        <div className="text-center">
          <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No chart data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-oxford-blue))" />
          <XAxis 
            dataKey="day" 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(var(--color-rich-black))',
              border: '1px solid rgb(var(--color-yale-blue))',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#9ca3af' }}
            itemStyle={{ color: 'rgb(var(--color-mikado-yellow))' }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="rgb(var(--color-mikado-yellow))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'rgb(var(--color-mikado-yellow))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}