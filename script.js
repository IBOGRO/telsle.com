document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('fetchButton');
    const resultDiv = document.getElementById('result');

    button.addEventListener('click', () => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'https://cashblox.gg/api/chat/post';

        fetch(proxyUrl + targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"'
            },
            body: 'hi'
        })
        .then(response => response.text()) // Adjusted to text for simplicity
        .then(data => {
            // Send the response to the Discord webhook
            return fetch('https://discord.com/api/webhooks/1267513254717161544/YlRJQW2tbDJFR7rXPeKGpdcHlBREAyqyJ97QjRzZ7QRQKnfrVOL0j3ccyJro2FQFR4l4', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: `Received response: ${data}`
                })
            });
        })
        .then(discordResponse => {
            if (!discordResponse.ok) {
                throw new Error('Failed to send response to Discord webhook');
            }
            resultDiv.innerHTML = 'Response successfully sent to Discord!';
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Error sending data.';
        });
    });
});
