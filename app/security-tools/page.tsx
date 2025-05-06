'use client';

import React, { useState } from 'react';
import { securityTools, toolCategories } from '../data/security-tools';

export default function SecurityToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter tools based on category and search term
  const filteredTools = securityTools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = 
      searchTerm === '' || 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Security Tools</h1>
      <p className="text-gray-300">
        A curated collection of essential tools for bug bounty hunting and security research.
      </p>
      
      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="search" className="block mb-2">Search Tools:</label>
            <input
              id="search"
              type="text"
              placeholder="Search by name, description or tag..."
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
              {toolCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Category Descriptions */}
      {selectedCategory !== 'all' && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">
            {toolCategories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          <p className="text-gray-300">
            {toolCategories.find(cat => cat.id === selectedCategory)?.description}
          </p>
        </div>
      )}
      
      {/* Tools List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.length > 0 ? (
          filteredTools.map(tool => (
            <div key={tool.id} className="card">
              <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
              
              <div className="mb-2">
                <span className="inline-block px-2 py-1 text-xs rounded bg-gray-700 text-gray-300">
                  {toolCategories.find(cat => cat.id === tool.category)?.name}
                </span>
                {tool.language && (
                  <span className="inline-block ml-2 px-2 py-1 text-xs rounded bg-gray-700 text-gray-300">
                    {tool.language}
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 mb-4">{tool.description}</p>
              
              {tool.tags && tool.tags.length > 0 && (
                <div className="mb-4">
                  {tool.tags.map(tag => (
                    <span key={tag} className="inline-block mr-2 mb-2 px-2 py-1 text-xs rounded bg-primary text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {tool.installCommand && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-1">Installation:</h3>
                  <pre className="bg-gray-900 p-2 rounded text-xs overflow-x-auto text-gray-300">
                    {tool.installCommand}
                  </pre>
                </div>
              )}
              
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary text-sm inline-flex items-center"
              >
                View Tool
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">No tools found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 