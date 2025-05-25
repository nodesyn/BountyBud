'use client';

import React, { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

interface ShortcutProps {
  shortcut: string;
  description: string;
}

interface KeyboardShortcutsProps {
  onGenerateCommand: () => void;
  onCopyCommand: () => void;
  onToggleHistory: () => void;
  onTogglePreferences: () => void;
}

export const KeyboardShortcut: React.FC<ShortcutProps> = ({ shortcut, description }) => {
  return (
    <div className="flex justify-between items-center text-sm p-2 hover:bg-gray-800 rounded">
      <span>{description}</span>
      <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">{shortcut}</kbd>
    </div>
  );
};

export const KEYBOARD_SHORTCUTS = [
  { shortcut: 'G', description: 'Generate command' },
  { shortcut: 'C', description: 'Copy command to clipboard' },
  { shortcut: 'H', description: 'Toggle command history' },
  { shortcut: 'P', description: 'Open preferences' },
  { shortcut: 'Esc', description: 'Back to parameters' },
];

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onGenerateCommand,
  onCopyCommand,
  onToggleHistory,
  onTogglePreferences,
}) => {
  // Generate command shortcut
  useHotkeys('g', (e) => {
    e.preventDefault();
    onGenerateCommand();
  });

  // Copy command shortcut
  useHotkeys('c', (e) => {
    e.preventDefault();
    onCopyCommand();
  });

  // Toggle history shortcut
  useHotkeys('h', (e) => {
    e.preventDefault();
    onToggleHistory();
  });

  // Toggle preferences shortcut
  useHotkeys('p', (e) => {
    e.preventDefault();
    onTogglePreferences();
  });

  // Make sure keyboard shortcuts don't interfere with input fields
  useEffect(() => {
    const preventShortcutsInFields = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      
      // If we're in an input field, don't trigger shortcuts
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
        return;
      }
    };

    document.addEventListener('keydown', preventShortcutsInFields);
    
    return () => {
      document.removeEventListener('keydown', preventShortcutsInFields);
    };
  }, []);

  return null; // This component doesn't render anything, it just adds event listeners
};

export default KeyboardShortcuts; 