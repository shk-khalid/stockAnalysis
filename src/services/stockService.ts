import api from "./api";

export interface HistoricalData {
    date: string;
    price: number;
  }
  
  export interface DividendInfo {
    paymentDate: string;
    amount: number;
    yield: number;
  }
  
  export interface StockOverview {
    symbol: string;
    historicalData: HistoricalData[];
    mostRecentDividend: DividendInfo;
  }
  
  export interface WatchlistOverview {
    overallTotalValue: number;
    overallTotalGainLoss: number;
    stocks: StockOverview[];
  }
  
  export const getWatchlistOverview = async (): Promise<WatchlistOverview> => {
    try {
      const response = await api.get<WatchlistOverview>('/watchlist/overview/');
      return response.data;
    } catch (error) {
      console.error('Error fetching watchlist overview:', error);
      throw error;
    }
  };