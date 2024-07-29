const express = require('express');
const request = require('request');
const app = express();

app.get('/proxy/profile', (req, res) => {
    const url = 'https://cashblox.gg/_next/data/W0mAusPnDdTf3CPPSZbDp/profile.json';
    request(url).pipe(res);
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
