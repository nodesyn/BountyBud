'use client';

import React from 'react';
import { KEYBOARD_SHORTCUTS, KeyboardShortcut } from './KeyboardShortcuts';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            &times;
          </button>
        </div>
        
        <div className="space-y-1 mb-6">
          {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
            <KeyboardShortcut 
              key={index}
              shortcut={shortcut.shortcut}
              description={shortcut.description}
            />
          ))}
        </div>
        
        <div className="text-sm text-gray-400 mt-4">
          <p>Press <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">?</kbd> anytime to show this help.</p>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal; 