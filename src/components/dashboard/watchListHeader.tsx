import { Plus, Filter, SortAsc, Check, X, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface WatchlistHeaderProps {
  groups: string[];
  activeGroup: string;
  onGroupChange: (group: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  filterSector: string;
  onFilterChange: (value: string) => void;
  onAddGroup: (name: string) => void;
  onDeleteGroup: (name: string) => void;
}

export function WatchlistHeader({
  groups,
  activeGroup,
  onGroupChange,
  sortBy,
  onSortChange,
  filterSector,
  onFilterChange,
  onAddGroup,
  onDeleteGroup,
}: WatchlistHeaderProps) {
  const [showInput, setShowInput] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      onAddGroup(newGroupName.trim());
      setNewGroupName('');
      setShowInput(false);
    }
  };

  const handleCancel = () => {
    setShowInput(false);
    setNewGroupName('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddGroup();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleDeleteConfirm = () => {
    onDeleteGroup(activeGroup);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="flex items-center justify-between mb-6 bg-[rgb(var(--color-rich-black))] p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="flex flex-wrap items-center gap-2">
          {groups.map(group => (
            <div key={group} className="flex items-center">
              <button
                onClick={() => onGroupChange(group)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeGroup === group
                    ? 'bg-[rgb(var(--color-mikado-yellow))] text-black'
                    : 'text-[rgb(var(--color-mikado-yellow))] hover:bg-[rgb(var(--color-yale-blue))]'
                }`}
              >
                {group}
              </button>
              {activeGroup === group && groups.length > 1 && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="ml-2 p-2 rounded-lg text-red-400 hover:bg-red-400/20 transition-colors"
                  title="Delete watchlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <div className="flex items-center space-x-2">
            {showInput ? (
              <>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter watchlist name"
                  className="px-3 py-2 rounded-lg bg-[rgb(var(--color-oxford-blue))] text-white border border-[rgb(var(--color-yale-blue))] focus:outline-none focus:border-[rgb(var(--color-mikado-yellow))] text-sm w-48"
                  autoFocus
                />
                <button
                  onClick={handleAddGroup}
                  disabled={!newGroupName.trim()}
                  className={`p-2 rounded-lg transition-colors ${
                    newGroupName.trim()
                      ? 'text-green-500 hover:bg-[rgb(var(--color-yale-blue))]'
                      : 'text-gray-500 cursor-not-allowed'
                  }`}
                  title="Confirm"
                >
                  <Check className="h-5 w-5" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-lg text-red-500 hover:bg-[rgb(var(--color-yale-blue))] transition-colors"
                  title="Cancel"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button 
                onClick={() => setShowInput(true)}
                className="p-2 rounded-lg text-[rgb(var(--color-mikado-yellow))] hover:bg-[rgb(var(--color-yale-blue))] transition-colors"
                title="Create new watchlist"
              >
                <Plus className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-[rgb(var(--color-oxford-blue))] rounded-lg px-4 py-2">
          <SortAsc className="h-4 w-4 text-[rgb(var(--color-mikado-yellow))]" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-white text-sm focus:outline-none"
          >
            <option value="symbol">Symbol</option>
            <option value="price">Price</option>
            <option value="change">% Change</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 bg-[rgb(var(--color-oxford-blue))] rounded-lg px-4 py-2">
          <Filter className="h-4 w-4 text-[rgb(var(--color-mikado-yellow))]" />
          <select
            value={filterSector}
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-transparent text-white text-sm focus:outline-none"
          >
            <option value="all">All Sectors</option>
            <option value="Technology">Technology</option>
            <option value="Consumer">Consumer</option>
          </select>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[rgb(var(--color-rich-black))] p-6 rounded-lg border border-[rgb(var(--color-yale-blue))] max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Watchlist</h3>
            <p className="text-gray-400 mb-4">
              Are you sure you want to delete "{activeGroup}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg text-white hover:bg-[rgb(var(--color-yale-blue))] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}