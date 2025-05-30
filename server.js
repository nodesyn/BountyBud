
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Add a simple health check for the root path
      if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        
        // Try to serve index.html from the .next/standalone/.next/server/pages directory if it exists
        // This handles the case where Next.js is in standalone mode
        try {
          const indexPath = path.join('.next', 'standalone', '.next', 'server', 'pages', 'index.html');
          if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf8');
            return res.end(content);
          }
        } catch (e) {
          // Fallback to Next.js handler if file reading fails
        }
      }
      
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
