'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type PageView = {
  path: string;
  timestamp: number;
  referrer?: string;
  queryParams?: Record<string, string>;
};

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Create a pageview object
    const pageView: PageView = {
      path: pathname,
      timestamp: Date.now(),
      referrer: document.referrer || undefined,
    };

    // Add search params if they exist
    if (searchParams && searchParams.toString()) {
      const params: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      pageView.queryParams = params;
    }

    // Store the pageview in localStorage
    const analytics = localStorage.getItem('bountybudAnalytics');
    const pageViews: PageView[] = analytics ? JSON.parse(analytics) : [];
    
    // Add the new pageview
    pageViews.push(pageView);
    
    // Keep only the last 100 pageviews to avoid excessive storage use
    const trimmedPageViews = pageViews.slice(-100);
    
    // Save back to localStorage
    localStorage.setItem('bountybudAnalytics', JSON.stringify(trimmedPageViews));
    
    // In a real app, you would send this data to a server
    // For this implementation, we'll just log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Page view:', pageView);
    }
    
    // Optional: send to a real analytics service
    // This is where you'd implement integration with a service like 
    // Google Analytics, Plausible, Fathom, etc.
    
  }, [pathname, searchParams]);

  // This component doesn't render anything visible
  return null;
} 