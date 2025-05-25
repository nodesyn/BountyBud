
const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare()
  .then(() => {
    const server = express();
    
    // Serve static files from the Next.js .next directory
    server.use('/_next', express.static(path.join(__dirname, '../.next')));
    
    // Default route handler
    server.use((req, res) => {
      return handle(req, res);
    });

    server.listen(5000, '0.0.0.0', (err) => {
      if (err) throw err;
      console.log('> Ready on http://0.0.0.0:5000');
    });
  })
  .catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
  });
