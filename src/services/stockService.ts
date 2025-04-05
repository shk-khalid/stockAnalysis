import api from "./api";
import { AxiosError } from "axios";
import { WatchlistOverview, SearchResult } from "../components/types/stock";


export const getWatchlistOverview = async (): Promise<WatchlistOverview> => {
  try {
    const response = await api.get<WatchlistOverview>('/watchlist/overview/');
    return response.data;
  } catch (error) {
    console.error('Error fetching watchlist overview:', error);
    throw error;
  }
};


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