// hooks/useViews.ts
import { useState, useEffect, useRef } from 'react';

interface UseViewsResult {
  views: number;
  isLoading: boolean;
  error: Error | null;
}

export function useViews(issueId: string, initialViews: number = 0): UseViewsResult {
  const [views, setViews] = useState(initialViews);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (!issueId || hasIncremented.current) return;

    const incrementViews = async () => {
      setIsLoading(true);
      try {
        console.log('Attempting to increment views for:', issueId);
        
        const response = await fetch(`/api/issue/increment-views/${issueId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });

        const data = await response.json();
        console.log('Response:', data);

        if (!response.ok) {
          throw new Error(data.message || 'Failed to increment view count');
        }

        if (data.views !== undefined) {
          setViews(data.views);
        } else {
          setViews(prev => prev + 1);
        }
        
        hasIncremented.current = true;
      } catch (err) {
        console.error('Error in useViews:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        hasIncremented.current = false;
      } finally {
        setIsLoading(false);
      }
    };

    incrementViews();
  }, [issueId]);

  return { views, isLoading, error };
}
