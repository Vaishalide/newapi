const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = 'https://pwthor.ct.ws';

app.use((req, res, next) => {
  const origin = req.get('Origin');
  if (origin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  } else {
    res.status(403).send('Forbidden');
  }
});

app.get('/', (req, res) => {
  const iframeUrl = process.env.IFRAME_URL;
  res.setHeader('Content-Type', 'application/json');
  res.json({ iframeUrl });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
