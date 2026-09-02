const fs = require('fs');
const path = require('path');

const dataFile = path.resolve(__dirname, '../src/data/productDetailsData.js');
let lines = fs.readFileSync(dataFile, 'utf-8').split('\n');

const ssApps = [
    { title: "Medical & Surgical", desc: "Used in producing highly sterile surgical instruments and medical equipment.", icon: "ShieldCheck", image: "/images/metal_final/surgical_instruments.jpg" },
    { title: "Food & Beverage", desc: "Essential for manufacturing sanitary brewery vats, food processing lines, and dairy tanks.", icon: "Leaf", image: "/images/metal_final/brewery_vats.jpg" },
    { title: "Kitchen Appliances", desc: "Recycled into durable, rust-resistant commercial and domestic kitchen appliances.", icon: "Settings", image: "/images/metal_final/kitchen_appliances.jpg" },
    { title: "Marine Hardware", desc: "Perfect for coastal architecture and marine components requiring high corrosion resistance.", icon: "Car", image: "/images/metal_final/marine_hardware.jpg" }
];

const msApps = [
    { title: "Structural Steel", desc: "Melted down to produce I-beams and columns for major construction projects.", icon: "Package", image: "/images/metal_final/i_beam_production.jpg" },
    { title: "Heavy Machinery", desc: "Crucial for forging components used in industrial and agricultural machinery.", icon: "Settings", image: "/images/metal_final/heavy_machinery.jpg" },
    { title: "Shipbuilding", desc: "Recycled steel plates are heavily utilized in commercial shipbuilding and repairs.", icon: "Car", image: "/images/metal_final/shipbuilding_plates.jpg" },
    { title: "Reinforcing Bars", desc: "Processed into rebar to provide tensile strength for concrete structures globally.", icon: "ShieldCheck", image: "/images/metal_final/reinforcing_bar.jpg" }
];

const aluApps = [
    { title: "Beverage Cans", desc: "Rapid can-to-can recycling loop, saving enormous energy compared to primary aluminum.", icon: "Recycle", image: "/images/metal_final/can_to_can_recycling.jpg" },
    { title: "Automotive & Aerospace", desc: "Lightweighting applications including engine blocks, transmission cases, and aircraft parts.", icon: "Car", image: "/images/metal_final/automotive_castings.jpg" },
    { title: "Electrical Wiring", desc: "Extruded into high-conductivity cables and wiring for power grid infrastructure.", icon: "Battery", image: "/images/metal_final/aerospace_wiring.jpg" },
    { title: "HVAC Systems", desc: "Used extensively in manufacturing heat exchangers, radiators, and air conditioning coils.", icon: "Settings", image: "/images/metal_final/hvac_ducting.jpg" }
];

const plasticApps = [
    { title: "Injection Molding", desc: "Used to manufacture automotive components, household goods, and furniture.", icon: "Settings", image: "/images/pe_scrap_app1.jpg" },
    { title: "Extrusion", desc: "Ideal for producing pipes, tubes, and plastic films.", icon: "Package", image: "/images/pe_scrap_app2.jpg" },
    { title: "Packaging", desc: "Reprocessed into containers, crates, and durable packaging materials.", icon: "Recycle", image: "/images/pe_scrap_app3.jpg" },
    { title: "Consumer Goods", desc: "Utilized in the production of everyday items and toys.", icon: "Car", image: "/images/pe_scrap_app4.jpg" }
];

let currentCategory = null;
let currentSlug = null;
let inApplications = false;
let appBuffer = [];
let appStartIndex = -1;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    const slugMatch = line.match(/"slug": "(.*?)"/);
    if (slugMatch) currentSlug = slugMatch[1];
    
    const catMatch = line.match(/"category": "(.*?)"/);
    if (catMatch) currentCategory = catMatch[1];
    
    if (line.includes('"applications": [')) {
        inApplications = true;
        appStartIndex = i;
        appBuffer = [line];
        continue;
    }
    
    if (inApplications) {
        appBuffer.push(line);
        if (line.includes('],')) {
            inApplications = false;
            
            // Check if this is a metal
            let targetApps = null;
            if (currentSlug.includes('ss-') || currentSlug.includes('stainless')) {
                targetApps = ssApps;
            } else if (currentSlug.includes('hms') || currentSlug.includes('ms-') || currentSlug.includes('shredded')) {
                targetApps = msApps;
            } else if (currentSlug.includes('alumin')) {
                targetApps = aluApps;
            } else {
                targetApps = plasticApps; // fallback for plastics
            }
            
            const indentMatch = appBuffer[0].match(/^(\s*)/);
            const indent = indentMatch ? indentMatch[1] : '';
            const replacement = `"applications": ${JSON.stringify(targetApps, null, 4)},`.split('\n').map((l, idx) => idx === 0 ? indent + l.trim() : indent + l).join('\n');
            
            // replace lines[appStartIndex] through i with the new string
            lines.splice(appStartIndex, i - appStartIndex + 1, replacement);
            
            // Adjust iterator because we modified the array length
            i = appStartIndex;
        }
    }
}

fs.writeFileSync(dataFile, lines.join('\n'), 'utf-8');
console.log("Customized metal applications successfully!");
