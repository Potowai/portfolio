const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const projects = [
    { name: 'portfolio', url: 'https://alexisf.vercel.app' },
    { name: 'atelier-fiolleau-web-boost', url: 'https://atelier-fiolleau-web-boost.vercel.app' },
    { name: 'RouletteSimulator', url: 'https://roulette-simulator-rho.vercel.app' },
    { name: 'front-lootopia', url: 'https://front-lootopia.vercel.app' },
    { name: 'PokemonDLE', url: 'https://pokemondle.netlify.app/' },
    { name: 'toz-app', url: 'https://potowai.github.io/toz-app/' },
    { name: 'Stickmania', url: 'https://stickmania.netlify.app/' },
    { name: 'Communication-Iframe', url: 'https://communication-iframe-eta.vercel.app' }
];

const outputDir = path.join(__dirname, '../public/images/projects');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport to 800x600 for consistency
    await page.setViewport({ width: 800, height: 600 });

    for (const project of projects) {
        console.log(`Capturing ${project.name}...`);
        try {
            await page.goto(project.url, { waitUntil: 'networkidle0', timeout: 30000 });
            // Wait a bit extra for animations/gl to settle
            await new Promise(r => setTimeout(r, 2000));

            await page.screenshot({
                path: path.join(outputDir, `${project.name}.png`),
                type: 'png'
            });
            console.log(`Saved ${project.name}.png`);
        } catch (error) {
            console.error(`Failed to capture ${project.name}:`, error.message);
        }
    }

    await browser.close();
})();
