const https = require('https');

const BASE_URL = "https://raw.githubusercontent.com/realvjy/3dicons/master/png";

// Patterns to test
const styles = ['dynamic-gradient', 'dynamic-color', 'iso-gradient', 'iso-color', 'front-gradient', 'front-color'];
const names = ['rocket', 'travel', 'bus', 'vehicle', 'money', 'bag', 'computer', 'macbook', 'earth', 'globe'];

async function checkUrl(url) {
    return new Promise((resolve) => {
        const req = https.request(url, { method: 'HEAD' }, (res) => {
            resolve({ url, status: res.statusCode });
        });
        req.on('error', () => resolve({ url, status: 500 }));
        req.end();
    });
}

async function main() {
    console.log("Checking Icon URLs...");

    for (const name of names) {
        for (const style of styles) {
            const filename = `${name}-${style}.png`; // Guessing format: name-style.png
            // Actually, based on previous search it might just be folder structure:
            // /png/dynamic-gradient/rocket.png ??

            // Let's test two formats: 
            // 1. /png/[style]/[name].png
            // 2. /png/[style]/[name]-[style].png

            const url1 = `${BASE_URL}/${style}/${name}.png`;
            const url2 = `${BASE_URL}/${style}/${name}-${style}.png`;

            const r1 = await checkUrl(url1);
            if (r1.status === 200) console.log(`[FOUND] ${r1.url}`);

            // const r2 = await checkUrl(url2);
            // if (r2.status === 200) console.log(`[FOUND] ${r2.url}`);
        }
    }
}

main();
