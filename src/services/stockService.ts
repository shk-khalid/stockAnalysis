import { supabase } from "../supabaseClient";
import { WatchlistOverview, SearchResult } from "../components/types/stock";

export const getWatchlistOverview = async (): Promise<WatchlistOverview> => {
  try {
    const { data, error } = await supabase.functions.invoke('stock-api', {
      body: { action: 'overview' }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching watchlist overview:', error);
    throw error;
  }
};

export class StockService {
  static async searchStocks(query: string): Promise<SearchResult> {
    try {
      const { data, error } = await supabase.functions.invoke('stock-api', {
        body: { action: 'search', query }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error searching stocks:', error);
      throw new Error('Failed to fetch stock data');
    }
  }
}