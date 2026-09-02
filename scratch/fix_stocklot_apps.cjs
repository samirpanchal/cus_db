const fs = require('fs');
const path = '/Users/samirpanchal/website4/anchorstone-website-clone/src/data/productDetailsData.js';

let content = fs.readFileSync(path, 'utf8');

const replaceApplications = (key, newApps) => {
    // Look for the block starting with the slug/key
    const keyRegex = new RegExp(`"${key}":\\s*\\{[\\s\\S]*?"applications":\\s*\\[`, 'g');
    
    // Find the start of the "applications": [ array for this key
    let startIndex = -1;
    let keyMatch = keyRegex.exec(content);
    if (keyMatch) {
        startIndex = keyMatch.index + keyMatch[0].length - 1; // index of '['
    } else {
        console.log("Could not find key or applications for:", key);
        return;
    }

    // Find the matching ']'
    let bracketCount = 1;
    let endIndex = startIndex + 1;
    while (bracketCount > 0 && endIndex < content.length) {
        if (content[endIndex] === '[') bracketCount++;
        else if (content[endIndex] === ']') bracketCount--;
        endIndex++;
    }

    if (bracketCount === 0) {
        const pre = content.substring(0, startIndex);
        const post = content.substring(endIndex);
        
        let newAppString = "[\n";
        newApps.forEach((app, i) => {
            newAppString += `      {\n        "title": "${app.title}",\n        "desc": "${app.desc}",\n        "icon": "${app.icon}",\n        "image": "${app.image}"\n      }${i < newApps.length - 1 ? ',' : ''}\n`;
        });
        newAppString += "    ]";
        
        content = pre + newAppString + post;
        console.log(`Replaced applications for ${key}`);
    } else {
        console.log("Could not find matching bracket for", key);
    }
}

replaceApplications("synthetic-film-white-matt-gloss-and-textured", [
    { title: "Printing & Publishing", desc: "Used extensively in commercial printing for durable and high-quality graphics.", icon: "Settings", image: "/images/stocklots_final/stocklot_synthetic-film-white-matt-gloss-and-textured_app1.jpg" },
    { title: "Packaging Applications", desc: "Ideal for flexible packaging requiring tear resistance and a premium finish.", icon: "Package", image: "/images/stocklots_final/stocklot_synthetic-film-white-matt-gloss-and-textured_app2.jpg" },
    { title: "Commercial Labels", desc: "Perfect for creating long-lasting, water-resistant product labels.", icon: "Car", image: "/images/stocklots_final/stocklot_synthetic-film-white-matt-gloss-and-textured_app3.jpg" },
    { title: "Specialty Graphics", desc: "Utilized for banners, maps, and durable outdoor advertising.", icon: "ShieldCheck", image: "/images/stocklots_final/stocklot_synthetic-film-white-matt-gloss-and-textured_app4.jpg" }
]);

replaceApplications("gloss-lable-paper", [
    { title: "Product Labels", desc: "Premium gloss finish makes it ideal for high-end consumer goods labeling.", icon: "Settings", image: "/images/stocklots_final/stocklot_gloss-lable-paper_app1.jpg" },
    { title: "Beverage Labels", desc: "Commonly used for wine, spirits, and premium beverage bottles.", icon: "Package", image: "/images/stocklots_final/stocklot_gloss-lable-paper_app2.jpg" },
    { title: "Barcode Labels", desc: "Provides high contrast and durability for retail and logistics barcodes.", icon: "Car", image: "/images/stocklots_final/stocklot_gloss-lable-paper_app3.jpg" },
    { title: "General Tagging", desc: "Used in diverse tagging applications where a glossy aesthetic is desired.", icon: "ShieldCheck", image: "/images/stocklots_final/stocklot_gloss-lable-paper_app4.jpg" }
]);

replaceApplications("rough-gloss-coated-digital-paper", [
    { title: "Digital Printing", desc: "Optimized for high-speed digital presses, ensuring crisp and vibrant prints.", icon: "Settings", image: "/images/stocklots_final/stocklot_rough-gloss-coated-digital-paper_app1.jpg" },
    { title: "Photo Books", desc: "Provides a unique textured finish perfect for premium photo albums.", icon: "Package", image: "/images/stocklots_final/stocklot_rough-gloss-coated-digital-paper_app2.jpg" },
    { title: "Brochures", desc: "Ideal for creating professional corporate brochures and marketing materials.", icon: "Car", image: "/images/stocklots_final/stocklot_rough-gloss-coated-digital-paper_app3.jpg" },
    { title: "Flyers", desc: "Used for high-impact promotional flyers that stand out visually.", icon: "ShieldCheck", image: "/images/stocklots_final/stocklot_rough-gloss-coated-digital-paper_app4.jpg" }
]);

replaceApplications("2-side-gloss-coated", [
    { title: "High-End Magazines", desc: "The standard choice for glossy, full-color lifestyle and fashion magazines.", icon: "Settings", image: "/images/stocklots_final/stocklot_2-side-gloss-coated_app1.jpg" },
    { title: "Catalogs", desc: "Perfect for visually striking product catalogs and directories.", icon: "Package", image: "/images/stocklots_final/stocklot_2-side-gloss-coated_app2.jpg" },
    { title: "Marketing Materials", desc: "Used extensively for premium bi-fold and tri-fold marketing brochures.", icon: "Car", image: "/images/stocklots_final/stocklot_2-side-gloss-coated_app3.jpg" },
    { title: "Premium Inserts", desc: "Ideal for advertising inserts and mailers requiring high image fidelity.", icon: "ShieldCheck", image: "/images/stocklots_final/stocklot_2-side-gloss-coated_app4.jpg" }
]);

replaceApplications("stocklot-rejectsconveyor-nylon-belt-used-stocklot-excess-inventory", [
    { title: "Material Handling", desc: "Reused in logistics and warehousing for heavy-duty material transport.", icon: "Settings", image: "/images/stocklots_final/stocklot_stocklot-rejectsconveyor-nylon-belt-used-stocklot-excess-inventory_app1.jpg" },
    { title: "Industrial Automation", desc: "Integrated into automated assembly lines and manufacturing processes.", icon: "Package", image: "/images/stocklots_final/stocklot_stocklot-rejectsconveyor-nylon-belt-used-stocklot-excess-inventory_app2.jpg" },
    { title: "Mining Operations", desc: "Utilized for rugged and durable bulk material transport in mining.", icon: "Car", image: "/images/stocklots_final/stocklot_stocklot-rejectsconveyor-nylon-belt-used-stocklot-excess-inventory_app3.jpg" },
    { title: "Agricultural Machinery", desc: "Adapted for use in harvesting equipment and agricultural processing lines.", icon: "ShieldCheck", image: "/images/stocklots_final/stocklot_stocklot-rejectsconveyor-nylon-belt-used-stocklot-excess-inventory_app4.jpg" }
]);

fs.writeFileSync(path, content, 'utf8');
console.log("Done updating productDetailsData.js for stocklots");
