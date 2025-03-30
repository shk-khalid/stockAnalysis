import React, { useState } from 'react';
import { Navigation } from '../components/dashboard/navigation';
import { PortfolioSummary } from '../components/dashboard/portfolioSummary';
import { StockSearch } from '../components/dashboard/stockSearch';
import { Watchlist } from '../components/dashboard/watchList';
import { AlertHistory } from '../components/dashboard/alertHistory';
import { watchlistGroups as initialWatchlistGroups, alertsData } from '../data/mockData';

// Define types for Stock and Alert
export interface Alert {
  price: number;
  type: 'above' | 'below';
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  alerts: Alert[];
  pinned: boolean;
  sector: string;
  marketCap: string;
  shares: number;
  avgPrice: number;
  chartData: Array<{ day: number; price: number }>;
}

// Optionally, if your mock data doesn't match these types (e.g. alerts are string[]),
// you can cast it as shown below.
const initialGroups = initialWatchlistGroups as unknown as Record<string, Stock[]>;

export const DashboardPage: React.FC = () => {
  const [watchlistGroups, setWatchlistGroups] = useState<Record<string, Stock[]>>(initialGroups);
  const [activeWatchlist, setActiveWatchlist] = useState<string>('Tech Stocks');
  const [sortBy, setSortBy] = useState<string>('symbol');
  const [filterSector, setFilterSector] = useState<string>('all');
  const [showCharts, setShowCharts] = useState<Record<string, boolean>>({});

  const totalValue = Object.values(watchlistGroups).flat().reduce((acc, stock: Stock) => {
    return acc + stock.price * stock.shares;
  }, 0);

  const totalGainLoss = Object.values(watchlistGroups).flat().reduce((acc, stock: Stock) => {
    return acc + ((stock.price - stock.avgPrice) * stock.shares);
  }, 0);

  const toggleChart = (symbol: string) => {
    setShowCharts(prev => ({ ...prev, [symbol]: !prev[symbol] }));
  };

  const togglePin = (symbol: string) => {
    setWatchlistGroups(prev => {
      const updatedGroup = (prev[activeWatchlist] || []).map((stock: Stock) => {
        if (stock.symbol === symbol) {
          return { ...stock, pinned: !stock.pinned };
        }
        return stock;
      });
      return { ...prev, [activeWatchlist]: updatedGroup };
    });
  };

  const addAlert = (symbol: string, alert: Alert) => {
    setWatchlistGroups(prev => {
      const updatedGroup = (prev[activeWatchlist] || []).map((stock: Stock) => {
        if (stock.symbol === symbol) {
          return { ...stock, alerts: [...stock.alerts, alert] };
        }
        return stock;
      });
      return { ...prev, [activeWatchlist]: updatedGroup };
    });
  };

  const removeAlert = (symbol: string, alertIndex: number) => {
    setWatchlistGroups(prev => {
      const updatedGroup = (prev[activeWatchlist] || []).map((stock: Stock) => {
        if (stock.symbol === symbol) {
          const newAlerts = stock.alerts.filter((_: Alert, idx: number) => idx !== alertIndex);
          return { ...stock, alerts: newAlerts };
        }
        return stock;
      });
      return { ...prev, [activeWatchlist]: updatedGroup };
    });
  };

  // Update the type of stock parameter here as needed.
  const handleAddToWatchlist = (
    stock: Omit<Stock, 'alerts' | 'pinned' | 'shares' | 'avgPrice' | 'chartData'> & { price: number },
    group: string
  ) => {
    const newStock: Stock = {
      ...stock,
      alerts: [],
      pinned: false,
      sector: 'Technology',
      marketCap: 'Large',
      shares: 0,
      avgPrice: stock.price,
      chartData: Array.from({ length: 7 }, (_, i: number) => ({
        day: i + 1,
        price: stock.price + (Math.random() - 0.5) * 10,
      })),
    };

    setWatchlistGroups(prev => ({
      ...prev,
      [group]: [...(prev[group] || []), newStock],
    }));
  };

  const addGroup = (name: string) => {
    setWatchlistGroups(prev => ({
      ...prev,
      [name]: [],
    }));
    setActiveWatchlist(name);
  };

  return (
    <div className="min-h-screen bg-rich-black">
      <Navigation />

      <main className="w-full px-4 pt-16 sm:px-6 lg:px-8 py-8">
        <PortfolioSummary totalValue={totalValue} totalGainLoss={totalGainLoss} />

        <StockSearch 
          onAddToWatchlist={handleAddToWatchlist}
          watchlistGroups={Object.keys(watchlistGroups)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Watchlist
              groups={watchlistGroups}
              activeGroup={activeWatchlist}
              onGroupChange={setActiveWatchlist}
              sortBy={sortBy}
              onSortChange={setSortBy}
              filterSector={filterSector}
              onFilterChange={setFilterSector}
              showCharts={showCharts}
              onToggleChart={toggleChart}
              onTogglePin={togglePin}
              onAddAlert={addAlert}
              onRemoveAlert={removeAlert}
              onAddGroup={addGroup}
            />
          </div>

          <div className="lg:col-span-1">
            <AlertHistory alerts={alertsData} />
          </div>
        </div>
      </main>
    </div>
  );
};
