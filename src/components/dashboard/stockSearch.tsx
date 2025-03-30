  import { useState, useEffect, useRef } from 'react';
  import ReactDOM from 'react-dom';
  import { usePopper } from 'react-popper';
  import { Search, Plus, Loader, History } from 'lucide-react';
  import { useDebounce } from '../../hooks/useDebounce';

  interface SearchResult {
    symbol: string;
    name: string;
    price: number;
    change: number;
    volume?: number;
    marketCap?: number;
  }

  interface StockSearchProps {
    onAddToWatchlist: (stock: SearchResult, group: string) => void;
    watchlistGroups: string[];
  }

  export function StockSearch({ onAddToWatchlist, watchlistGroups }: StockSearchProps) {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);

    // State to track which symbol’s dropdown is open
    const [openDropdownSymbol, setOpenDropdownSymbol] = useState<string | null>(null);
    // Reference for Popper to position the watchlist dropdown
    const [dropdownReference, setDropdownReference] = useState<HTMLElement | null>(null);

    // Popper for the watchlist dropdown
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(dropdownReference, popperElement, {
      placement: 'bottom-start',
      modifiers: [
        { name: 'offset', options: { offset: [0, 8] } },
      ],
    });

    // For closing popups if clicked outside
    const searchRef = useRef<HTMLDivElement>(null);
    const debouncedQuery = useDebounce(query, 300);

    // Close dropdown if user clicks outside the entire search area
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
          setOpenDropdownSymbol(null);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle search when debounced query changes
    useEffect(() => {
      if (debouncedQuery.length >= 2) {
        handleSearch(debouncedQuery);
      } else {
        setResults([]);
      }
    }, [debouncedQuery]);

    const handleSearch = async (searchQuery: string) => {
      setIsLoading(true);
      try {
        // Simulated API call with realistic delay and mock data
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockResults: SearchResult[] = [
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            price: 178.32,
            change: 1.5,
            volume: 52436789,
            marketCap: 2800000000000,
          },
          {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            price: 334.75,
            change: 2.1,
            volume: 23456789,
            marketCap: 2500000000000,
          },
          {
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            price: 142.56,
            change: -0.8,
            volume: 15678923,
            marketCap: 1800000000000,
          },
          {
            symbol: 'AMZN',
            name: 'Amazon.com Inc.',
            price: 178.32,
            change: 0.7,
            volume: 34567890,
            marketCap: 1500000000000,
          },
        ].filter(
          (stock) =>
            stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setResults(mockResults);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleAddToWatchlist = (stock: SearchResult, group: string) => {
      onAddToWatchlist(stock, group);

      // Reset the dropdown and search
      setOpenDropdownSymbol(null);
      setResults([]);
      setQuery('');

      // Update recent searches
      setRecentSearches((prev) => {
        const newSearches = [stock, ...prev.filter((s) => s.symbol !== stock.symbol)].slice(0, 5);
        return newSearches;
      });
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
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[rgb(var(--color-mikado-yellow))]">
              Search Stocks
            </h2>
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

            {(results.length > 0 || recentSearches.length > 0) && (
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
                                // Toggle dropdown for this particular stock
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

        {/* ------------- WATCHLIST DROPDOWN PORTAL ------------- */}
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
                      // Identify which stock triggered the dropdown
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
