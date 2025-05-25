'use client';

import React, { useState } from 'react';
import { browserExtensions, extensionCategories } from '../data/browser-extensions';

export default function BrowserExtensionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrowser, setSelectedBrowser] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Available browsers
  const browsers = ['Chrome', 'Firefox', 'Edge', 'Safari'];

  // Filter extensions based on category, browser and search term
  const filteredExtensions = browserExtensions.filter(extension => {
    const matchesCategory = selectedCategory === 'all' || extension.category === selectedCategory;
    const matchesBrowser = selectedBrowser === 'all' || extension.browsers.includes(selectedBrowser);
    const matchesSearch = 
      searchTerm === '' || 
      extension.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      extension.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (extension.tags && extension.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    return matchesCategory && matchesBrowser && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Browser Extensions</h1>
      <p className="text-gray-300">
        Essential browser extensions that can enhance your bug bounty hunting workflow.
      </p>
      
      {/* Search and Filter */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block mb-2">Search Extensions:</label>
            <input
              id="search"
              type="text"
              placeholder="Search by name or description..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category" className="block mb-2">Filter by Category:</label>
            <select
              id="category"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {extensionCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="browser" className="block mb-2">Filter by Browser:</label>
            <select
              id="browser"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedBrowser}
              onChange={(e) => setSelectedBrowser(e.target.value)}
            >
              <option value="all">All Browsers</option>
              {browsers.map(browser => (
                <option key={browser} value={browser}>{browser}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Category Description */}
      {selectedCategory !== 'all' && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">
            {extensionCategories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          <p className="text-gray-300">
            {extensionCategories.find(cat => cat.id === selectedCategory)?.description}
          </p>
        </div>
      )}
      
      {/* Extensions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExtensions.length > 0 ? (
          filteredExtensions.map(extension => (
            <div key={extension.id} className="card">
              <h2 className="text-xl font-semibold mb-2">{extension.name}</h2>
              
              <div className="mb-2">
                <span className="inline-block px-2 py-1 text-xs rounded bg-gray-700 text-gray-300">
                  {extensionCategories.find(cat => cat.id === extension.category)?.name}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4">{extension.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {extension.browsers.map(browser => (
                  <span 
                    key={browser} 
                    className={`inline-block px-2 py-1 text-xs rounded ${
                      selectedBrowser === browser 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {browser}
                  </span>
                ))}
              </div>
              
              {extension.tags && extension.tags.length > 0 && (
                <div className="mb-4">
                  {extension.tags.map(tag => (
                    <span key={tag} className="inline-block mr-2 mb-2 px-2 py-1 text-xs rounded bg-secondary text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <a 
                href={extension.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary text-sm inline-flex items-center"
              >
                Get Extension
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">No extensions found matching your criteria.</p>
          </div>
        )}
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Why Use Browser Extensions?</h2>
        <p className="text-gray-300 mb-3">
          Browser extensions can significantly enhance your bug bounty hunting workflow by:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Automating repetitive tasks like header analysis</li>
          <li>Providing immediate insights into website technologies</li>
          <li>Modifying requests and responses for testing vulnerabilities</li>
          <li>Improving visibility into web application behavior</li>
          <li>Saving time with quick access to tools directly in your browser</li>
        </ul>
      </div>
    </div>
  );
} 