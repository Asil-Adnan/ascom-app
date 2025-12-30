const https = require('https');

const BASE_URL = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets";

const assets = [
    { dir: 'Rocket', file: 'rocket_3d.png' },
    { dir: 'Airplane', file: 'airplane_3d.png' },
    { dir: 'Small_airplane', file: 'small_airplane_3d.png' },
    { dir: 'Bus', file: 'bus_3d.png' },
    { dir: 'Oncoming_bus', file: 'oncoming_bus_3d.png' },
    { dir: 'Document', file: 'document_3d.png' },
    { dir: 'Page_facing_up', file: 'page_facing_up_3d.png' },
    { dir: 'Ticket', file: 'ticket_3d.png' },
    { dir: 'Admission_tickets', file: 'admission_tickets_3d.png' },
    { dir: 'Man', file: 'man_3d.png' },
    { dir: 'Technologist', file: 'technologist_3d.png' }, // Freelance
    { dir: 'Laptop', file: 'laptop_3d.png' },
    { dir: 'Crescent_moon', file: 'crescent_moon_3d.png' },
    { dir: 'Sun', file: 'sun_3d.png' },
    { dir: 'Briefcase', file: 'briefcase_3d.png' },
    { dir: 'Globe_showing_Europe-Africa', file: 'globe_showing_europe-africa_3d.png' },
    { dir: 'Package', file: 'package_3d.png' },
    { dir: 'Money_bag', file: 'money_bag_3d.png' }
];

async function checkUrl(path) {
    const url = `${BASE_URL}/${path}`;
    return new Promise((resolve) => {
        const req = https.request(url, { method: 'HEAD' }, (res) => {
            resolve({ url, status: res.statusCode });
        });
        req.on('error', () => resolve({ url, status: 500 }));
        req.end();
    });
}

async function main() {
    console.log("Checking Fluent URLs...");
    for (const asset of assets) {
        const path = `${asset.dir}/3D/${asset.file}`;
        const res = await checkUrl(path);
        if (res.status === 200) {
            console.log(`[FOUND] ${asset.dir}: ${res.url}`);
        } else {
            console.log(`[MISSING] ${asset.dir}`);
        }
    }
}

main();
