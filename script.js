document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('fetchButton');
    const resultDiv = document.getElementById('result');

    button.addEventListener('click', () => {
        // Perform the POST request to the API
        fetch("https://cashblox.gg/api/chat/post", {
            headers: {
                "content-type": "application/text",
                "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\""
            },
            referrer: "https://cashblox.gg/surveys",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: "hi",
            method: "POST",
            mode: "cors",
            credentials: "omit"
        })
        .then(response => response.json())
        .then(data => {
            // Send the response to the Discord webhook
            return fetch("https://discord.com/api/webhooks/1267513254717161544/YlRJQW2tbDJFR7rXPeKGpdcHlBREAyqyJ97QjRzZ7QRQKnfrVOL0j3ccyJro2FQFR4l4", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: `Received response: ${JSON.stringify(data, null, 2)}`
                })
            });
        })
        .then(discordResponse => {
            if (!discordResponse.ok) {
                throw new Error('Failed to send response to Discord webhook');
            }
            return discordResponse.json();
        })
        .then(discordData => {
            resultDiv.innerHTML = 'Response successfully sent to Discord!';
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Error sending data.';
        });
    });
});
