
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

// Initialize Next.js app
const app = next({ 
  dev, 
  hostname, 
  port,
  customServer: true
});
const handle = app.getRequestHandler();

console.log(`Starting server in ${dev ? 'development' : 'production'} mode on port ${port}`);

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      // Handle health check endpoints immediately
      if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
        return;
      }

      // For root endpoint, if it's a simple GET request (like health checks), respond quickly
      if (req.url === '/' && req.method === 'GET' && !req.headers.accept?.includes('text/html')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', service: 'bountybud' }));
        return;
      }

      // Parse the URL for Next.js handling
      const parsedUrl = parse(req.url, true);
      
      // Handle all other requests with Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  server.listen(port, hostname, (err) => {
    if (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
    console.log(`> Server ready on http://${hostname}:${port}`);
    console.log(`> Health check available at http://${hostname}:${port}/health`);
  });

  // Handle server errors
  server.on('error', (err) => {
    console.error('Server error:', err);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

}).catch((ex) => {
  console.error('Error starting server:', ex);
  process.exit(1);
});
