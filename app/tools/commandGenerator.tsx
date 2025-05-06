'use client';

import React, { useState, useEffect } from 'react';
import { categories, Command, Placeholder } from '../data/commands';
import CommandHistory, { CommandHistoryItem } from '../../components/CommandHistory';
import UserPreferences, { UserPreferencesData, DefaultParam } from '../../components/UserPreferences';
import { v4 as uuidv4 } from 'uuid';
import KeyboardShortcuts from '../../components/KeyboardShortcuts';
import KeyboardShortcutsModal from '../../components/KeyboardShortcutsModal';
import CommandChain, { ChainedCommand } from '../../components/CommandChain';
import { useHotkeys } from 'react-hotkeys-hook';

// Add validation patterns for common inputs
const validationPatterns = {
  domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
  ipAddress: /^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/,
  port: /^([1-9][0-9]{0,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
  portRange: /^([1-9][0-9]{0,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])(-([1-9][0-9]{0,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/,
  portList: /^([1-9][0-9]{0,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])(,([1-9][0-9]{0,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))*$/,
  wordlist: /^([\/~])?([a-zA-Z0-9_\-\.\/]+)$/,
  threads: /^([1-9][0-9]{0,3})$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  path: /^([\/~])?([a-zA-Z0-9_\-\.\/]+)$/,
  positiveNumber: /^[1-9]\d*$/,
  alphanumeric: /^[a-zA-Z0-9]+$/
};

export default function CommandGenerator() {
  const [domain, setDomain] = useState('');
  const [generatedCommand, setGeneratedCommand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('subdomain-enumeration');
  const [selectedCommand, setSelectedCommand] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({});
  const [showHistory, setShowHistory] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isCommandGenerated, setIsCommandGenerated] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferencesData>({
    theme: 'dark',
    defaultDomain: '',
    defaultParams: {},
    savedParameters: []
  });
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showCommandChain, setShowCommandChain] = useState(false);
  const [commandChain, setCommandChain] = useState<ChainedCommand[]>([]);
  const [showScriptPreview, setShowScriptPreview] = useState(false);
  const [scriptContent, setScriptContent] = useState('');
  const [notification, setNotification] = useState<{message: string, visible: boolean}>({
    message: '',
    visible: false
  });
  // Add validation state for fields
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [domainError, setDomainError] = useState<string>('');
  
  // Find the current category
  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  
  // Load user preferences on initial render
  useEffect(() => {
    const storedPrefs = localStorage.getItem('userPreferences');
    if (storedPrefs) {
      const prefs = JSON.parse(storedPrefs) as UserPreferencesData;
      // Ensure savedParameters exists for backward compatibility
      if (!prefs.savedParameters) {
        prefs.savedParameters = [];
      }
      setUserPreferences(prefs);
      
      // Apply default domain if available
      if (prefs.defaultDomain && !domain) {
        setDomain(prefs.defaultDomain);
      }
    }
  }, []);
  
  // Check for URL parameters or localStorage domain on initial load
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Get domain from URL query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const urlDomain = urlParams.get('domain');
      
      // Get domain from localStorage (set by QuickStart on homepage)
      const storedDomain = localStorage.getItem('quickStartDomain');
      
      let domainToUse = '';
      
      // Use URL parameter first, then localStorage, then user preferences
      if (urlDomain) {
        domainToUse = urlDomain;
        setDomain(urlDomain);
        // Clear the URL parameter
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (storedDomain) {
        domainToUse = storedDomain;
        setDomain(storedDomain);
        // Clear from localStorage after using
        localStorage.removeItem('quickStartDomain');
      } else if (userPreferences.defaultDomain && !domain) {
        domainToUse = userPreferences.defaultDomain;
        setDomain(userPreferences.defaultDomain);
      }
      
      // If we have a domain from any source, set up for a basic subdomain enumeration command
      if (domainToUse) {
        // Find the subdomain enumeration category
        const subdomainCat = categories.find(cat => cat.id === 'subdomain-enumeration');
        
        // Set the category to subdomain enumeration
        setSelectedCategory('subdomain-enumeration');
        
        if (subdomainCat && subdomainCat.commands.length > 0) {
          setSelectedCommand(subdomainCat.commands[0].id);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Auto-generate command if domain is set from URL or localStorage
  useEffect(() => {
    if (domain && selectedCommand && categories.some(cat => cat.id === selectedCategory)) {
      // Small delay to ensure all state has been updated
      const timer = setTimeout(() => {
        handleAutoGenerateCommand();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, selectedCategory, selectedCommand]);
  
  // Initialize the selected command when the category changes
  useEffect(() => {
    if (currentCategory && currentCategory.commands.length > 0) {
      setSelectedCommand(currentCategory.commands[0].id);
      // Reset placeholder values when category changes
      setPlaceholderValues({});
      setIsCommandGenerated(false);
    }
  }, [selectedCategory]);
  
  // Find the current command
  const currentCommand = currentCategory?.commands.find(cmd => cmd.id === selectedCommand);

  // Apply default parameters when command changes
  useEffect(() => {
    if (!currentCommand) return;
    
    setPlaceholderValues({});
    setIsCommandGenerated(false);
    
    // Apply default parameters if available
    if (userPreferences.savedParameters.length > 0) {
      const newPlaceholderValues: Record<string, string> = {};
      
      // For each placeholder in the command, check if there's a saved default value
      currentCommand.placeholders?.forEach(placeholder => {
        if (placeholder.key === 'domain') return; // Skip domain as it's handled separately
        
        // Find if there's a default value for this parameter
        const savedParam = userPreferences.savedParameters.find(
          p => p.categoryId === selectedCategory && 
               p.commandId === selectedCommand && 
               p.paramKey === placeholder.key
        );
        
        if (savedParam) {
          newPlaceholderValues[placeholder.key] = savedParam.value;
        }
      });
      
      if (Object.keys(newPlaceholderValues).length > 0) {
        setPlaceholderValues(newPlaceholderValues);
      }
    }
  }, [selectedCommand, selectedCategory, userPreferences.savedParameters]);

  // Enhanced placeholder change handler with validation
  const handlePlaceholderChange = (key: string, value: string) => {
    // Update value immediately for responsive UI
    setPlaceholderValues(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Clear any previous error for this field
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
    
    // Validate based on current command's placeholder type and format
    if (!currentCommand) return;
    
    const placeholder = currentCommand.placeholders?.find(p => p.key === key);
    if (!placeholder) return;
    
    // Skip validation if field is empty and not required
    if (!value && !placeholder.required) return;
    
    // Perform validation based on placeholder type or key
    validateField(key, value, placeholder);
  };

  // Validate domain field
  const validateDomain = (value: string) => {
    if (!value) {
      setDomainError('Domain is required');
      return false;
    }
    
    if (!validationPatterns.domain.test(value)) {
      setDomainError('Please enter a valid domain (e.g., example.com)');
      return false;
    }
    
    setDomainError('');
    return true;
  };

  // Validate a specific field
  const validateField = (key: string, value: string, placeholder: Placeholder) => {
    // Skip validation for empty non-required fields
    if (!value && !placeholder.required) return true;
    
    // Required field validation
    if (!value && placeholder.required) {
      setValidationErrors(prev => ({
        ...prev,
        [key]: `${placeholder.description} is required`
      }));
      return false;
    }
    
    // Type-specific validation
    if (placeholder.type === 'number') {
      if (!/^\d+$/.test(value)) {
        setValidationErrors(prev => ({
          ...prev,
          [key]: `${placeholder.description} must be a number`
        }));
        return false;
      }
      
      // Check numeric range if specified in the description
      // For example, if description contains "between 1-100"
      const rangeMatch = placeholder.description.match(/between (\d+)-(\d+)/i);
      if (rangeMatch) {
        const min = parseInt(rangeMatch[1]);
        const max = parseInt(rangeMatch[2]);
        const numValue = parseInt(value);
        
        if (numValue < min || numValue > max) {
          setValidationErrors(prev => ({
            ...prev,
            [key]: `Value must be between ${min} and ${max}`
          }));
          return false;
        }
      }
    }
    
    // Pattern-based validation based on key name
    if (key.includes('port') && key !== 'ports') {
      if (!validationPatterns.port.test(value)) {
        setValidationErrors(prev => ({
          ...prev,
          [key]: 'Port must be between 1-65535'
        }));
        return false;
      }
    } else if (key === 'ports') {
      if (!validationPatterns.portList.test(value)) {
        setValidationErrors(prev => ({
          ...prev,
          [key]: 'Ports must be comma-separated numbers between 1-65535'
        }));
        return false;
      }
    } else if (key === 'ip' || key.includes('ipaddress')) {
      if (!validationPatterns.ipAddress.test(value)) {
        setValidationErrors(prev => ({
          ...prev,
          [key]: 'Please enter a valid IP address'
        }));
        return false;
      }
    } else if (key.includes('path') || key.includes('wordlist') || key.includes('file')) {
      if (!validationPatterns.path.test(value)) {
        setValidationErrors(prev => ({
          ...prev,
          [key]: 'Please enter a valid file path'
        }));
        return false;
      }
    } else if (key.includes('threads')) {
      if (!validationPatterns.threads.test(value)) {
        setValidationErrors(prev => ({
          ...prev,
          [key]: 'Threads should be a positive number (1-9999)'
        }));
        return false;
      }
    } else if (key.includes('url')) {
      if (!validationPatterns.url.test(value)) {
        setValidationErrors(prev => ({
          ...prev,
          [key]: 'Please enter a valid URL'
        }));
        return false;
      }
    }
    
    return true;
  };

  // Enhanced command generation with comprehensive validation
  const handleGenerateCommand = () => {
    if (!currentCommand) return;
    
    // Validate domain if required
    let isValid = true;
    if (currentCommand.command.includes('{domain}')) {
      isValid = validateDomain(domain);
    }
    
    // Validate all required placeholders
    if (currentCommand.placeholders) {
      // Clear all validation errors first
      setValidationErrors({});
      
      const newErrors: Record<string, string> = {};
      
      currentCommand.placeholders.forEach(placeholder => {
        if (placeholder.key === 'domain') return; // Domain is handled separately
        
        const value = placeholderValues[placeholder.key] || '';
        
        // Skip validation for empty non-required fields
        if (!value && !placeholder.required) return;
        
        // Check required fields
        if (!value && placeholder.required) {
          newErrors[placeholder.key] = `${placeholder.description} is required`;
          isValid = false;
          return;
        }
        
        // Validate field based on type and key
        if (!validateField(placeholder.key, value, placeholder)) {
          isValid = false;
        }
      });
      
      // Update validation errors state
      if (Object.keys(newErrors).length > 0) {
        setValidationErrors(newErrors);
      }
    }
    
    // Stop if validation failed
    if (!isValid) {
      // Show a notification for validation errors
      setNotification({
        message: "Please fix validation errors before generating the command",
        visible: true
      });
      setTimeout(() => {
        setNotification({ message: '', visible: false });
      }, 3000);
      return;
    }
    
    // Initialize with domain if it's the only placeholder
    if (domain && (!currentCommand.placeholders || currentCommand.placeholders.length === 0 || 
        (currentCommand.placeholders.length === 1 && currentCommand.placeholders[0].key === 'domain'))) {
      let cmd = currentCommand.command.replace(/{domain}/g, domain);
      setGeneratedCommand(cmd);
      setIsCommandGenerated(true);
      saveToHistory(cmd);
      return;
    }
    
    // Replace all placeholders in the command
    let finalCommand = currentCommand.command;
    
    // Replace domain placeholder if it exists
    if (domain && finalCommand.includes('{domain}')) {
      finalCommand = finalCommand.replace(/{domain}/g, domain);
    }
    
    // Replace other placeholders
    currentCommand.placeholders?.forEach(placeholder => {
      const value = placeholderValues[placeholder.key] || placeholder.defaultValue || '';
      finalCommand = finalCommand.replace(new RegExp(`{${placeholder.key}}`, 'g'), value);
    });
    
    setGeneratedCommand(finalCommand);
    setIsCommandGenerated(true);
    saveToHistory(finalCommand);
    setIsCopied(false);
  };

  const handleAutoGenerateCommand = () => {
    if (domain && currentCommand) {
      handleGenerateCommand();
    }
  };

  const saveToHistory = (commandText: string) => {
    if (!currentCommand) return;
    
    // Create a new history item
    const newItem: CommandHistoryItem = {
      id: uuidv4(),
      command: commandText,
      timestamp: Date.now(),
      category: currentCategory?.id || '',
      name: currentCommand.name,
      isFavorite: false
    };
    
    // Get existing history
    const existingHistory = localStorage.getItem('commandHistory');
    let history: CommandHistoryItem[] = existingHistory ? JSON.parse(existingHistory) : [];
    
    // Add new item to history (limited to last 50 items)
    history = [newItem, ...history].slice(0, 50);
    
    // Save back to localStorage
    localStorage.setItem('commandHistory', JSON.stringify(history));
  };

  const handleCopyCommand = () => {
    if (generatedCommand) {
      navigator.clipboard.writeText(generatedCommand);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleBackToForm = () => {
    setIsCommandGenerated(false);
  };

  const handleSelectFromHistory = (command: string) => {
    setGeneratedCommand(command);
    setIsCommandGenerated(true);
    setIsCopied(false);
  };

  const handleClearHistory = () => {
    // This is handled in the CommandHistory component itself
  };

  const handleSavePreferences = (preferences: UserPreferencesData) => {
    setUserPreferences(preferences);
    
    // Apply default domain if changed and current domain is empty
    if (preferences.defaultDomain && !domain) {
      setDomain(preferences.defaultDomain);
    }
    
    // Update placeholder values with any new defaults for the current command
    if (currentCommand && preferences.savedParameters.length > 0) {
      const updatedPlaceholderValues = { ...placeholderValues };
      let hasUpdates = false;
      
      currentCommand.placeholders?.forEach(placeholder => {
        if (placeholder.key === 'domain') return; // Skip domain
        
        // Find if there's a default value for this parameter
        const savedParam = preferences.savedParameters.find(
          p => p.categoryId === selectedCategory && 
               p.commandId === selectedCommand && 
               p.paramKey === placeholder.key
        );
        
        if (savedParam && (!updatedPlaceholderValues[placeholder.key] || 
            updatedPlaceholderValues[placeholder.key] === placeholderValues[placeholder.key])) {
          updatedPlaceholderValues[placeholder.key] = savedParam.value;
          hasUpdates = true;
        }
      });
      
      if (hasUpdates) {
        setPlaceholderValues(updatedPlaceholderValues);
      }
    }
    
    // Apply theme (in a real app, you'd have more theme handling logic)
    // This is simplified for the demo
    document.documentElement.classList.toggle('light-mode', preferences.theme === 'light');
  };

  // Helper function to check if a parameter has a saved default value
  const hasDefaultValue = (paramKey: string): boolean => {
    return userPreferences.savedParameters.some(
      p => p.categoryId === selectedCategory && 
           p.commandId === selectedCommand && 
           p.paramKey === paramKey
    );
  };

  // Register the keyboard shortcut to show/hide keyboard shortcuts dialog
  useHotkeys('?', (e) => {
    e.preventDefault();
    setShowKeyboardShortcuts(!showKeyboardShortcuts);
  }, [showKeyboardShortcuts]);

  // Function to handle adding a command to the chain
  const handleAddToChain = () => {
    if (!currentCommand || !generatedCommand) return;
    
    const newChainedCommand: ChainedCommand = {
      id: uuidv4(),
      name: currentCommand.name,
      command: generatedCommand,
      category: currentCategory?.name || '',
    };
    
    setCommandChain(prev => [...prev, newChainedCommand]);
    setShowCommandChain(true);
  };

  // Function to handle removing a command from the chain
  const handleRemoveFromChain = (index: number) => {
    setCommandChain(prev => {
      const newChain = [...prev];
      newChain.splice(index, 1);
      return newChain;
    });
  };

  // Function to handle reordering commands in the chain
  const handleReorderCommands = (startIndex: number, endIndex: number) => {
    setCommandChain(prev => {
      const newChain = [...prev];
      const [removed] = newChain.splice(startIndex, 1);
      newChain.splice(endIndex, 0, removed);
      return newChain;
    });
  };

  // Function to execute the command chain
  const handleCopyChainAsScript = () => {
    if (commandChain.length === 0) return;
    
    // Create a bash script with the commands
    let script = "#!/bin/bash\n\n";
    script += "# BountyBud Command Chain\n";
    script += `# Generated on ${new Date().toLocaleString()}\n\n`;
    
    // Add commands with comments
    commandChain.forEach((cmd, index) => {
      script += `# Command ${index + 1}: ${cmd.name}\n`;
      script += `# Category: ${cmd.category}\n`;
      script += `${cmd.command}\n\n`;
    });
    
    // Set the script content and show the preview
    setScriptContent(script);
    setShowScriptPreview(true);
  };

  // Function to copy script to clipboard
  const copyScriptToClipboard = () => {
    try {
      // Modern clipboard API
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(scriptContent)
          .then(() => {
            // Show notification
            setNotification({
              message: "Script copied to clipboard!",
              visible: true
            });
            setTimeout(() => {
              setNotification({ message: '', visible: false });
            }, 3000);
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
            // Show error notification
            setNotification({
              message: "Failed to copy to clipboard",
              visible: true
            });
            setTimeout(() => {
              setNotification({ message: '', visible: false });
            }, 3000);
          });
      } else {
        console.error('Clipboard API not available');
        // Show error notification
        setNotification({
          message: "Clipboard access not available",
          visible: true
        });
        setTimeout(() => {
          setNotification({ message: '', visible: false });
        }, 3000);
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      // Show error notification
      setNotification({
        message: "Error copying to clipboard",
        visible: true
      });
      setTimeout(() => {
        setNotification({ message: '', visible: false });
      }, 3000);
    }
  };

  // Function to download script as a file
  const downloadScript = () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([scriptContent], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `bountybud_script_${new Date().toISOString().slice(0,10)}.sh`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      // Show success notification
      setNotification({
        message: "Script downloaded successfully!",
        visible: true
      });
      setTimeout(() => {
        setNotification({ message: '', visible: false });
      }, 3000);
    } catch (error) {
      console.error('Error downloading script:', error);
      // Show error notification
      setNotification({
        message: "Error downloading script",
        visible: true
      });
      setTimeout(() => {
        setNotification({ message: '', visible: false });
      }, 3000);
    }
  };

  // Function to close the script preview
  const closeScriptPreview = () => {
    setShowScriptPreview(false);
  };

  return (
    <div className="space-y-6">
      {/* Domain input and controls */}
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h2 className="text-xl font-semibold">Target Domain</h2>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="text-sm text-primary hover:underline"
              aria-label="Toggle command history"
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
            <button 
              onClick={() => setShowPreferences(true)}
              className="text-sm text-primary hover:underline"
              aria-label="Open preferences"
            >
              Preferences
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="domain" className="block mb-2">Enter domain for testing:</label>
          <div className="flex flex-col gap-1">
            <input
              id="domain"
              type="text"
              placeholder="example.com"
              className={`w-full px-4 py-2 bg-gray-800 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                domainError ? 'border-red-500' : 'border-gray-700'
              }`}
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                // Clear error when user starts typing
                if (domainError) setDomainError('');
              }}
              aria-invalid={!!domainError}
              aria-describedby={domainError ? "domain-error" : undefined}
            />
            {domainError && (
              <p id="domain-error" className="text-red-500 text-sm mt-1">{domainError}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Command History (conditionally shown) */}
      {showHistory && (
        <CommandHistory 
          onSelectCommand={handleSelectFromHistory} 
          onClearHistory={handleClearHistory}
        />
      )}
      
      {/* User Preferences Modal (conditionally shown) */}
      {showPreferences && (
        <UserPreferences 
          onClose={() => setShowPreferences(false)}
          onSave={handleSavePreferences}
        />
      )}
      
      {/* Notification display */}
      {notification.visible && (
        <div className="fixed top-4 right-4 bg-gray-800 border border-gray-700 shadow-lg rounded-md p-4 z-50 max-w-md">
          <p className="text-white">{notification.message}</p>
        </div>
      )}
      
      {/* Categories and Commands in a more responsive layout */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left sidebar with Categories and Commands */}
        <div className="w-full md:w-1/3">
          {/* Categories */}
          <div className="card mb-4">
            <h2 className="text-xl font-semibold mb-3">Categories</h2>
            <div className="max-h-60 overflow-y-auto pr-2">
              <ul className="space-y-1" role="listbox" aria-label="Command categories">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={`p-2 hover:bg-gray-800 rounded cursor-pointer ${
                      selectedCategory === category.id ? 'bg-gray-700' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                    role="option"
                    aria-selected={selectedCategory === category.id}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Commands */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-3">Commands</h2>
            <div className="max-h-80 overflow-y-auto pr-2">
              {currentCategory && (
                <ul className="space-y-1" role="listbox" aria-label="Commands">
                  {currentCategory.commands.map((command) => (
                    <li
                      key={command.id}
                      className={`p-2 hover:bg-gray-800 rounded cursor-pointer ${
                        selectedCommand === command.id ? 'bg-gray-700' : ''
                      }`}
                      onClick={() => setSelectedCommand(command.id)}
                      role="option"
                      aria-selected={selectedCommand === command.id}
                    >
                      {command.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        {/* Main content area with command details/generation */}
        <div className="w-full md:w-2/3">
          <div className="card h-full">
            {currentCommand ? (
              <div>
                <h2 className="text-xl font-semibold mb-3">{currentCommand.name}</h2>
                <p className="text-gray-300 mb-4">{currentCommand.description}</p>
                
                {isCommandGenerated ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Command Output</h3>
                    <div className="bg-gray-900 rounded p-3 font-mono text-sm overflow-x-auto mb-4">
                      <pre className="text-gray-300 whitespace-pre-wrap">{generatedCommand}</pre>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                      <button
                        className="text-sm text-primary hover:underline"
                        onClick={handleBackToForm}
                        aria-label="Return to parameters"
                      >
                        Back to Parameters
                      </button>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="text-sm text-primary hover:underline"
                          onClick={handleAddToChain}
                          aria-label="Add command to chain"
                        >
                          Add to Chain
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={handleCopyCommand}
                          aria-label="Copy command to clipboard"
                        >
                          {isCopied ? 'Copied!' : 'Copy Command'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {currentCommand.placeholders && currentCommand.placeholders.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-3">Parameters</h3>
                        <div className="space-y-3">
                          {currentCommand.placeholders.filter(p => p.key !== 'domain').map((placeholder) => (
                            <div key={placeholder.key}>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                                <label htmlFor={placeholder.key} className="block mb-1 sm:mb-0">
                                  {placeholder.description}
                                  {placeholder.required && <span className="text-red-500">*</span>}
                                  {placeholder.type === 'select' && ' (select)'}
                                </label>
                                {hasDefaultValue(placeholder.key) && (
                                  <span className="text-xs text-primary italic">Using saved default</span>
                                )}
                              </div>
                              
                              {placeholder.type === 'select' && placeholder.options ? (
                                <select
                                  id={placeholder.key}
                                  className={`w-full px-4 py-2 bg-gray-800 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                                    validationErrors[placeholder.key] ? 'border-red-500' : hasDefaultValue(placeholder.key) ? 'border-primary border-opacity-50' : 'border-gray-700'
                                  }`}
                                  value={placeholderValues[placeholder.key] || placeholder.defaultValue || ''}
                                  onChange={(e) => handlePlaceholderChange(placeholder.key, e.target.value)}
                                  aria-invalid={!!validationErrors[placeholder.key]}
                                  aria-describedby={validationErrors[placeholder.key] ? `${placeholder.key}-error` : undefined}
                                >
                                  {placeholder.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  id={placeholder.key}
                                  type={placeholder.type === 'number' ? 'number' : 'text'}
                                  placeholder={placeholder.defaultValue}
                                  className={`w-full px-4 py-2 bg-gray-800 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                                    validationErrors[placeholder.key] ? 'border-red-500' : hasDefaultValue(placeholder.key) ? 'border-primary border-opacity-50' : 'border-gray-700'
                                  }`}
                                  value={placeholderValues[placeholder.key] || ''}
                                  onChange={(e) => handlePlaceholderChange(placeholder.key, e.target.value)}
                                  aria-invalid={!!validationErrors[placeholder.key]}
                                  aria-describedby={validationErrors[placeholder.key] ? `${placeholder.key}-error` : undefined}
                                />
                              )}
                              
                              {validationErrors[placeholder.key] && (
                                <p id={`${placeholder.key}-error`} className="text-red-500 text-sm mt-1">{validationErrors[placeholder.key]}</p>
                              )}
                              
                              {/* Add tooltip help text if available */}
                              {placeholder.description.includes('(') && placeholder.description.includes(')') && (
                                <p className="text-xs text-gray-400 mt-1">
                                  {placeholder.description.match(/\(([^)]+)\)/)?.[1]}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <button
                        className="btn btn-primary w-full"
                        onClick={handleGenerateCommand}
                        aria-label="Generate command"
                      >
                        Generate Command
                      </button>
                    </div>
                    
                    {currentCommand.referenceUrl && (
                      <div className="text-sm text-gray-400 mb-4">
                        <a 
                          href={currentCommand.referenceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline"
                          aria-label={`Documentation for ${currentCommand.name}`}
                        >
                          Tool Documentation →
                        </a>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-400">Select a command from the list to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Command Chain (conditionally shown) */}
      {showCommandChain && (
        <div className="mt-6">
          <CommandChain
            commands={commandChain}
            onAddCommand={() => {}}
            onRemoveCommand={handleRemoveFromChain}
            onReorderCommands={handleReorderCommands}
            onCopyChainAsScript={handleCopyChainAsScript}
          />
        </div>
      )}
      
      {/* Add the keyboard shortcuts component */}
      <KeyboardShortcuts
        onGenerateCommand={handleGenerateCommand}
        onCopyCommand={handleCopyCommand}
        onToggleHistory={() => setShowHistory(!showHistory)}
        onTogglePreferences={() => setShowPreferences(true)}
      />
      
      {/* Add the keyboard shortcuts modal */}
      <KeyboardShortcutsModal
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
      
      {/* Add the script preview modal */}
      {showScriptPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Command Chain Script</h2>
              <button 
                onClick={closeScriptPreview}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            
            <div className="mb-6 bg-gray-800 rounded p-4 overflow-auto max-h-96">
              <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">{scriptContent}</pre>
            </div>
            
            <div className="flex flex-wrap justify-end gap-4">
              <button
                onClick={copyScriptToClipboard}
                className="btn btn-secondary"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={downloadScript}
                className="btn btn-primary"
              >
                Download Script
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 