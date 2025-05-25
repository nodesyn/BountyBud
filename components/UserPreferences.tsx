'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { categories } from '../app/data/commands';
import useTheme from '../hooks/useTheme';
import useLocalStorageSync from '../hooks/useLocalStorageSync';

// Use dynamic import with SSR disabled for ErrorBoundary
const ErrorBoundary = dynamic(() => import('./ErrorBoundary'), {
  ssr: false,
});

export interface DefaultParam {
  categoryId: string;
  commandId: string;
  paramKey: string;
  value: string;
}

export interface UserPreferencesData {
  theme: 'dark' | 'light' | 'system';
  defaultDomain: string;
  defaultParams: Record<string, string>;
  savedParameters: DefaultParam[];
}

interface UserPreferencesProps {
  onClose: () => void;
  onSave: (preferences: UserPreferencesData) => void;
}

const DEFAULT_PREFERENCES: UserPreferencesData = {
  theme: 'dark',
  defaultDomain: '',
  defaultParams: {},
  savedParameters: []
};

const UserPreferencesFallback = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Preferences Error</h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white"
          aria-label="Close preferences"
        >
          &times;
        </button>
      </div>
      <div className="text-red-500 mb-4">
        There was an error loading your preferences. This might be due to corrupted data in localStorage.
      </div>
      <div className="flex justify-end space-x-3 mt-6">
        <button
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded"
          onClick={() => {
            localStorage.removeItem('userPreferences');
            window.location.reload();
          }}
        >
          Reset Preferences
        </button>
      </div>
    </div>
  </div>
);

function UserPreferencesContent({ onClose, onSave }: UserPreferencesProps) {
  const { theme, setTheme } = useTheme();
  const [preferences, setPreferences] = useLocalStorageSync<UserPreferencesData>({
    key: 'userPreferences',
    defaultValue: DEFAULT_PREFERENCES,
  });
  
  const [activeTab, setActiveTab] = useState<'general' | 'parameters'>('general');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCommand, setSelectedCommand] = useState<string>('');
  const [selectedParam, setSelectedParam] = useState<string>('');
  const [paramValue, setParamValue] = useState<string>('');

  useEffect(() => {
    // Set initial category if categories exist
    if (categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
    
    // Sync theme with the theme from our hook
    setPreferences((prev: UserPreferencesData) => ({
      ...prev,
      theme: theme
    }));
  }, []);

  // Update command when category changes
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category && category.commands.length > 0) {
        setSelectedCommand(category.commands[0].id);
      } else {
        setSelectedCommand('');
      }
    }
  }, [selectedCategory]);

  // Update param when command changes
  useEffect(() => {
    if (selectedCategory && selectedCommand) {
      const category = categories.find(cat => cat.id === selectedCategory);
      const command = category?.commands.find(cmd => cmd.id === selectedCommand);
      if (command && command.placeholders && command.placeholders.length > 0) {
        setSelectedParam(command.placeholders[0].key);
      } else {
        setSelectedParam('');
      }
    }
  }, [selectedCategory, selectedCommand]);

  const handleChangeDomain = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences((prev: UserPreferencesData) => ({
      ...prev,
      defaultDomain: e.target.value
    }));
  };

  const handleChangeTheme = (newTheme: 'dark' | 'light' | 'system') => {
    // Update both the preferences state and the theme hook
    setPreferences((prev: UserPreferencesData) => ({
      ...prev,
      theme: newTheme
    }));
    setTheme(newTheme);
  };

  const handleAddDefaultParam = () => {
    if (!selectedCategory || !selectedCommand || !selectedParam || !paramValue) return;
    
    const newParam: DefaultParam = {
      categoryId: selectedCategory,
      commandId: selectedCommand,
      paramKey: selectedParam,
      value: paramValue
    };
    
    // Create a unique key for this parameter combination
    const paramKey = `${selectedCategory}:${selectedCommand}:${selectedParam}`;
    
    setPreferences((prev: UserPreferencesData) => {
      // Update defaultParams in a backward-compatible way
      const updatedDefaultParams = { ...prev.defaultParams };
      updatedDefaultParams[paramKey] = paramValue;
      
      // Add to savedParameters array for better UI display
      const updatedSavedParameters = [...prev.savedParameters];
      const existingIndex = updatedSavedParameters.findIndex(
        p => p.categoryId === selectedCategory && p.commandId === selectedCommand && p.paramKey === selectedParam
      );
      
      if (existingIndex >= 0) {
        // Update existing parameter
        updatedSavedParameters[existingIndex] = newParam;
      } else {
        // Add new parameter
        updatedSavedParameters.push(newParam);
      }
      
      return {
        ...prev,
        defaultParams: updatedDefaultParams,
        savedParameters: updatedSavedParameters
      };
    });
    
    // Reset the param value input
    setParamValue('');
  };

  const handleRemoveDefaultParam = (index: number) => {
    const param = preferences.savedParameters[index];
    if (!param) return;
    
    // Create a unique key for this parameter combination
    const paramKey = `${param.categoryId}:${param.commandId}:${param.paramKey}`;
    
    setPreferences((prev: UserPreferencesData) => {
      // Remove from defaultParams
      const updatedDefaultParams = { ...prev.defaultParams };
      delete updatedDefaultParams[paramKey];
      
      // Remove from savedParameters array
      const updatedSavedParameters = [...prev.savedParameters];
      updatedSavedParameters.splice(index, 1);
      
      return {
        ...prev,
        defaultParams: updatedDefaultParams,
        savedParameters: updatedSavedParameters
      };
    });
  };

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  // Helper function to get parameter name for display
  const getParameterDisplayName = (param: DefaultParam) => {
    const category = categories.find(cat => cat.id === param.categoryId);
    const command = category?.commands.find(cmd => cmd.id === param.commandId);
    const placeholder = command?.placeholders?.find(p => p.key === param.paramKey);
    
    return {
      categoryName: category?.name || param.categoryId,
      commandName: command?.name || param.commandId,
      paramName: placeholder?.description || param.paramKey
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">User Preferences</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            &times;
          </button>
        </div>

        <div className="mb-6">
          <div className="flex border-b border-gray-700">
            <button
              className={`px-4 py-2 ${activeTab === 'general' ? 'border-b-2 border-primary text-primary' : 'text-gray-400'}`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'parameters' ? 'border-b-2 border-primary text-primary' : 'text-gray-400'}`}
              onClick={() => setActiveTab('parameters')}
            >
              Default Parameters
            </button>
          </div>
        </div>

        {activeTab === 'general' ? (
          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <h3 className="text-lg font-medium mb-3">Theme</h3>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    checked={preferences.theme === 'dark'}
                    onChange={() => handleChangeTheme('dark')}
                    className="form-radio"
                  />
                  <span>Dark</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    checked={preferences.theme === 'light'}
                    onChange={() => handleChangeTheme('light')}
                    className="form-radio"
                  />
                  <span>Light</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    checked={preferences.theme === 'system'}
                    onChange={() => handleChangeTheme('system')}
                    className="form-radio"
                  />
                  <span>System</span>
                </label>
              </div>
            </div>

            {/* Default Domain */}
            <div>
              <h3 className="text-lg font-medium mb-3">Default Domain</h3>
              <input
                type="text"
                placeholder="example.com"
                value={preferences.defaultDomain}
                onChange={handleChangeDomain}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-sm text-gray-400 mt-1">
                This domain will be pre-filled when you open the command generator.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Add Default Parameter</h3>
              <div className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm mb-1">Tool Category</label>
                  <select 
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Command Selection */}
                <div>
                  <label className="block text-sm mb-1">Command</label>
                  <select 
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    value={selectedCommand}
                    onChange={(e) => setSelectedCommand(e.target.value)}
                    disabled={!selectedCategory}
                  >
                    {selectedCategory && categories
                      .find(cat => cat.id === selectedCategory)
                      ?.commands.map(command => (
                        <option key={command.id} value={command.id}>
                          {command.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                {/* Parameter Selection */}
                <div>
                  <label className="block text-sm mb-1">Parameter</label>
                  <select 
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    value={selectedParam}
                    onChange={(e) => setSelectedParam(e.target.value)}
                    disabled={!selectedCommand}
                  >
                    {selectedCategory && selectedCommand && categories
                      .find(cat => cat.id === selectedCategory)
                      ?.commands.find(cmd => cmd.id === selectedCommand)
                      ?.placeholders?.filter(p => p.key !== 'domain')
                      .map(placeholder => (
                        <option key={placeholder.key} value={placeholder.key}>
                          {placeholder.description}
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                {/* Parameter Value */}
                <div>
                  <label className="block text-sm mb-1">Default Value</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      value={paramValue}
                      onChange={(e) => setParamValue(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 bg-primary hover:bg-primary-dark rounded"
                      onClick={handleAddDefaultParam}
                      disabled={!selectedParam || !paramValue}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Saved Parameters List */}
            <div>
              <h3 className="text-lg font-medium mb-3">Saved Default Parameters</h3>
              {preferences.savedParameters.length === 0 ? (
                <p className="text-sm text-gray-400">No default parameters saved yet.</p>
              ) : (
                <ul className="space-y-2 max-h-[200px] overflow-y-auto">
                  {preferences.savedParameters.map((param, index) => {
                    const { categoryName, commandName, paramName } = getParameterDisplayName(param);
                    return (
                      <li key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded">
                        <div>
                          <div className="text-sm font-medium">{paramName}</div>
                          <div className="text-xs text-gray-400">{commandName} ({categoryName})</div>
                          <div className="text-xs text-primary mt-1">Default: {param.value}</div>
                        </div>
                        <button
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => handleRemoveDefaultParam(index)}
                          title="Remove"
                        >
                          ×
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 rounded bg-primary hover:bg-primary-dark"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserPreferences(props: UserPreferencesProps) {
  return (
    <ErrorBoundary fallback={<UserPreferencesFallback onClose={props.onClose} />}>
      <UserPreferencesContent {...props} />
    </ErrorBoundary>
  );
} 