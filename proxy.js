
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const BACKEND_URL = 'https://sorry-junie-ishaautofilterbot-a45d8912.koyeb.app';
 // Replace with your real backend URL

app.use(cors({
  origin: 'https://site.com'  // ✅ Replace with your real site URL
}));
app.use((req, res, next) => {
  const allowedOrigin = 'https://site.com';
  if (req.get('origin') !== allowedOrigin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

app.use(express.json());

app.get('/api/batches', async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/data`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
});

app.get('/api/batches/:batchId/subjects', async (req, res) => {
  try {
    const { batchId } = req.params;
    const response = await axios.get(`${BACKEND_URL}/data/batches/${batchId}/subjects`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

app.get('/api/batches/:batchId/subjects/:subjectId/topics', async (req, res) => {
  try {
    const { batchId, subjectId } = req.params;
    const response = await axios.get(`${BACKEND_URL}/data/batches/${batchId}/subjects/${subjectId}/topics`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
