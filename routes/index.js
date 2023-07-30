const express = require('express');
const axios = require('axios');
const cache = require('memory-cache');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to myhomepage.net' });
});
// Function to fetch data from Bing API
const fetchBingData = async () => {
  try {
    const response = await axios.get('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US');
    return response.data.images[0].url;
  } catch (error) {
    throw new Error('Error fetching data from Bing server.');
  }
};
// Route to fetch data from the Bing server and send it to the client
router.get('/bing-wallpaper', async (req, res) => {
  try {
    const cachedData = cache.get('bing-data');
    if (cachedData) {
      // If data is cached, use it
      res.json({ url: cachedData });
    } else {
      // If data is not cached, fetch it and cache it for one day
      const freshData = await fetchBingData();
      cache.put('bing-data', freshData, 24 * 60 * 60 * 1000);
      res.json({ url: freshData });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
