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
    <div className="relative backdrop-blur-sm bg-[rgb(var(--color-oxford-blue))]/90 rounded-xl shadow-2xl border border-[rgb(var(--color-yale-blue))] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-yale-blue))]/10 to-transparent pointer-events-none" />

      <div className="relative p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-[rgb(var(--color-mikado-yellow))]/20 rounded-full blur" />
              <Bell className="relative h-7 w-7 text-[rgb(var(--color-mikado-yellow))]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Alert History</h2>
              <div className="flex items-center mt-1 space-x-2">
                {isConnected ? (
                  <div className="flex items-center space-x-1.5 text-emerald-400">
                    <Wifi className="h-4 w-4" />
                    <span className="text-xs font-medium">Live Updates Active</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5 text-red-400">
                    <WifiOff className="h-4 w-4" />
                    <span className="text-xs font-medium">Reconnecting...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              className="p-2.5 rounded-lg bg-[rgb(var(--color-rich-black))]/80 text-[rgb(var(--color-mikado-yellow))] border border-[rgb(var(--color-yale-blue))] hover:border-[rgb(var(--color-mikado-yellow))] transition-all duration-200"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

            {filteredAlerts.length >= 2 && (
              <button
                onClick={Object.keys(isExpanded).length ? collapseAll : expandAll}
                className="px-4 py-2 rounded-lg bg-[rgb(var(--color-rich-black))]/80 text-white border border-[rgb(var(--color-yale-blue))] hover:border-[rgb(var(--color-mikado-yellow))] transition-all duration-200 text-sm font-medium"
              >
                {Object.keys(isExpanded).length ? 'Collapse All' : 'Expand All'}
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alerts..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[rgb(var(--color-rich-black))]/80 text-white border border-[rgb(var(--color-yale-blue))] focus:outline-none focus:border-[rgb(var(--color-mikado-yellow))] focus:ring-2 focus:ring-[rgb(var(--color-mikado-yellow))]/20 transition-all duration-200 text-sm"
            />
          </div>

          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-[rgb(var(--color-rich-black))]/80 text-white border border-[rgb(var(--color-yale-blue))] focus:outline-none focus:border-[rgb(var(--color-mikado-yellow))] focus:ring-2 focus:ring-[rgb(var(--color-mikado-yellow))]/20 transition-all duration-200 text-sm"
          >
            <option value="all">All Severities</option>
            <option value="alert">Critical</option>
            <option value="warning">Warnings</option>
          </select>

          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-[rgb(var(--color-rich-black))]/80 text-white border border-[rgb(var(--color-yale-blue))] focus:outline-none focus:border-[rgb(var(--color-mikado-yellow))] focus:ring-2 focus:ring-[rgb(var(--color-mikado-yellow))]/20 transition-all duration-200 text-sm"
          >
            {uniqueDates.map(date => (
              <option key={date} value={date}>
                {date === 'all' ? 'All Dates' : date}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2.5 rounded-lg bg-[rgb(var(--color-rich-black))]/80 text-white border border-[rgb(var(--color-yale-blue))] hover:border-[rgb(var(--color-mikado-yellow))] transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
          </button>
        </div>

        {/* Alerts List */}
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-16 bg-[rgb(var(--color-rich-black))]/50 rounded-xl border border-[rgb(var(--color-yale-blue))]/50 backdrop-blur-sm">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-semibold text-white">No alerts to display</p>
            <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
              {searchQuery ? 'Try adjusting your search criteria or filters' : 'Alerts will appear here when triggered'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => {
              const isAlertExpanded = isExpanded[alert.timestamp];
              return (
                <div
                  key={index}
                  className={`group rounded-xl overflow-hidden transition-all duration-300 ${alert.severity === 'alert'
                      ? 'bg-gradient-to-r from-red-950/40 to-red-900/20 border border-red-800/50 hover:border-red-700/70'
                      : 'bg-gradient-to-r from-amber-950/40 to-amber-900/20 border border-amber-800/50 hover:border-amber-700/70'
                    }`}
                >
                  <button
                    onClick={() => toggleExpand(alert.timestamp)}
                    className="w-full px-5 py-4 flex items-start justify-between group-hover:bg-black/10 transition-all duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`mt-1 p-2 rounded-full transition-all duration-200 ${alert.severity === 'alert'
                          ? 'bg-red-500/20 group-hover:bg-red-500/30'
                          : 'bg-amber-500/20 group-hover:bg-amber-500/30'
                        }`}>
                        <Bell className={`h-5 w-5 ${alert.severity === 'alert'
                            ? 'text-red-400 group-hover:text-red-300'
                            : 'text-amber-400 group-hover:text-amber-300'
                          }`} />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-lg text-white">{alert.symbol}</span>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${alert.severity === 'alert'
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-amber-500/20 text-amber-300'
                            }`}>
                            {alert.severity === 'alert' ? 'Critical' : 'Warning'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1.5">{alert.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-400">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                      {isAlertExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                      )}
                    </div>
                  </button>

                  {isAlertExpanded && (
                    <div className="px-5 pb-5 animate-fadeIn">
                      <div className="p-4 rounded-lg bg-[rgb(var(--color-rich-black))]/60 backdrop-blur-sm space-y-3 border border-[rgb(var(--color-yale-blue))]/50">
                        <div className="flex items-center space-x-3 text-sm text-gray-300">
                          <Clock className="h-4 w-4 text-[rgb(var(--color-mikado-yellow))]" />
                          <span>Triggered at: {new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-300">
                          <DollarSign className="h-4 w-4 text-[rgb(var(--color-mikado-yellow))]" />
                          <span>Trigger Price: ${alert.triggerPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-300">
                          <DollarSign className="h-4 w-4 text-[rgb(var(--color-mikado-yellow))]" />
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