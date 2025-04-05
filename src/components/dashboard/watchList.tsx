import { WatchlistHeader } from './watchListHeader';
import { StockCard } from './stockCard';
import { TrendingUp } from 'lucide-react';
import { Alert, Stock } from '../types/stock';

interface WatchlistProps {
  groups: { [key: string]: Stock[] };
  activeGroup: string;
  onGroupChange: (group: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  filterSector: string;
  onFilterChange: (value: string) => void;
  showCharts: { [key: string]: boolean };
  onToggleChart: (symbol: string) => void;
  onTogglePin: (symbol: string) => void;
  onAddAlert: (symbol: string, alert: Alert) => void;
  onRemoveAlert: (symbol: string, alertIndex: number) => void;
  onAddGroup: (name: string) => void;
  onDeleteGroup: (name: string) => void;
}

export function Watchlist({
  groups,
  activeGroup,
  onGroupChange,
  sortBy,
  onSortChange,
  filterSector,
  onFilterChange,
  showCharts,
  onToggleChart,
  onTogglePin,
  onAddAlert,
  onRemoveAlert,
  onAddGroup,
  onDeleteGroup,
}: WatchlistProps) {
  const sortStocks = (stocks: Stock[]) => {
    return [...stocks].sort((a, b) => {
      // First sort by pinned status
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }
      // Then sort by the selected criteria
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.change - a.change;
        default:
          return a.symbol.localeCompare(b.symbol);
      }
    });
  };

  const filterStocks = (stocks: Stock[]) => {
    if (filterSector === 'all') return stocks;
    return stocks.filter(stock => stock.sector === filterSector);
  };

  const stocks = sortStocks(filterStocks(groups[activeGroup] || []));

  return (
    <div className="bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))]">
      <div className="p-6">
        <WatchlistHeader
          groups={Object.keys(groups)}
          activeGroup={activeGroup}
          onGroupChange={onGroupChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
          filterSector={filterSector}
          onFilterChange={onFilterChange}
          onAddGroup={onAddGroup}
          onDeleteGroup={onDeleteGroup}
        />

        {stocks.length === 0 ? (
          <div className="h-64 flex items-center justify-center bg-[rgb(var(--color-rich-black))]/50 rounded-lg border border-[rgb(var(--color-yale-blue))]">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-300 font-medium">No stocks to display</p>
              <p className="text-sm text-gray-400 mt-1">Your watchlist is empty or no stocks match the selected filters</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {stocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                stock={stock}
                showChart={showCharts[stock.symbol] || false}
                onToggleChart={() => onToggleChart(stock.symbol)}
                onTogglePin={() => onTogglePin(stock.symbol)}
                onAddAlert={onAddAlert}
                onRemoveAlert={onRemoveAlert}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}