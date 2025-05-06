'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
}

// For iOS Safari standalone detection
interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

export default function PWAInstallPrompt() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (typeof window !== 'undefined') {
      const installed = localStorage.getItem('bountybudInstalled') === 'true';
      setIsInstalled(installed);
      
      // Check if it's in standalone mode or app mode
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as NavigatorStandalone).standalone === true) {
        setIsInstalled(true);
      }
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e as BeforeInstallPromptEvent);
    };
    
    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setSupportsPWA(false);
      setIsInstalled(true);
      localStorage.setItem('bountybudInstalled', 'true');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!promptInstall) return;
    
    promptInstall.prompt();
    promptInstall.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  if (!supportsPWA || isInstalled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        id="install-button"
        className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg shadow-lg flex items-center space-x-2 transition-all"
        onClick={handleInstallClick}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" 
            clipRule="evenodd" 
          />
        </svg>
        <span>Install App</span>
      </button>
    </div>
  );
} 