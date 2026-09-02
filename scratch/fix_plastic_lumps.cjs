const fs = require('fs');
const path = '/Users/samirpanchal/website4/anchorstone-website-clone/src/data/productDetailsData.js';

let content = fs.readFileSync(path, 'utf8');

const replaceApplications = (key, newApps) => {
    const keyRegex = new RegExp(`"${key}":\\s*\\{[\\s\\S]*?"applications":\\s*\\[`, 'g');
    let startIndex = -1;
    let keyMatch = keyRegex.exec(content);
    if (keyMatch) {
        startIndex = keyMatch.index + keyMatch[0].length - 1;
    } else {
        console.log("Could not find key or applications for:", key);
        return;
    }

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

replaceApplications("polyethylene-pe-lumps", [
    { title: "Plastic Drums & Containers", desc: "Used in producing heavy-duty storage containers.", icon: "Package", image: "/images/plastics_final/bottle_to_bottle_recycling.jpg" },
    { title: "Chemical Resistant Pipes", desc: "Ideal for extruding industrial piping systems.", icon: "Settings", image: "/images/plastics_final/pipe_conduit_manufacturing.jpg" },
    { title: "Agricultural Film", desc: "Recycled into durable films for agricultural use.", icon: "Leaf", image: "/images/plastics_final/thermoformed_packaging.jpg" },
    { title: "Construction Profiles", desc: "Manufactured into heavy-duty construction profiles and geomembranes.", icon: "ShieldCheck", image: "/images/plastics_final/construction_profiles.jpg" }
]);

replaceApplications("polyvinyl-chloride-pvc-lumps", [
    { title: "Construction Pipes", desc: "Recycled directly into high-pressure water and sewage pipes.", icon: "Settings", image: "/images/plastics_final/pipe_conduit_manufacturing.jpg" },
    { title: "Window & Door Profiles", desc: "Extruded into durable, weather-resistant architectural profiles.", icon: "Package", image: "/images/plastics_final/construction_profiles.jpg" },
    { title: "Industrial Flooring Mats", desc: "Melted to form flexible, tough industrial safety flooring.", icon: "ShieldCheck", image: "/images/plastics_final/industrial_bearings.jpg" },
    { title: "Cable Insulation Conduits", desc: "Used to produce fire-resistant conduit systems for electrical wiring.", icon: "Car", image: "/images/plastics_final/cable_insulation.jpg" }
]);

replaceApplications("high-impact-polystyrene-lumps", [
    { title: "Appliance Housings", desc: "Used extensively in molding sturdy housings for home appliances.", icon: "Settings", image: "/images/plastics_final/appliance_housings.jpg" },
    { title: "Automotive Dash Panels", desc: "Recycled into rigid dashboard and interior automotive components.", icon: "Car", image: "/images/plastics_final/automotive_consoles.jpg" },
    { title: "Electronic Casings", desc: "Provides high-impact resistance for consumer electronics shells.", icon: "Package", image: "/images/plastics_final/consumer_electronics_ps.jpg" },
    { title: "Rigid Protective Trays", desc: "Thermoformed into heavy-duty packaging trays for logistics.", icon: "ShieldCheck", image: "/images/plastics_final/thermoformed_packaging.jpg" }
]);

replaceApplications("polyethylene-terephthalate-pet-lumps", [
    { title: "Polyester Staple Fiber", desc: "Spun into fibers for clothing, carpets, and industrial textiles.", icon: "Package", image: "/images/plastics_final/polyester_textiles.jpg" },
    { title: "Clear Packaging Sheets", desc: "Recycled into high-clarity sheets for blister and clamshell packaging.", icon: "Settings", image: "/images/plastics_final/bottle_to_bottle_recycling.jpg" },
    { title: "Industrial Strapping", desc: "Extruded into high-tensile strapping bands for securing heavy cargo.", icon: "Car", image: "/images/plastics_final/strapping_bands.jpg" },
    { title: "Automotive Carpeting", desc: "Processed into durable textile materials for vehicle interiors.", icon: "ShieldCheck", image: "/images/plastics_final/automotive_interiors_ps.jpg" }
]);

replaceApplications("polypropylene-pp-lumps", [
    { title: "Automotive Bumpers", desc: "Re-melted to form flexible and high-impact automotive bumpers.", icon: "Car", image: "/images/plastics_final/automotive_bumpers.jpg" },
    { title: "Food Service Items", desc: "Recycled into durable, heat-resistant food containers.", icon: "Package", image: "/images/plastics_final/food_service_items.jpg" },
    { title: "Medical Hardware", desc: "Molded into rigid components for non-invasive medical equipment.", icon: "ShieldCheck", image: "/images/plastics_final/medical_hardware.jpg" },
    { title: "Consumer Goods", desc: "Utilized extensively in manufacturing durable consumer electronics enclosures.", icon: "Settings", image: "/images/plastics_final/laptop_enclosures.jpg" }
]);

fs.writeFileSync(path, content, 'utf8');
console.log("Done updating productDetailsData.js for plastic lumps");
