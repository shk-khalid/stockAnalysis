import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { Search, Plus, Loader, History } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { StockService } from '../../services/stockService';
import { SearchResult } from '../types/stock';

interface StockSearchProps {
  onAddToWatchlist: (stock: SearchResult, group: string) => void;
  watchlistGroups: string[];
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
  const [openDropdownSymbol, setOpenDropdownSymbol] = useState<string | null>(null);
  const [dropdownReference, setDropdownReference] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(dropdownReference, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
  });

  // Track focus within the search container
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  // Persist recent searches in localStorage
  useEffect(() => {
    localStorage.setItem('recentStockSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpenDropdownSymbol(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search when the debounced query changes
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      handleSearch(debouncedQuery);
    } else {
      setResults([]);
      setError(null);
    }
  }, [debouncedQuery]);

  // Helper function to update recent searches as a queue limited to 5 records
  const updateRecentSearches = (stock: SearchResult) => {
    setRecentSearches((prev) => {
      // Remove duplicate if exists, then add new stock at the front
      const newQueue = [stock, ...prev.filter((s) => s.symbol !== stock.symbol)];
      // Ensure the list does not exceed 5 items
      return newQueue.slice(0, 5);
    });
  };

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if a matching result exists in recent searches
      const recentResult = recentSearches.find(
        (stock) => stock.symbol.toLowerCase() === searchQuery.toLowerCase()
      );

      if (recentResult) {
        setResults([recentResult]);
      } else {
        const result = await StockService.searchStocks(searchQuery);
        setResults([result]);
        updateRecentSearches(result);
      }
    } catch (error: any) {
      console.error('Search failed:', error);
      // Fallback for 404 errors
      if (error.response && error.response.status === 404) {
        setError('No stock found. Please try a different symbol or company name.');
      } else {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWatchlist = (stock: SearchResult, group: string) => {
    onAddToWatchlist(stock, group);
    setOpenDropdownSymbol(null);
    setResults([]);
    setQuery('');
    updateRecentSearches(stock);
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString();
  };

  return (
    <div
      className="bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))] mb-8"
      ref={searchRef}
      // Use focus and blur capture to track if any element inside is focused
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-1 bg-[rgb(var(--color-mikado-yellow))]/20 rounded-full blur" />
              <Search className="relative h-7 w-7 text-[rgb(var(--color-mikado-yellow))]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Search Stocks</h2>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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

          {/* Render dropdown: show search results when available, or recent searches only when input is focused */}
          {(results.length > 0 ||
            (recentSearches.length > 0 && isFocused)) &&
            !error && (
              <div className="absolute z-10 w-full mt-2 bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))] max-h-[480px] overflow-y-auto">
                {results.length > 0 ? (
                  results.map((result) => (
                    <div
                      key={result.symbol}
                      className="p-4 hover:bg-[rgb(var(--color-yale-blue))] transition-colors duration-200 border-b border-[rgb(var(--color-yale-blue))] last:border-b-0"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-white text-lg">{result.symbol}</h3>
                            <span className="text-sm text-gray-400">{result.name}</span>
                          </div>
                          <div className="mt-2 flex items-center gap-4 text-sm text-gray-300">
                            {result.volume && <span>Vol: {formatNumber(result.volume)}</span>}
                            {result.marketCap && <span>MCap: ${formatNumber(result.marketCap)}</span>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="font-semibold text-white text-lg">
                              ${result.price.toFixed(2)}
                            </p>
                            <p
                              className={`text-sm font-medium ${
                                result.change >= 0 ? 'text-green-400' : 'text-red-400'
                              }`}
                            >
                              {result.change >= 0 ? '+' : ''}
                              {result.change}%
                            </p>
                          </div>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (openDropdownSymbol === result.symbol) {
                                  setOpenDropdownSymbol(null);
                                } else {
                                  setOpenDropdownSymbol(result.symbol);
                                  setDropdownReference(e.currentTarget);
                                }
                              }}
                              className="p-2.5 text-[rgb(var(--color-mikado-yellow))] hover:text-[rgb(var(--color-gold))] rounded-full hover:bg-[rgb(var(--color-yale-blue))] transition-colors duration-200"
                              title="Add to watchlist"
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  recentSearches.length > 0 && (
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <History className="h-4 w-4" />
                        Recent Searches
                      </div>
                      {recentSearches.map((result) => (
                        <div
                          key={result.symbol}
                          className="py-2 px-4 hover:bg-[rgb(var(--color-yale-blue))] rounded-md transition-colors duration-200 cursor-pointer"
                          onClick={() => setQuery(result.symbol)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-white">{result.symbol}</span>
                              <span className="text-sm text-gray-400 ml-2">{result.name}</span>
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                result.change >= 0 ? 'text-green-400' : 'text-red-400'
                              }`}
                            >
                              ${result.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}
        </div>
      </div>

      {openDropdownSymbol &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="z-50 bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))]"
          >
            <div className="py-2">
              <div className="px-4 py-2 text-sm text-gray-400 font-medium border-b border-[rgb(var(--color-yale-blue))]">
                Add to Watchlist
              </div>
              {watchlistGroups.map((group) => (
                <button
                  key={group}
                  onClick={(e) => {
                    e.stopPropagation();
                    const stock =
                      results.find((r) => r.symbol === openDropdownSymbol) ||
                      recentSearches.find((r) => r.symbol === openDropdownSymbol);
                    if (stock) {
                      handleAddToWatchlist(stock, group);
                    }
                  }}
                  className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-[rgb(var(--color-yale-blue))] transition-colors duration-200"
                >
                  {group}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
