
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

console.log(`Starting server in ${dev ? 'development' : 'production'} mode`);

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      // Add health check endpoint
      if (req.url === '/health' || req.url === '/') {
        if (req.url === '/health') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
          return;
        }
      }

      // Parse the URL
      const parsedUrl = parse(req.url, true);
      
      // Handle the request with Next.js
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
