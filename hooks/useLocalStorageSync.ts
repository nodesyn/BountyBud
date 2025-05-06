import { useState, useEffect, useCallback } from 'react';

interface UseLocalStorageSyncOptions<T> {
  key: string;
  defaultValue?: T;
  deserializer?: (value: string) => T;
  serializer?: (value: T) => string;
}

type SetValue<T> = (value: T | ((val: T) => T)) => void;

export function useLocalStorageSync<T>({
  key,
  defaultValue,
  deserializer = JSON.parse,
  serializer = JSON.stringify,
}: UseLocalStorageSyncOptions<T>): [T, SetValue<T>] {
  // Initialize state from localStorage or default
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue as T;
    }
    
    try {
      const storedValue = localStorage.getItem(key);
      
      if (storedValue) {
        return deserializer(storedValue);
      }
      
      return defaultValue as T;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue as T;
    }
  });

  // Update localStorage when state changes
  const setStateAndStorage = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Support functional updates
      const valueToStore = value instanceof Function ? value(state) : value;
      
      setState(valueToStore);
      localStorage.setItem(key, serializer(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, serializer, state]);

  // Sync with other tabs via storage events
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          const newValue = deserializer(event.newValue);
          setState(newValue);
        } catch (error) {
          console.error(`Error parsing ${key} from storage event:`, error);
        }
      } else if (event.key === key && event.newValue === null) {
        // Handle item removal
        setState(defaultValue as T);
      }
    };

    // Add event listener for storage events
    window.addEventListener('storage', handleStorageChange);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, deserializer, defaultValue]);

  return [state, setStateAndStorage];
}

export default useLocalStorageSync; 