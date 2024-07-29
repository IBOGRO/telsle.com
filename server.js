const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON and text request bodies
app.use(express.json());
app.use(express.text());

// Endpoint to handle the client request and forward it to the external API
app.post('/proxy/chat', async (req, res) => {
    try {
        // Make the request to the external API
        const apiResponse = await axios.post('https://cashblox.gg/api/chat/post', req.body, {
            headers: {
                'Content-Type': 'text/plain',
                // Include any necessary authentication headers if required
                // Example: 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            }
        });

        // Forward the response to the Discord webhook
        await axios.post('https://discord.com/api/webhooks/1267513254717161544/YlRJQW2tbDJFR7rXPeKGpdcHlBREAyqyJ97QjRzZ7QRQKnfrVOL0j3ccyJro2FQFR4l4', {
            content: `Received response from API: ${apiResponse.data}`
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Respond to the client
        res.send('Response successfully sent to Discord!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error handling request.');
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
