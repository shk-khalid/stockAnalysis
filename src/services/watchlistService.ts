import api from './api';
import axios from 'axios';
import { Stock, Watchlist } from '../components/types/stock';

export async function createWatchlist(name: string): Promise<Watchlist> {
  try {
    const response = await api.post<Watchlist>('/watchlists/add/', { name });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create watchlist');
  }
}

export async function deleteWatchlist(id: number): Promise<void> {
  try {
    await api.delete(`/watchlists/${id}/destroy/`);
  } catch (error) {
    throw new Error('Failed to delete watchlist');
  }
}

export async function getWatchlists(): Promise<Watchlist[]> {
  try {
    const response = await api.get<Watchlist[]>('/watchlists/add/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch watchlists');
  }
}

export async function getWatchlistOverview(watchlistId: number): Promise<Stock[]> {
  try {
    const response = await api.get<Stock[]>(`/watchlists/${watchlistId}/overview/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Watchlist not found');
    }
    throw new Error('Failed to fetch watchlist overview');
  }
}
