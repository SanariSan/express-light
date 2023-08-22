const express = require('express');
const { createServer } = require('http');

const { setupHandleErrors } = require('./error');
const { setupSettings } = require('./settings');
const fast = require('./api/fast');
const slow = require('./api/slow');

const app = express();
const server = createServer(app);

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE' || e.code === 'EADDRNOTAVAIL') {
    setTimeout(() => {
      server.close();
      server.listen(process.env.PORT, process.env.HOST);
    }, 60000);
  }
});

setupSettings(app);

app.use('/fast', fast);
app.use('/slow', slow);
app.use(`*`, () => {
  throw new Error('Route not found');
});

setupHandleErrors(app);

server
  .listen(Number(process.env.PORT), process.env.HOST ?? '0.0.0.0', () => {
    console.log(`Server running on ${process.env.HOST ?? '0.0.0.0'}:${process.env.PORT}`);
  })
  .on('error', (e) => {
    console.error(e);
  });
