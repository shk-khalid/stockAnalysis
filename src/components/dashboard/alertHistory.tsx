import { Bell, AlertTriangle, ChevronDown, ChevronUp, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface Alert {
  symbol: string;
  type: string;
  message: string;
  severity: string;
  timestamp: string;
  triggerPrice: number;
}

interface AlertHistoryProps {
  alerts: Alert[];
}

export function AlertHistory({ alerts }: AlertHistoryProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});

  const filteredAlerts = alerts.filter(alert => {
    if (selectedFilter === 'all') return true;
    return alert.severity === selectedFilter;
  });

  const toggleExpand = (timestamp: string) => {
    setIsExpanded(prev => ({
      ...prev,
      [timestamp]: !prev[timestamp]
    }));
  };

  return (
    <div className="bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-[rgb(var(--color-mikado-yellow))]" />
            <h2 className="text-xl font-semibold text-[rgb(var(--color-mikado-yellow))]">
              Alert History
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[rgb(var(--color-rich-black))] text-white border border-[rgb(var(--color-yale-blue))] focus:outline-none focus:border-[rgb(var(--color-mikado-yellow))] text-sm"
            >
              <option value="all">All Alerts</option>
              <option value="alert">Critical</option>
              <option value="warning">Warnings</option>
            </select>
          </div>
        </div>
        
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 bg-[rgb(var(--color-rich-black))] rounded-lg">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-300 font-medium">No alerts to display</p>
            <p className="text-sm text-gray-400 mt-1">Alerts will appear here when triggered</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => {
              const isAlertExpanded = isExpanded[alert.timestamp];
              return (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden transition-all duration-200 ${
                    alert.severity === 'alert' 
                      ? 'bg-gradient-to-r from-red-950/40 to-red-900/20 border border-red-800/50' 
                      : 'bg-gradient-to-r from-yellow-950/40 to-yellow-900/20 border border-yellow-800/50'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(alert.timestamp)}
                    className="w-full px-4 py-3 flex items-start justify-between group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 p-1.5 rounded-full ${
                        alert.severity === 'alert' 
                          ? 'bg-red-500/20' 
                          : 'bg-yellow-500/20'
                      }`}>
                        <Bell className={`h-4 w-4 ${
                          alert.severity === 'alert' 
                            ? 'text-red-400' 
                            : 'text-yellow-400'
                        }`} />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white">{alert.symbol}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            alert.severity === 'alert'
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {alert.severity === 'alert' ? 'Critical' : 'Warning'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mt-0.5">{alert.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                      {isAlertExpanded ? (
                        <ChevronUp className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      )}
                    </div>
                  </button>
                  
                  {isAlertExpanded && (
                    <div className="px-4 pb-4 pt-1">
                      <div className="p-3 rounded-lg bg-[rgb(var(--color-rich-black))]/50 space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>Triggered at: {new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <DollarSign className="h-4 w-4" />
                          <span>Trigger Price: ${alert.triggerPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}