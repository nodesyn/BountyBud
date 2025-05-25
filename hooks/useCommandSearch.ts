import { useState, useEffect, useMemo } from 'react';
import fuzzysort from 'fuzzysort';

// Define the shape of a command history item
interface CommandHistoryItem {
  id: string;
  command: string;
  timestamp: number;
  category: string;
  name: string;
  isFavorite: boolean;
}

interface UseCommandSearchProps {
  commandHistory: CommandHistoryItem[];
  debounceMs?: number;
}

interface UseCommandSearchResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: CommandHistoryItem[];
  isSearching: boolean;
}

const useCommandSearch = ({
  commandHistory,
  debounceMs = 200,
}: UseCommandSearchProps): UseCommandSearchResult => {
  const [searchQuery, setSearchQueryInternal] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query to reduce search operations during typing
  useEffect(() => {
    setIsSearching(true);
    
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, debounceMs);
    
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, debounceMs]);

  // Perform the actual search using fuzzysort
  const searchResults = useMemo(() => {
    if (!debouncedQuery) {
      return commandHistory;
    }

    const results = fuzzysort.go(debouncedQuery, commandHistory, {
      keys: ['command', 'name', 'category'],
      threshold: -10000, // Lower threshold means more permissive matching
    });
    
    return results.map(result => result.obj);
  }, [debouncedQuery, commandHistory]);

  // Exposed search query setter
  const setSearchQuery = (query: string) => {
    setSearchQueryInternal(query);
    
    if (!query) {
      setIsSearching(false);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
  };
};

export default useCommandSearch; 