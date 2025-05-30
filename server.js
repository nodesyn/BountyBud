const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

console.log(`Starting BountyBud server in ${dev ? 'development' : 'production'} mode on port ${port}`);

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Immediate health check responses
      if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'healthy', service: 'bountybud', timestamp: Date.now() }));
        return;
      }

      // Root endpoint health check (for deployment health checks)
      if (req.url === '/' && req.method === 'GET' && req.headers['user-agent']?.includes('Health')) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('OK');
        return;
      }

      // All other requests go to Next.js
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Request error:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
  .listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`✅ Server ready on http://${hostname}:${port}`);
  })
  .on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });
}).catch((ex) => {
  console.error('Failed to start server:', ex);
  process.exit(1);
});