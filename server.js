const express = require('express');
const request = require('request');
const app = express();

// Define the endpoint for the proxy
app.get('/proxy/profile', (req, res) => {
    const url = 'https://cashblox.gg/_next/data/W0mAusPnDdTf3CPPSZbDp/profile.json';
    
    // Make the request to the external API and pipe the response
    request({ url, headers: { "x-nextjs-data": "1" } }).pipe(res);
});

// Start the server on port 3000
app.listen(3000, () => console.log('Proxy server running on port 3000'));
