
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

console.log(`Starting BountyBud server in ${dev ? 'development' : 'production'} mode on port ${port}`);

// Track Next.js readiness
let nextAppReady = false;
let handle = null;

// Create HTTP server that responds immediately to health checks
const server = createServer(async (req, res) => {
  try {
    // IMMEDIATE health check responses - no delays
    if (req.url === '/' || req.url === '/health') {
      res.writeHead(200, { 
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache'
      });
      res.end('OK');
      return;
    }

    // If Next.js isn't ready yet, return service unavailable for other routes
    if (!nextAppReady) {
      res.writeHead(503, { 'Content-Type': 'text/plain' });
      res.end('Service starting, please wait...');
      return;
    }

    // Handle with Next.js when ready
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  } catch (err) {
    console.error('Request error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

// Start server IMMEDIATELY - before Next.js preparation
server.listen(port, hostname, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`✅ HTTP Server listening on http://${hostname}:${port}`);
  console.log(`✅ Health checks responding immediately at / and /health`);
});

// Initialize Next.js in parallel
const app = next({ dev, hostname, port });

console.log('⏳ Initializing Next.js app...');
app.prepare()
  .then(() => {
    handle = app.getRequestHandler();
    nextAppReady = true;
    console.log('✅ Next.js app ready - full functionality available');
  })
  .catch((ex) => {
    console.error('Next.js initialization failed:', ex);
    // Keep server running for health checks even if Next.js fails
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  server.close(() => process.exit(0));
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
