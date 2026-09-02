const fs = require('fs');
const path = '/Users/samirpanchal/website4/anchorstone-website-clone/src/data/productDetailsData.js';
let content = fs.readFileSync(path, 'utf8');

const lines = content.split('\n');
let replacedCount = 0;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"tagline":')) {
        if (/recycled/i.test(lines[i])) {
            // Remove the word RECYCLED and fix extra spaces
            lines[i] = lines[i].replace(/ RECYCLED/gi, '').replace(/RECYCLED /gi, '').replace(/RECYCLED/gi, '');
            // Fix double spaces except leading spaces
            const leadingSpaces = lines[i].match(/^\s*/)[0];
            const restOfLine = lines[i].substring(leadingSpaces.length).replace(/\s{2,}/g, ' ');
            lines[i] = leadingSpaces + restOfLine;
            replacedCount++;
        }
    }
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Removed RECYCLED from ' + replacedCount + ' taglines');
