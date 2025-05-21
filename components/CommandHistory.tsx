'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import useLocalStorageSync from '../hooks/useLocalStorageSync';
import useCommandSearch from '../hooks/useCommandSearch';
import CommandOutput from './CommandOutput';

// Use dynamic import with SSR disabled for ErrorBoundary
const ErrorBoundary = dynamic(() => import('./ErrorBoundary'), {
  ssr: false,
});

export interface CommandHistoryItem {
  id: string;
  command: string;
  timestamp: number;
  category: string;
  name: string;
  isFavorite: boolean;
}

interface CommandHistoryProps {
  onSelectCommand: (command: string) => void;
  onClearHistory: () => void;
}

const CommandHistoryFallback = () => (
  <div className="card">
    <h2 className="text-xl font-semibold mb-4">Command History</h2>
    <p className="text-red-500">
      There was an error loading your command history. This might be due to corrupted data in localStorage.
    </p>
    <button
      className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-800 rounded"
      onClick={() => {
        localStorage.removeItem('commandHistory');
        window.location.reload();
      }}
    >
      Clear History Data
    </button>
  </div>
);

function CommandHistoryContent({ onSelectCommand, onClearHistory }: CommandHistoryProps) {
  const [history, setHistory] = useLocalStorageSync<CommandHistoryItem[]>({
    key: 'commandHistory',
    defaultValue: [],
  });
  
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Use the search hook
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    isSearching 
  } = useCommandSearch({
    commandHistory: history,
    debounceMs: 200,
  });
  
  // Filter history based on favorites toggle and search results
  const filteredHistory = showFavoritesOnly 
    ? searchResults.filter(item => item.isFavorite)
    : searchResults;
  
  // Toggle favorite status for an item
  const toggleFavorite = (id: string) => {
    const updatedHistory = history.map(item => 
      item.id === id ? {...item, isFavorite: !item.isFavorite} : item
    );
    setHistory(updatedHistory);
  };
  
  // Remove an item from history
  const removeFromHistory = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
  };
  
  // Clear all history
  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your command history?')) {
      setHistory([]);
      onClearHistory();
    }
  };
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Command History</h2>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 rounded-md ${showFavoritesOnly ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            aria-pressed={showFavoritesOnly}
            aria-label={showFavoritesOnly ? "Show all commands" : "Show favorites only"}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Favorites
            </span>
          </button>
          <button 
            className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700"
            onClick={clearHistory}
            aria-label="Clear all history"
          >
            Clear All
          </button>
        </div>
      </div>
      
      {/* Search input */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search commands..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search commands"
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {isSearching && <p className="text-xs text-gray-400 mt-1">Searching...</p>}
      </div>
      
      {filteredHistory.length === 0 ? (
        <p className="text-gray-400">
          {searchQuery 
            ? 'No matching commands found.' 
            : showFavoritesOnly 
              ? 'No favorite commands yet.' 
              : 'No command history yet.'
          }
        </p>
      ) : (
        <ul className="space-y-3">
          {filteredHistory.map((item) => (
            <li key={item.id} className={`bg-gray-800 p-3 rounded-md border-l-4 ${item.isFavorite ? 'border-yellow-400' : 'border-transparent'} transition-colors`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold flex items-center">
                    {item.name}
                    {item.isFavorite && (
                      <span className="inline-block ml-2 text-yellow-400 animate-pulse-subtle">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className={`transition-transform transform ${item.isFavorite ? 'text-yellow-400 scale-110' : 'text-gray-500 hover:scale-110'}`}
                    onClick={() => toggleFavorite(item.id)}
                    aria-label={item.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    aria-pressed={item.isFavorite}
                  >
                    <svg className="w-5 h-5" fill={item.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <button 
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => removeFromHistory(item.id)}
                    aria-label="Remove from history"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <CommandOutput output={item.command} language="bash" />
              <button 
                className="mt-2 text-sm text-primary hover:underline"
                onClick={() => onSelectCommand(item.command)}
                aria-label="Use this command"
              >
                Use this command
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CommandHistory(props: CommandHistoryProps) {
  return (
    <ErrorBoundary fallback={<CommandHistoryFallback />}>
      <CommandHistoryContent {...props} />
    </ErrorBoundary>
  );
} 