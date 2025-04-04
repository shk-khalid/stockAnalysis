import { Bell, AlertTriangle, ChevronDown, ChevronUp, Clock, DollarSign, ArrowUpDown, Search, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useAlertWebSocket } from '../../hooks/useAlerts';

export function AlertHistory() {
  const { alerts, isConnected, reconnect } = useAlertWebSocket();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await reconnect();
    setTimeout(() => setIsRefreshing(false), 1000); // Visual feedback
  };

  const toggleExpand = (timestamp: string) => {
    setIsExpanded(prev => ({
      ...prev,
      [timestamp]: !prev[timestamp]
    }));
  };

  const expandAll = () => {
    const expandedState: { [key: string]: boolean } = {};
    filteredAlerts.forEach(alert => {
      expandedState[alert.timestamp] = true;
    });
    setIsExpanded(expandedState);
  };

  const collapseAll = () => {
    setIsExpanded({});
  };

  const uniqueDates = useMemo(() => {
    const dates = alerts.map(alert =>
      new Date(alert.timestamp).toLocaleDateString()
    );
    return ['all', ...Array.from(new Set(dates))];
  }, [alerts]);

  const filteredAlerts = useMemo(() => {
    return alerts
      .filter(alert => {
        const matchesFilter = selectedFilter === 'all' || alert.severity === selectedFilter;
        const matchesSearch = alert.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.message.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDate = selectedDate === 'all' ||
          new Date(alert.timestamp).toLocaleDateString() === selectedDate;
        return matchesFilter && matchesSearch && matchesDate;
      })
      .sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [alerts, selectedFilter, searchQuery, sortOrder, selectedDate]);

  return (
    <div className="bg-[rgb(var(--color-oxford-blue))] rounded-lg shadow-lg border border-[rgb(var(--color-yale-blue))]">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="h-6 w-6 text-[rgb(var(--color-mikado-yellow))]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[rgb(var(--color-mikado-yellow))]">Alert History</h2>
              <div className="flex items-center space-x-1">
                {isConnected ? (
                  <div className="flex items-center space-x-1 text-green-400">
                    <Wifi className="h-4 w-4" />
                    <span className="text-xs">Live Updates Active</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-red-400">
                    <WifiOff className="h-4 w-4" />
                    <span className="text-xs">Reconnecting...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="px-3 py-1.5 rounded-lg bg-[rgb(var(--color-rich-black))] text-[rgb(var(--color-mikado-yellow))] border border-[rgb(var(--color-yale-blue))] hover:border-[rgb(var(--color-mikado-yellow))] transition-colors text-sm"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            {filteredAlerts.length >= 2 && (
              <button
                onClick={Object.keys(isExpanded).length ? collapseAll : expandAll}
                className="px-3 py-1.5 rounded-lg bg-[rgb(var(--color-rich-black))] text-white border border-[rgb(var(--color-yale-blue))] hover:border-[rgb(var(--color-mikado-yellow))] transition-colors text-sm"
              >
                {Object.keys(isExpanded).length ? 'Collapse All' : 'Expand All'}
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alerts..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgb(var(--color-rich-black))] text-white border border-[rgb(var(--color-yale-blue))] focus:outline-none focus:border-[rgb(var(--color-mikado-yellow))] text-sm"
              />
            </div>
          </div>

          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[rgb(var(--color-rich-black))] text-white border border-[rgb(var(--color-yale-blue))] focus:outline-none focus:border-[rgb(var(--color-mikado-yellow))] text-sm"
          >
            <option value="all">All Severities</option>
            <option value="alert">Critical</option>
            <option value="warning">Warnings</option>
          </select>

          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[rgb(var(--color-rich-black))] text-white border border-[rgb(var(--color-yale-blue))] focus:outline-none focus:border-[rgb(var(--color-mikado-yellow))] text-sm"
          >
            {uniqueDates.map(date => (
              <option key={date} value={date}>
                {date === 'all' ? 'All Dates' : date}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 rounded-lg bg-[rgb(var(--color-rich-black))] text-white border border-[rgb(var(--color-yale-blue))] hover:border-[rgb(var(--color-mikado-yellow))] transition-colors text-sm flex items-center space-x-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
          </button>
        </div>

        {/* Alerts List */}
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 bg-[rgb(var(--color-rich-black))] rounded-lg">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-300 font-medium">No alerts to display</p>
            <p className="text-sm text-gray-400 mt-1">
              {searchQuery ? 'Try adjusting your search or filters' : 'Alerts will appear here when triggered'}
            </p>
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
                    className="w-full px-4 py-3 flex items-start justify-between group hover:bg-black/10 transition-colors"
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
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <DollarSign className="h-4 w-4" />
                          <span>Current Price: ${alert.currentPrice.toFixed(2)}</span>
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
