document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('fetchButton');
    const resultDiv = document.getElementById('result');

    button.addEventListener('click', () => {
        fetch('http://your-proxy-server-url/proxy/chat', { // Update this URL to your deployed server
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'hi' // or any data you need to send
        })
        .then(response => response.text())
        .then(result => {
            resultDiv.innerHTML = result;
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Error sending data.';
        });
    });
});
