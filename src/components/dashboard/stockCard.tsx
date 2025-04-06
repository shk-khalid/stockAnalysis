import { Pin, LineChart as ChartIcon, Bell, X, ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from 'react';
import { StockChart } from './stockChart';
import { Stock } from '../types/stock';

interface StockCardProps {
  stock: Stock;
  showChart: boolean;
  onToggleChart: () => void;
  onTogglePin: () => void;
  onAddAlert: (symbol: string, alert: { price: number; type: 'above' | 'below' }) => void;
  onRemoveAlert: (symbol: string, alertIndex: number) => void;
}

export function StockCard({
  stock,
  showChart,
  onToggleChart,
  onTogglePin,
  onAddAlert,
  onRemoveAlert,
}: StockCardProps) {
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [alertPrice, setAlertPrice] = useState('');
  const [alertType, setAlertType] = useState<'above' | 'below'>('above');

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(alertPrice);
    if (!isNaN(price)) {
      onAddAlert(stock.symbol, { price, type: alertType });
      setAlertPrice('');
      setShowAlertForm(false);
    }
  };

  const totalValue = stock.price * stock.shares;
  const totalGainLoss = (stock.price - stock.avgPrice) * stock.shares;

  return (
    <div className={`bg-[rgb(var(--color-rich-black))] p-4 rounded-lg ${stock.pinned ? 'border-2 border-[rgb(var(--color-mikado-yellow))]' : 'border border-[rgb(var(--color-yale-blue))]'
      }`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          <button
            onClick={onTogglePin}
            className={`p-1 rounded hover:bg-[rgb(var(--color-yale-blue))] transition-colors ${stock.pinned ? 'text-[rgb(var(--color-mikado-yellow))]' : 'text-gray-400'
              }`}
          >
            <Pin
              className={`h-4 w-4 transition-transform ${!stock.pinned ? 'rotate-45' : ''
                }`}
            />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-white">{stock.symbol}</h3>
              <span className="text-sm text-gray-400">{stock.name}</span>
            </div>
            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-400">
              <span>{stock.sector}</span>
              <span>•</span>
              <span>{stock.marketCap}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-bold text-white">${stock.price.toFixed(2)}</div>
          <div className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change}%
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-400">
            {stock.shares} shares @ ${stock.avgPrice.toFixed(2)}
          </div>
          <div className="mt-1">
            <span className="text-white">${totalValue.toFixed(2)}</span>
            <span className={`ml-2 text-sm ${totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalGainLoss >= 0 ? '+' : ''}{totalGainLoss.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAlertForm(!showAlertForm)}
            className="p-2 rounded hover:bg-[rgb(var(--color-yale-blue))] transition-colors text-[rgb(var(--color-mikado-yellow))]"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            onClick={onToggleChart}
            className="p-2 rounded hover:bg-[rgb(var(--color-yale-blue))] transition-colors text-[rgb(var(--color-mikado-yellow))]"
          >
            <ChartIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showAlertForm && (
        <div className="mt-4 p-4 bg-[rgb(var(--color-yale-blue))] rounded-lg">
          <form onSubmit={handleAddAlert} className="flex items-center space-x-2">
            <input
              type="number"
              value={alertPrice}
              onChange={(e) => setAlertPrice(e.target.value)}
              placeholder="Alert price"
              className="flex-1 px-3 py-2 rounded bg-[rgb(var(--color-rich-black))] text-white border border-[rgb(var(--color-yale-blue))]"
              step="0.01"
            />
            <select
              value={alertType}
              onChange={(e) => setAlertType(e.target.value as 'above' | 'below')}
              className="px-3 py-2 rounded bg-[rgb(var(--color-rich-black))] text-white border border-[rgb(var(--color-yale-blue))]"
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-[rgb(var(--color-mikado-yellow))] text-black rounded font-medium"
            >
              Set
            </button>
          </form>
        </div>
      )}

      {stock.alerts.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {stock.alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-2 py-1 rounded bg-[rgb(var(--color-yale-blue))] text-sm"
            >
              <span className="flex items-center text-[rgb(var(--color-mikado-yellow))]">
                {alert.type === "above" ? (
                  <ArrowUp className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-500" />
                )}
                <span className="ml-1">${alert.triggerPrice}</span>
              </span>
              <button
                onClick={() => onRemoveAlert(stock.symbol, index)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showChart && (
        <div className="mt-4">
          <StockChart data={stock.chartData} />
        </div>
      )}
    </div>
  );
}