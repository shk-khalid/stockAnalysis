import { useState } from 'react';
import { X } from 'lucide-react';
import { SearchResult } from '../types/stock';

export interface Watchlist {
  id: number;
  name: string;
}

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: SearchResult | null;
  watchlistGroups: Watchlist[];
  onSubmit: (watchlistId: number, shares: number, purchasePrice: number) => void;
}

export function WatchlistModal({
  isOpen,
  onClose,
  stock,
  watchlistGroups,
  onSubmit,
}: WatchlistModalProps) {
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>('');
  const [shares, setShares] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(stock?.price.toString() || '');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !stock) return null;

  const handleSubmit = () => {
    setError(null);
    const watchlistIdNum = parseInt(selectedWatchlist, 10);
    const sharesNum = parseInt(shares, 10);
    const priceNum = parseFloat(purchasePrice);

    if (isNaN(watchlistIdNum)) {
      setError('Please select a watchlist');
      return;
    }
    if (isNaN(sharesNum) || sharesNum <= 0) {
      setError('Please enter a valid number of shares');
      return;
    }
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid purchase price');
      return;
    }

    onSubmit(watchlistIdNum, sharesNum, priceNum);
    setSelectedWatchlist('');
    setShares('');
    setPurchasePrice('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--color-yale-blue))]">
          <h3 className="text-lg font-semibold text-white">
            Add {stock.symbol} to Watchlist
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {error && (
            <div className="text-sm text-red-400 bg-red-400/10 p-3 rounded">{error}</div>
          )}

          {/* Watchlist selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Select Watchlist
            </label>
            <select
              value={selectedWatchlist}
              onChange={(e) => setSelectedWatchlist(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[rgb(var(--color-rich-black))] border border-[rgb(var(--color-yale-blue))] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[rgb(var(--color-mikado-yellow))]"
            >
              <option value="">Choose a watchlist</option>
              {watchlistGroups.map((wl) => (
                <option key={wl.id} value={wl.id.toString()}>
                  {wl.name}
                </option>
              ))}
            </select>
          </div>

          {/* Shares */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Number of Shares
            </label>
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              placeholder="Enter number of shares"
              className="w-full px-3 py-2 rounded bg-[rgb(var(--color-rich-black))] border border-[rgb(var(--color-yale-blue))] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[rgb(var(--color-mikado-yellow))]"
            />
          </div>

          {/* Purchase price */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Purchase Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="Enter purchase price"
              className="w-full px-3 py-2 rounded bg-[rgb(var(--color-rich-black))] border border-[rgb(var(--color-yale-blue))] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[rgb(var(--color-mikado-yellow))]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-4 border-t border-[rgb(var(--color-yale-blue))]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[rgb(var(--color-mikado-yellow))] text-[rgb(var(--color-rich-black))] rounded hover:bg-[rgb(var(--color-gold))] transition-colors duration-200 text-sm font-medium"
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
