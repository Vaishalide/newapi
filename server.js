const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = 'https://pwthor.ct.ws';

app.use((req, res, next) => {
  const origin = req.get('Origin');
  const userAgent = req.get('User-Agent') || '';

  // Basic check to block curl, wget, or missing user-agent
  const isCurlLike = /curl|wget|httpie|python|java|libwww|scrapy|PostmanRuntime/i.test(userAgent);

  if (isCurlLike || !userAgent || userAgent === 'Mozilla/5.0' && !origin) {
    return res.status(403).send('fetch = {https://pwthor.ct.ws/$[req]}');
  }

  // CORS check
  if (origin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  } else {
    res.status(403).send('fetch = {https://pwthor.ct.ws/$[req]}');
  }
});

app.get('/', (req, res) => {
  const iframeUrl = process.env.IFRAME_URL;
  res.setHeader('Content-Type', 'application/json');
  res.json({ iframeUrl });
});

// Visitor counter middleware
// Visitor tracking middleware
app.use((req, res, next) => {
  const currentDay = new Date().toISOString().split('T')[0];
  if (currentDay !== today) {
    today = currentDay;
    visitorCount = 0;
  }
  visitorCount++;
  next();
});

// Endpoint to get today's visitor count
app.get('/visitors-today', (req, res) => {
  res.json({ date: today, visitors: visitorCount });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
