// Mock data for the application
export const watchlistGroups = {
    'Tech Stocks': [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, change: 2.5, alerts: ['Above $180', 'Below $170'], pinned: true, sector: 'Technology', marketCap: 'Large', shares: 10, avgPrice: 150.00, chartData: Array.from({length: 7}, (_, i) => ({day: i + 1, price: 150 + Math.random() * 30})) },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 405.12, change: -1.2, alerts: ['Below $400'], pinned: false, sector: 'Technology', marketCap: 'Large', shares: 5, avgPrice: 380.00, chartData: Array.from({length: 7}, (_, i) => ({day: i + 1, price: 380 + Math.random() * 40})) },
    ],
    'Long-Term': [
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 147.68, change: 0.8, alerts: ['Above $150'], pinned: false, sector: 'Technology', marketCap: 'Large', shares: 8, avgPrice: 140.00, chartData: Array.from({length: 7}, (_, i) => ({day: i + 1, price: 140 + Math.random() * 15})) },
    ],
    'Short-Term': [
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.25, change: 1.5, alerts: ['Below $175'], pinned: false, sector: 'Consumer', marketCap: 'Large', shares: 12, avgPrice: 160.00, chartData: Array.from({length: 7}, (_, i) => ({day: i + 1, price: 160 + Math.random() * 25})) },
    ],
  };
  
  export const alertsData = [
    { symbol: 'AAPL', type: 'price', message: 'Price approaching upper threshold of $180', severity: 'warning', timestamp: '2024-03-10T14:30:00Z', triggerPrice: 179.50 },
    { symbol: 'MSFT', type: 'price', message: 'Price below target of $400', severity: 'alert', timestamp: '2024-03-10T14:15:00Z', triggerPrice: 398.75 },
    { symbol: 'GOOGL', type: 'volume', message: 'Unusual volume spike detected', severity: 'warning', timestamp: '2024-03-10T13:45:00Z', triggerPrice: 147.68 },
  ];