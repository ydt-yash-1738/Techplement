const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.get('/quote-of-the-day', async (req, res) => {
  try {
    const fetch = await import('node-fetch').then(module => module.default);
    const url = 'https://zenquotes.io/api/today';
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/quote-of-the-day-random', async (req, res) => {
  try {
    const fetch = await import('node-fetch').then(module => module.default);
    const url = 'https://zenquotes.io/api/random';
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/quote-by-tag', async (req, res) => {
  try {
    const tag = req.query.tag;
    const url = `https://api.quotable.io/search/quotes?query=${tag}`;
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Response from Quotable API:', data);
    console.log("Data Length", data.results.length);
    if (data && data.results && data.results.length > 0) {
      res.json(data);
    } else {
      console.error('Error: Unable to fetch quote by tag.');
      res.status(404).json({ error: 'Quote not found for this tag' });
    }
  } catch (error) {
    console.error('Error fetching quote by tag:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`CORS proxy server is running on http://localhost:${port}`);
});
