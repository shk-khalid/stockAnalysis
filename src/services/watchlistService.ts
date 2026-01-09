import { supabase } from '../supabaseClient';
import { Stock, Watchlist, Alert } from '../components/types/stock';

export interface AddToWatchlistPayload {
  symbol: string;
  shares: number;
  purchasePrice: number;
}

export interface WatchlistResponse {
  message: string;
  stock: Stock;
}

export interface CreateAlertPayload {
  symbol: string;
  type: 'above' | 'below';
  triggerPrice: number;
  message?: string;
  severity?: 'high' | 'medium' | 'low';
}

export async function createWatchlist(name: string): Promise<Watchlist> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('watchlists')
    .insert({ name, user_id: user.id })
    .select()
    .single();

  if (error) throw error;
  return {
    id: data.id,
    name: data.name,
    user: data.user_id, // Mapping user_id to user for compatibility
    created_at: data.created_at
  };
}

export async function deleteWatchlist(id: number): Promise<void> {
  const { error } = await supabase
    .from('watchlists')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getWatchlists(): Promise<Watchlist[]> {
  const { data, error } = await supabase
    .from('watchlists')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map(item => ({
    id: item.id,
    name: item.name,
    user: item.user_id,
    created_at: item.created_at
  }));
}

export async function getWatchlistOverview(watchlistId: number): Promise<Stock[]> {
  // 1. Get stocks from DB
  const { data: dbStocks, error } = await supabase
    .from('watchlist_stocks')
    .select(`
      *,
      alerts (*)
    `)
    .eq('watchlist_id', watchlistId);

  if (error) throw error;

  if (!dbStocks || dbStocks.length === 0) return [];

  // 2. Get live prices from Edge Function
  const symbols = dbStocks.map(s => s.symbol);
  const { data: marketData, error: apiError } = await supabase.functions.invoke('stock-api', {
    body: { action: 'batch-quotes', symbols }
  });

  if (apiError) {
    console.error('Failed to fetch market data', apiError);
    // Return DB data with stale/zero prices if API fails
    return dbStocks.map(s => ({
      id: s.id,
      symbol: s.symbol,
      name: s.name || s.symbol, // Fallback
      price: 0,
      change: 0,
      alerts: s.alerts || [],
      pinned: s.is_pinned,
      sector: s.sector || '',
      shares: s.shares,
      avgPrice: s.purchase_price,
      chartData: []
    }));
  }

  // 3. Merge data
  return dbStocks.map(s => {
    const quote = marketData[s.symbol] || {};
    return {
      id: s.id,
      symbol: s.symbol,
      name: s.name || quote.name || s.symbol,
      price: quote.price || 0,
      change: quote.change || 0,
      alerts: s.alerts || [],
      pinned: s.is_pinned,
      sector: s.sector || quote.sector || '',
      shares: s.shares,
      avgPrice: s.purchase_price,
      chartData: quote.chartData || []
    };
  });
}

export async function addToWatchlist(
  watchlistId: number,
  data: AddToWatchlistPayload
): Promise<WatchlistResponse> {
  const { data: result, error } = await supabase.functions.invoke('stock-api', {
    body: {
      action: 'add-stock',
      watchlistId,
      symbol: data.symbol,
      shares: data.shares,
      purchasePrice: data.purchasePrice
    }
  });

  if (error) {
    console.error('Error adding stock:', error);
    throw new Error('Failed to add stock to watchlist');
  }

  return result;
}

export async function createAlert(stockId: number, alertData: CreateAlertPayload): Promise<Alert> {
  const { data, error } = await supabase
    .from('alerts')
    .insert({
      stock_id: stockId,
      symbol: alertData.symbol,
      type: alertData.type,
      trigger_price: alertData.triggerPrice,
      message: alertData.message,
      severity: alertData.severity
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    stock: data.stock_id,
    symbol: data.symbol,
    type: data.type,
    message: data.message,
    severity: data.severity,
    timestamp: data.created_at,
    triggerPrice: data.trigger_price,
    triggered: data.triggered || false
  };
}

export async function deleteAlert(alertId: number): Promise<void> {
  const { error } = await supabase
    .from('alerts')
    .delete()
    .eq('id', alertId);

  if (error) throw error;
}

export async function toggleStockPin(watchlistId: number, stockId: number): Promise<{ pinned: boolean }> {
  // First get current status
  const { data: current, error: fetchError } = await supabase
    .from('watchlist_stocks')
    .select('is_pinned')
    .eq('id', stockId)
    .single();

  if (fetchError) throw fetchError;

  const newStatus = !current.is_pinned;

  const { error } = await supabase
    .from('watchlist_stocks')
    .update({ is_pinned: newStatus })
    .eq('id', stockId);

  if (error) throw error;

  return { pinned: newStatus };
}
