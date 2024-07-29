document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('fetchButton');
    const resultDiv = document.getElementById('result');

    button.addEventListener('click', () => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'https://cashblox.gg/_next/data/W0mAusPnDdTf3CPPSZbDp/profile.json';

        fetch(proxyUrl + targetUrl, {
            headers: {
                "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "x-nextjs-data": "1"
            },
            method: "GET",
            mode: "cors",
            credentials: "omit"
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultDiv.innerHTML = 'Error fetching data.';
        });
    });
});
