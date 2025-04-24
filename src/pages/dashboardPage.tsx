import React, { useState, useEffect } from 'react';
import { createWatchlist, deleteWatchlist, getWatchlists, getWatchlistOverview, createAlert, deleteAlert, toggleStockPin } from '../services/watchlistService';
import { Navigation } from '../components/common/navigation';
import { PortfolioSummary } from '../components/dashboard/portfolioSummary';
import { StockSearch } from '../components/dashboard/stockSearch';
import { Watchlist } from '../components/dashboard/watchList';
import { AlertHistory } from '../components/dashboard/alertHistory';
import type { Watchlist as WLType, Stock, SearchResult } from '../components/types/stock';
import toast from 'react-hot-toast';
import { CreateAlertPayload } from '../services/watchlistService';
import { Loading } from '../components/common/loading';

export const DashboardPage: React.FC = () => {
  const [watchlists, setWatchlists] = useState<WLType[]>([]);
  const [watchlistMap, setWatchlistMap] = useState<Record<string, number>>({});
  const [watchlistGroups, setWatchlistGroups] = useState<Record<string, Stock[]>>({});
  const [activeWatchlist, setActiveWatchlist] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('symbol');
  const [filterSector, setFilterSector] = useState<string>('all');
  const [showCharts, setShowCharts] = useState<Record<string, boolean>>({});

  // 1) Load all watchlists on mount
  useEffect(() => {
    async function loadLists() {
      setLoading(true);
      try {
        const lists = await getWatchlists();
        setWatchlists(lists);

        // build name->id map
        const map: Record<string, number> = {};
        lists.forEach((wl) => (map[wl.name] = wl.id));
        setWatchlistMap(map);

        // initialize groups & active
        const groupsInit: Record<string, Stock[]> = {};
        lists.forEach((wl) => {
          groupsInit[wl.name] = [];
        });
        setWatchlistGroups(groupsInit);

        if (lists.length) setActiveWatchlist(lists[0].name);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadLists();
  }, []);

  // 2) Whenever activeWatchlist changes, fetch its overview
  useEffect(() => {
    if (!activeWatchlist) return;
    const id = watchlistMap[activeWatchlist];
    if (id == null) return;

    async function loadOverview() {
      try {
        const stocks = await getWatchlistOverview(id);
        setWatchlistGroups((prev) => ({
          ...prev,
          [activeWatchlist]: stocks,
        }));
      } catch (err: any) {
        console.error(err.message);
      }
    }
    loadOverview();
  }, [activeWatchlist, watchlistMap]);

  // 3) Create a new watchlist
  const handleAddGroup = async (name: string) => {
    try {
      const newList = await createWatchlist(name);
      setWatchlists((prev) => [...prev, newList]);
      setWatchlistMap((prev) => ({ ...prev, [newList.name]: newList.id }));
      setWatchlistGroups((prev) => ({ ...prev, [newList.name]: [] }));
      setActiveWatchlist(newList.name);
      toast.success(`Watchlist "${newList.name}" created`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to create watchlist');
      console.error(err.message);
    }
  };

  // 4) Delete an existing watchlist
  const handleDeleteGroup = async (name: string) => {
    const id = watchlistMap[name];
    if (id == null) return;
    if (!window.confirm(`Delete watchlist "${name}"?`)) return;

    try {
      await deleteWatchlist(id);
      setWatchlists((prev) => prev.filter((w) => w.name !== name));
      setWatchlistMap((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
      setWatchlistGroups((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
      if (activeWatchlist === name) {
        const remaining = watchlists.filter((w) => w.name !== name);
        setActiveWatchlist(remaining[0]?.name || '');
      }
      toast.success(`Watchlist "${name}" deleted`);
    } catch (err: any) {
      toast.error(err.message || `Failed to delete "${name}"`);
      console.error(err.message);
    }
  };

  // 5) Handle adding a stock to a watchlist
  const handleAddToWatchlist = (stock: SearchResult, watchlistId: number) => {
    // find the watchlist name by its ID
    const wl = watchlists.find((w) => w.id === watchlistId);
    if (!wl) return;
    const groupName = wl.name;

    // build the Stock object
    const newStock: Stock = {
      ...stock,
      id: stock.id,
      symbol: stock.symbol,
      name: stock.name,
      price: stock.price,
      change: stock.change,
      marketCap: stock.marketCap,
      alerts: [],
      pinned: false,
      sector: 'Technology',
      shares: 0,
      avgPrice: stock.price,
      chartData: Array.from({ length: 7 }, (_, i) => ({
        date: i + 1,
        price: stock.price + (Math.random() - 0.5) * 10,
      })),
    };

    // insert into the correct group
    setWatchlistGroups((prev) => ({
      ...prev,
      [groupName]: [...(prev[groupName] || []), newStock],
    }));
  };

  // 6) Handle adding an alert to a stock
  const handleAddAlert = async (symbol: string, alertData: { price: number; type: 'above' | 'below' }) => {
    try {
      // Find the stock in the current group
      const stock = watchlistGroups[activeWatchlist].find(s => s.symbol === symbol);
      if (!stock) {
        throw new Error('Stock not found');
      }

      const payload: CreateAlertPayload = {
        symbol: symbol,                // Added: symbol field
        type: alertData.type,          // 'above' or 'below'
        triggerPrice: alertData.price, // Added: triggerPrice field
        message: `${symbol} price ${alertData.type === 'above' ? 'increased above' : 'decreased below'} $${alertData.price}`,
        severity: 'high'
      };

      // Pass stock.id (assumed to be a number) to createAlert
      const newAlert = await createAlert(stock.id, payload);

      setWatchlistGroups(prevGroups => ({
        ...prevGroups,
        [activeWatchlist]: prevGroups[activeWatchlist].map(s =>
          s.symbol === symbol ? {
            ...s,
            alerts: [...s.alerts, newAlert]
          } : s
        )
      }));

    } catch (err) {
      toast.error('Failed to create alert. Please try again.');
      console.error('Error creating alert:', err);
    }
  };

  // 7) Handle removing an alert from a stock
  const handleRemoveAlert = async (symbol: string, alertIndex: number) => {
    try {
      const stock = watchlistGroups[activeWatchlist].find(s => s.symbol === symbol);
      if (!stock) {
        throw new Error('Stock not found');
      }

      const alert = stock.alerts[alertIndex];
      if (!alert) {
        throw new Error('Alert not found');
      }

      await deleteAlert(alert.id);

      setWatchlistGroups(prevGroups => ({
        ...prevGroups,
        [activeWatchlist]: prevGroups[activeWatchlist].map(s =>
          s.symbol === symbol ? {
            ...s,
            alerts: s.alerts.filter((_, index) => index !== alertIndex)
          } : s
        )
      }));

    } catch (err) {
      toast.error('Failed to delete alert. Please try again.');
      console.error('Error deleting alert:', err);
    }
  };

  // 8) Handle toggling of stock pinned status
  const togglePin = async (symbol: string) => {
    try {
      const watchlistId = watchlistMap[activeWatchlist];
      if (watchlistId == null) {
        throw new Error('Active watchlist not found');
      }

      const currentStock = watchlistGroups[activeWatchlist].find(s => s.symbol === symbol);
      if (!currentStock) {
        throw new Error('Stock not found');
      }

      // Store the current pin status before making any changes
      const currentPinStatus = currentStock.pinned;

      // Optimistically update UI
      setWatchlistGroups(prevGroups => ({
        ...prevGroups,
        [activeWatchlist]: prevGroups[activeWatchlist].map(s =>
          s.symbol === symbol ? { ...s, pinned: !currentPinStatus } : s
        )
      }));

      const updatedStock = await toggleStockPin(watchlistId, currentStock.id);

      setWatchlistGroups(prevGroups => ({
        ...prevGroups,
        [activeWatchlist]: prevGroups[activeWatchlist].map(s =>
          s.symbol === symbol ? { ...s, pinned: updatedStock.pinned } : s
        )
      }));

      const action = updatedStock.pinned ? 'pinned to' : 'unpinned from';
      toast.success(`${symbol} ${action} ${activeWatchlist}`);

    } catch (err: any) {
      // Revert to the original pin status
      const currentStock = watchlistGroups[activeWatchlist].find(s => s.symbol === symbol);
      if (currentStock) {
        setWatchlistGroups(prevGroups => ({
          ...prevGroups,
          [activeWatchlist]: prevGroups[activeWatchlist].map(s =>
            s.symbol === symbol ? { ...s, pinned: currentStock.pinned } : s
          )
        }));
      }

      const errorMsg = err.message || 'Failed to update pin status';
      toast.error(errorMsg);
      console.error(errorMsg);
    }
  };

  // 9) Handle toggling of chart visibility
  const toggleChart = (symbol: string) => {
    setShowCharts((prev) => ({ ...prev, [symbol]: !prev[symbol] }));
  };
  

  return (
    <div className="min-h-screen bg-rich-black">
      <Navigation />

      <main className="w-full px-4 pt-16 sm:px-6 lg:px-8 py-8">

        {loading ? (
        <Loading fullScreen/>
        ) : (
          <>
            <PortfolioSummary />

            {/* Pass the full watchlists array, not just names */}
            <StockSearch
              onAddToWatchlist={handleAddToWatchlist}
              watchlistGroups={watchlists}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Watchlist
                  groups={watchlistGroups}
                  activeGroup={activeWatchlist}
                  onGroupChange={setActiveWatchlist}
                  onAddGroup={handleAddGroup}
                  onDeleteGroup={handleDeleteGroup}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  filterSector={filterSector}
                  onFilterChange={setFilterSector}
                  showCharts={showCharts}
                  onToggleChart={toggleChart}
                  onTogglePin={togglePin}
                  onAddAlert={handleAddAlert}
                  onRemoveAlert={handleRemoveAlert}
                />
              </div>

              <div className="lg:col-span-1">
                <AlertHistory />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
