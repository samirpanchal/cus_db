import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We will load the objects directly using import
const loadData = async () => {
    const oldModule = await import('./old_data.js');
    const currentModule = await import('../src/data/productDetailsData.js');

    const oldData = oldModule.productDetailsData;
    const currentData = currentModule.productDetailsData;

    const plasticApps = [
        { title: "Injection Molding", desc: "Used to manufacture automotive components, household goods, and furniture.", icon: "Settings", image: "/images/pe_scrap_app1.jpg" },
        { title: "Extrusion", desc: "Ideal for producing pipes, tubes, and plastic films.", icon: "Package", image: "/images/pe_scrap_app2.jpg" },
        { title: "Packaging", desc: "Reprocessed into containers, crates, and durable packaging materials.", icon: "Recycle", image: "/images/pe_scrap_app3.jpg" },
        { title: "Consumer Goods", desc: "Utilized in the production of everyday items and toys.", icon: "Car", image: "/images/pe_scrap_app4.jpg" }
    ];

    for (const slug of Object.keys(currentData)) {
        const p = currentData[slug];
        
        // If it's a metal, we leave it alone (currentData has the custom metal apps now)
        if (p.category === 'Metals') {
            continue; // Metals are perfectly fixed
        }

        // For non-metals, restore the original applications from oldData
        const oldP = oldData[slug];
        if (oldP && oldP.applications && oldP.applications.length > 0) {
            p.applications = oldP.applications;
        } else {
            // If the original didn't have applications (like the 6 plastic ones), assign plasticApps
            p.applications = plasticApps;
        }
    }

    // Now stringify and rebuild the file
    let fileContent = `export const productDetailsData = ${JSON.stringify(currentData, null, 2)};\n\n`;
    fileContent += `export const getProductDetail = (slug, rawName) => { return productDetailsData[slug] || productDetailsData['polypropylene-pp-scrap']; };\n`;

    fs.writeFileSync(path.join(__dirname, '../src/data/productDetailsData.js'), fileContent, 'utf-8');
    console.log("Successfully rebuilt productDetailsData.js with proper applications restored!");
};

loadData();
