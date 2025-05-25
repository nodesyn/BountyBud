import { useState, useCallback } from 'react';
import ErrorBoundary from './ErrorBoundary';

type BoundaryComponentType = React.ComponentType<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}>;

interface ErrorBoundaryHookReturn {
  ErrorBoundary: BoundaryComponentType;
  error: Error | null;
  resetError: () => void;
}

/**
 * A hook that provides an ErrorBoundary component and methods to handle errors.
 * This is useful for function components that need to catch and handle errors.
 * 
 * Usage:
 * ```
 * const { ErrorBoundary, error, resetError } = useErrorBoundary();
 * 
 * return (
 *   <ErrorBoundary>
 *     <YourComponent />
 *   </ErrorBoundary>
 * );
 * ```
 */
export function useErrorBoundary(): ErrorBoundaryHookReturn {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((err: Error) => {
    setError(err);
  }, []);

  // Create a customized ErrorBoundary component with the error handling logic
  const BoundaryWithHandler: BoundaryComponentType = useCallback(
    ({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) => (
      <ErrorBoundary
        onError={handleError}
        fallback={
          fallback || (
            <div className="p-4 bg-red-900 text-white rounded-md">
              <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
              {error && (
                <details className="mt-2">
                  <summary className="cursor-pointer">Error details</summary>
                  <pre className="mt-2 p-2 bg-gray-900 text-gray-300 overflow-auto text-sm rounded">
                    {error.toString()}
                  </pre>
                </details>
              )}
              <button
                className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-800 rounded"
                onClick={resetError}
              >
                Try again
              </button>
            </div>
          )
        }
      >
        {children}
      </ErrorBoundary>
    ),
    [error, handleError, resetError]
  );

  return {
    ErrorBoundary: BoundaryWithHandler,
    error,
    resetError,
  };
} 