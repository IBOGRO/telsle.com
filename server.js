const express = require('express');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.text());

// Endpoint to handle the client request and forward it to Discord
app.post('/proxy/chat', (req, res) => {
    // Make the request to the external API
    request.post({
        url: 'https://cashblox.gg/api/chat/post',
        headers: {
            'content-type': 'application/text'
        },
        body: req.body
    }, (error, response, body) => {
        if (error) {
            console.error('Error making request to external API:', error);
            return res.status(500).send('Error making request to external API.');
        }

        // Forward the response to the Discord webhook
        request.post({
            url: 'https://discord.com/api/webhooks/1267513254717161544/YlRJQW2tbDJFR7rXPeKGpdcHlBREAyqyJ97QjRzZ7QRQKnfrVOL0j3ccyJro2FQFR4l4',
            json: {
                content: `Received response from API: ${body}`
            }
        }, (discordError, discordResponse) => {
            if (discordError) {
                console.error('Error sending data to Discord webhook:', discordError);
                return res.status(500).send('Error sending data to Discord webhook.');
            }

            // Respond to the client
            res.send('Response successfully sent to Discord!');
        });
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
