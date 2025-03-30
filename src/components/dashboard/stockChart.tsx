import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  day: number;
  price: number;
}

interface StockChartProps {
  data: ChartData[];
}

export function StockChart({ data }: StockChartProps) {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* Use your custom Oxford Blue for the grid stroke */}
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
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(var(--color-rich-black))',
              border: `1px solid rgb(var(--color-yale-blue))`,
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#9ca3af' }}
            itemStyle={{ color: 'rgb(var(--color-gold))' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="rgb(var(--color-gold))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
