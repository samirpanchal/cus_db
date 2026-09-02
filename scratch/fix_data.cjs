const fs = require('fs');
const path = require('path');

const dataFile = path.resolve(__dirname, '../src/data/productDetailsData.js');
let content = fs.readFileSync(dataFile, 'utf-8');

// We will do a generic replacement for the placeholder image.
// But we want to distinguish between metals and plastics for the image.
// The easiest way is to parse the JSON-like object or just use regex replacements.
// Since productDetailsData is a massive JS object, doing text replacement is safest if we iterate correctly.

// Let's use eval to get the object, modify it, and then stringify it? No, it has an export statement.
// We can parse it by stripping the export.
let jsonStr = content.replace('export const productDetailsData = ', '').trim();
if (jsonStr.endsWith('};')) {
    jsonStr = jsonStr.slice(0, -1);
}
// wait, there's another export: export const getProductDetail...
// Let's just use string replacement carefully.

// Let's just do a series of regex replacements for metals and plastics.
// For metal slugs: (ss-|scrap|aluminium|hms|aluminum)
// For plastic slugs: (lumps|regrind|bales|regranulate|technical-plastic)

const metalApplications = [
    {
        title: "Metal Casting",
        desc: "Melted down and reused in foundries to create new metal components and alloys.",
        icon: "Settings"
    },
    {
        title: "Automotive Parts",
        desc: "Recycled metal is heavily utilized in manufacturing vehicle frames and parts.",
        icon: "Car"
    },
    {
        title: "Infrastructure",
        desc: "Used to produce structural steel, roofing, and foundational supports.",
        icon: "Package"
    },
    {
        title: "Industrial Machinery",
        desc: "Essential for manufacturing heavy-duty industrial equipment and tools.",
        icon: "Settings"
    }
];

const plasticApplications = [
    {
        title: "Injection Molding",
        desc: "Used to manufacture automotive components, household goods, and furniture.",
        icon: "Settings"
    },
    {
        title: "Extrusion",
        desc: "Ideal for producing pipes, tubes, and plastic films.",
        icon: "Package"
    },
    {
        title: "Packaging",
        desc: "Reprocessed into containers, crates, and durable packaging materials.",
        icon: "Recycle"
    },
    {
        title: "Consumer Goods",
        desc: "Utilized in the production of everyday items and toys.",
        icon: "Car"
    }
];

// Let's use a simpler approach: Read file, find "placeholder.jpg", replace based on context.
const lines = content.split('\n');
let currentSlug = '';
for (let i = 0; i < lines.length; i++) {
    const slugMatch = lines[i].match(/"slug": "(.*?)"/);
    if (slugMatch) {
        currentSlug = slugMatch[1];
    }

    if (lines[i].includes('"/images/placeholder.jpg"')) {
        if (currentSlug.includes('scrap') || currentSlug.includes('steel') || currentSlug.includes('aluminium') || currentSlug.includes('hms') || currentSlug.includes('ss-')) {
            lines[i] = lines[i].replace('"/images/placeholder.jpg"', '"/images/metals_scrap_premium.png"');
        } else {
            lines[i] = lines[i].replace('"/images/placeholder.jpg"', '"/images/plastic_scrap_premium.png"');
        }
    }

    if (lines[i].includes('"applications": []')) {
        let replacement = '';
        if (currentSlug.includes('scrap') || currentSlug.includes('steel') || currentSlug.includes('aluminium') || currentSlug.includes('hms') || currentSlug.includes('ss-')) {
             // wait, some plastics are "plastic-scrap". 
             if (currentSlug.includes('plastic') || currentSlug.includes('pp') || currentSlug.includes('pe') || currentSlug.includes('pvc') || currentSlug.includes('pet')) {
                 replacement = `"applications": ${JSON.stringify(plasticApplications, null, 4)},`;
             } else {
                 replacement = `"applications": ${JSON.stringify(metalApplications, null, 4)},`;
             }
        } else {
             replacement = `"applications": ${JSON.stringify(plasticApplications, null, 4)},`;
        }
        
        // fix indentation
        const indentMatch = lines[i].match(/^(\s*)/);
        const indent = indentMatch ? indentMatch[1] : '';
        replacement = replacement.split('\n').map((l, idx) => idx === 0 ? indent + l.trim() : indent + l).join('\n');
        
        lines[i] = replacement;
    }
}

fs.writeFileSync(dataFile, lines.join('\n'), 'utf-8');
console.log("Updated productDetailsData.js successfully!");
