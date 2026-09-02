const fs = require('fs');
const path = require('path');

const dataFile = path.resolve(__dirname, '../src/data/productDetailsData.js');
const metalDir = path.resolve(__dirname, '../public/images/metal_final');

let content = fs.readFileSync(dataFile, 'utf-8');
const lines = content.split('\n');

let currentSlug = '';
for (let i = 0; i < lines.length; i++) {
    const slugMatch = lines[i].match(/"slug": "(.*?)"/);
    if (slugMatch) {
        currentSlug = slugMatch[1];
    }

    if (lines[i].includes('"/images/metals_scrap_premium.png"')) {
        const expectedFilename = currentSlug.replace(/-/g, '_') + '.jpg';
        const expectedPath = path.join(metalDir, expectedFilename);
        
        if (fs.existsSync(expectedPath)) {
            lines[i] = lines[i].replace('"/images/metals_scrap_premium.png"', `"/images/metal_final/${expectedFilename}"`);
        }
    }
}

fs.writeFileSync(dataFile, lines.join('\n'), 'utf-8');
console.log("Updated productDetailsData.js with specific metal images successfully!");
