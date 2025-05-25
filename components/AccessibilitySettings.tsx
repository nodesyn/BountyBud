'use client';

import { useState, useEffect } from 'react';
import useTheme from '../hooks/useTheme';

type AccessibilitySettings = {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
};

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  screenReader: false,
};

export default function AccessibilitySettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const { setTheme } = useTheme();

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Apply settings on initial load
    applySettings(savedSettings ? JSON.parse(savedSettings) : defaultSettings);
  }, []);

  const applySettings = (currentSettings: AccessibilitySettings) => {
    // Apply high contrast
    if (currentSettings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply large text
    if (currentSettings.largeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }

    // Apply reduced motion
    if (currentSettings.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }

    // Apply screen reader optimizations
    if (currentSettings.screenReader) {
      document.documentElement.classList.add('screen-reader-optimized');
    } else {
      document.documentElement.classList.remove('screen-reader-optimized');
    }
  };

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
    applySettings(newSettings);
  };

  useEffect(() => {
    if (settings.screenReader) {
      document.body.setAttribute('role', 'application');
      document.body.setAttribute('aria-label', 'BountyBud Application');
      // Add focus outlines
      document.documentElement.style.setProperty('--focus-outline', '3px solid #4299e1');
    } else {
      document.body.removeAttribute('role');
      document.body.removeAttribute('aria-label');
      document.documentElement.style.setProperty('--focus-outline', 'none');
    }
  }, [settings.screenReader]);


  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Accessibility settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="px-4 py-2 text-sm text-gray-100 border-b border-gray-700">
              <h3 className="font-medium">Accessibility Settings</h3>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="high-contrast" className="block text-sm text-gray-300">
                  High Contrast
                </label>
                <input
                  type="checkbox"
                  id="high-contrast"
                  checked={settings.highContrast}
                  onChange={(e) => updateSetting('highContrast', e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="large-text" className="block text-sm text-gray-300">
                  Large Text
                </label>
                <input
                  type="checkbox"
                  id="large-text"
                  checked={settings.largeText}
                  onChange={(e) => updateSetting('largeText', e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="reduced-motion" className="block text-sm text-gray-300">
                  Reduced Motion
                </label>
                <input
                  type="checkbox"
                  id="reduced-motion"
                  checked={settings.reducedMotion}
                  onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="screen-reader" className="block text-sm text-gray-300">
                  Screen Reader Mode
                </label>
                <input
                  type="checkbox"
                  id="screen-reader"
                  checked={settings.screenReader}
                  onChange={(e) => updateSetting('screenReader', e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}