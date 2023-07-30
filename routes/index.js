const express = require('express');
const axios = require('axios');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to myhomepage.net' });
});

// Route to fetch data from the Bing server and send it to the client
router.get('/bing-wallpaper', async (req, res) => {
  try {
    const response = await axios.get('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US');
    const { url } = response.data.images[0];
    res.json({ url });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Bing server.' });
  }
});

module.exports = router;
