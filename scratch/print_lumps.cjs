const fs = require('fs');
const content = fs.readFileSync('/Users/samirpanchal/website4/anchorstone-website-clone/src/data/productDetailsData.js', 'utf8');

const keys = [
    "polyethylene-pe-lumps",
    "polyvinyl-chloride-pvc-lumps",
    "high-impact-polystyrene-lumps",
    "polyethylene-terephthalate-pet-lumps",
    "polypropylene-pp-lumps"
];

keys.forEach(key => {
    const keyRegex = new RegExp(`"${key}":\\s*\\{[\\s\\S]*?"applications":\\s*\\[`, 'g');
    let startIndex = -1;
    let keyMatch = keyRegex.exec(content);
    if (keyMatch) {
        startIndex = keyMatch.index + keyMatch[0].length - 1;
        let bracketCount = 1;
        let endIndex = startIndex + 1;
        while (bracketCount > 0 && endIndex < content.length) {
            if (content[endIndex] === '[') bracketCount++;
            else if (content[endIndex] === ']') bracketCount--;
            endIndex++;
        }
        const appsJson = content.substring(startIndex, endIndex);
        const apps = eval('(' + appsJson + ')');
        console.log(`\n--- ${key} ---`);
        apps.forEach(app => console.log(app.title, "->", app.image));
    }
});
