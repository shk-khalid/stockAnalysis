import { useState, useEffect } from 'react';
import { Search, Plus, Loader, History } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { StockService } from '../../services/stockService';
import { SearchResult } from '../types/stock';
import { addToWatchlist } from '../../services/watchlistService';
import { WatchlistModal } from './watchlistModal';
import toast from 'react-hot-toast';

export interface Watchlist {
  id: number;
  name: string;
}

interface StockSearchProps {
  onAddToWatchlist: (stock: SearchResult, watchlistId: number) => void;
  watchlistGroups: Watchlist[];
}



export function StockSearch({ onAddToWatchlist, watchlistGroups }: StockSearchProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>(() => {
    const saved = localStorage.getItem('recentStockSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<SearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    localStorage.setItem('recentStockSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      handleSearch(debouncedQuery);
    } else {
      setResults([]);
      setError(null);
    }
  }, [debouncedQuery]);

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const recentResult = recentSearches.find(
        (stock) => stock.symbol.toLowerCase() === searchQuery.toLowerCase()
      );

      if (recentResult) {
        setResults([recentResult]);
      } else {
        const result = await StockService.searchStocks(searchQuery);
        setResults([result]);
        setRecentSearches((prev) =>
          [result, ...prev.filter((s) => s.symbol !== result.symbol)].slice(0, 5)
        );
      }
    } catch (err: any) {
      console.error('Search failed:', err);
      if (err.response?.status === 404) {
        setError('No stock found. Please try a different symbol or company name.');
      } else {
        setError(err.message ?? 'An unexpected error occurred');
      }
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWatchlist = async (
    watchlistId: number,
    shares: number,
    purchasePrice: number
  ) => {
    if (!selectedStock) return;

    try {
      await addToWatchlist(watchlistId, {
        symbol: selectedStock.symbol,
        shares,
        purchasePrice,
      });
      onAddToWatchlist(selectedStock, watchlistId);
      setIsModalOpen(false);
      setSelectedStock(null);
      setResults([]);
      setQuery('');
      setRecentSearches((prev) =>
        [selectedStock, ...prev.filter((s) => s.symbol !== selectedStock.symbol)].slice(0, 5)
      );
      toast.success(`${selectedStock.symbol} saved!`);
    } catch (err: any) {
      toast.error('Failed to add to watchlist');
      console.error('Failed to add to watchlist:', err);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString();
  };

  const showDropdown =
    !error && (results.length > 0 || (recentSearches.length > 0 && isInputFocused));

  return (
    <>
      <div className="bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))] mb-8">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-1 bg-[rgb(var(--color-mikado-yellow))]/20 rounded-full blur" />
                <Search className="relative h-7 w-7 text-[rgb(var(--color-mikado-yellow))]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Search Stocks</h2>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Search by symbol or company name..."
                  className="w-full px-4 py-3 rounded-lg bg-[rgb(var(--color-rich-black))] border border-[rgb(var(--color-yale-blue))] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-mikado-yellow))] focus:border-transparent transition-all duration-200"
                />
                {isLoading && (
                  <div className="absolute right-3 top-3">
                    <Loader className="h-5 w-5 text-[rgb(var(--color-mikado-yellow))] animate-spin" />
                  </div>
                )}
              </div>
              <button
                onClick={() => handleSearch(query)}
                className="px-6 py-3 bg-[rgb(var(--color-mikado-yellow))] text-[rgb(var(--color-rich-black))] rounded-lg hover:bg-[rgb(var(--color-gold))] transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>

            {error && (
              <div className="absolute z-10 w-full mt-2 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {showDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))] max-h-[480px] overflow-y-auto">
                {results.length > 0 ? (
                  results.map((result) => (
                    <div
                      key={result.symbol}
                      className="p-4 hover:bg-[rgb(var(--color-yale-blue))] transition-colors duration-200 border-b border-[rgb(var(--color-yale-blue))] last:border-b-0"
                    >
                      {/* … same result UI … */}
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-white text-lg">{result.symbol}</h3>
                            <span className="text-sm text-gray-400">{result.name}</span>
                          </div>
                          <div className="mt-2 flex items-center gap-4 text-sm text-gray-300">
                            {result.volume && <span>Vol: {formatNumber(result.volume)}</span>}
                            {result.marketCap && (
                              <span>MCap: ${formatNumber(result.marketCap)}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="font-semibold text-white text-lg">
                              ${result.price.toFixed(2)}
                            </p>
                            <p
                              className={`text-sm font-medium ${result.change >= 0 ? 'text-green-400' : 'text-red-400'
                                }`}
                            >
                              {result.change >= 0 ? '+' : ''}
                              {result.change}%
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedStock(result);
                              setIsModalOpen(true);
                            }}
                            className="p-2.5 text-[rgb(var(--color-mikado-yellow))] hover:text-[rgb(var(--color-gold))] rounded-full hover:bg-[rgb(var(--color-yale-blue))] transition-colors duration-200"
                            title="Add to watchlist"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <History className="h-4 w-4" />
                      Recent Searches
                    </div>
                    {recentSearches.map((result) => (
                      <div
                        key={result.symbol}
                        className="py-2 px-4 hover:bg-[rgb(var(--color-yale-blue))] rounded-md transition-colors duration-200 cursor-pointer"
                        onMouseDown={() => setQuery(result.symbol)} // onMouseDown so blur doesn’t wipe it out
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-white">{result.symbol}</span>
                            <span className="text-sm text-gray-400 ml-2">{result.name}</span>
                          </div>
                          <span
                            className={`text-sm font-medium ${result.change >= 0 ? 'text-green-400' : 'text-red-400'
                              }`}
                          >
                            ${result.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <WatchlistModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStock(null);
        }}
        stock={selectedStock}
        watchlistGroups={watchlistGroups}
        onSubmit={handleAddToWatchlist}
      />
    </>
  );
}
