import { useState, useEffect } from 'react';
import { WindowsApp } from '@/lib/types';

interface UseWindowsAppsOptions {
  category?: string;
}

export function useWindowsApps({ category }: UseWindowsAppsOptions = {}) {
  const [apps, setApps] = useState<WindowsApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = category 
          ? `/api/windows-apps?category=${encodeURIComponent(category)}`
          : '/api/windows-apps';
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch Windows apps');
        }
        
        const data = await response.json();
        setApps(data.apps);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching Windows apps:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [category]);

  return { apps, loading, error };
} 