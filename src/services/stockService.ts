import { AxiosError } from "axios";
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

  export interface SearchResult {
    symbol: string;
    name: string;
    price: number;
    change: number;
    volume?: number;
    marketCap?: number;
  }

  export class StockService {
    static async searchStocks(query: string): Promise<SearchResult> {
      try {
        const response = await api.get('/stocks/search', {
          params: { query }
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          throw new Error(error.response.data.error || 'Failed to fetch stock data');
        }
        throw new Error('An unexpected error occurred while searching stocks');
      }
    }
  }