export interface Alert {
    price: number;
    type: 'above' | 'below';
}

export interface Stock {
    symbol: string;
    name: string;
    price: number;
    change: number;
    alerts: Alert[];
    pinned: boolean;
    sector: string;
    marketCap?: number;
    shares: number;
    avgPrice: number;
    chartData: Array<{ date: number; price: number }>;
}

export interface Watchlist {
    id: number;
    name: string;
    user: number;
    created_at: string;
  }

export interface HistoricalData {
    date: number;
    price: number;
}

interface DividendInfo {
    paymentDate: string;
    amount: number;
    yield: number;
}

interface StockOverview {
    symbol: string;
    historicalData: HistoricalData[];
    mostRecentDividend: DividendInfo;
}

export interface WatchlistOverview {
    overallTotalValue: number;
    overallTotalGainLoss: number;
    stocks: StockOverview[];
}

export interface SearchResult {
    symbol: string;
    name: string;
    price: number;
    change: number;
    volume?: number;
    marketCap?: number;
}