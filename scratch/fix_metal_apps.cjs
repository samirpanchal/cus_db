const fs = require('fs');
const path = '/Users/samirpanchal/website4/anchorstone-website-clone/src/data/productDetailsData.js';

let content = fs.readFileSync(path, 'utf8');

const replaceApplications = (key, newApps) => {
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

// Stainless Steel
replaceApplications("ss-316-scrap", [
    { title: "Marine Hardware", desc: "Perfect for coastal architecture and marine components requiring high corrosion resistance.", icon: "ShieldCheck", image: "/images/metal_final/marine_hardware.jpg" },
    { title: "Chemical Piping", desc: "Used in chemical processing plants due to excellent chemical resistance.", icon: "Settings", image: "/images/metal_final/chemical_piping.jpg" },
    { title: "Pharmaceutical Tanks", desc: "Essential for manufacturing sanitary pharmaceutical storage and processing tanks.", icon: "Package", image: "/images/metal_final/pharmaceutical_tanks.jpg" },
    { title: "Coastal Architecture", desc: "Utilized in structures exposed to salt water and marine environments.", icon: "Car", image: "/images/metal_final/coastal_architecture.jpg" }
]);

replaceApplications("ss-304-scrap", [
    { title: "Kitchen Appliances", desc: "Recycled into durable, rust-resistant commercial and domestic kitchen appliances.", icon: "Settings", image: "/images/metal_final/kitchen_appliances.jpg" },
    { title: "Architectural Frames", desc: "Used in producing strong and aesthetic architectural structures and frames.", icon: "Package", image: "/images/metal_final/architectural_frames.jpg" },
    { title: "Pipe Manufacturing", desc: "Melted down to produce industrial pipes for water and mild chemical transport.", icon: "Car", image: "/images/metal_final/pipe_manufacturing.jpg" },
    { title: "Food & Beverage", desc: "Essential for manufacturing sanitary brewery vats, food processing lines, and dairy tanks.", icon: "Leaf", image: "/images/metal_final/brewery_vats.jpg" }
]);

replaceApplications("ss-310-scrap", [
    { title: "Heat Treatment Baskets", desc: "Used for manufacturing baskets and trays for high-temperature furnaces.", icon: "Settings", image: "/images/metal_final/heat_treatment_baskets.jpg" },
    { title: "Muffle Furnaces", desc: "Essential material for constructing inner chambers of industrial muffle furnaces.", icon: "Package", image: "/images/metal_final/muffle_furnaces.jpg" },
    { title: "Jet Engine Parts", desc: "Recycled into high-strength components used in aerospace jet engines.", icon: "Car", image: "/images/metal_final/jet_engine_parts.jpg" },
    { title: "Exhaust Systems", desc: "Perfect for heavy-duty automotive and industrial exhaust systems.", icon: "ShieldCheck", image: "/images/metal_final/exhaust_systems.jpg" }
]);

replaceApplications("ss-208-scrap", [
    { title: "Cookware", desc: "Commonly recycled into pots, pans, and other domestic cookware.", icon: "Settings", image: "/images/metal_final/cookware.jpg" },
    { title: "Domestic Appliances", desc: "Used in the manufacturing of washing machines, dishwashers, and other home appliances.", icon: "Package", image: "/images/metal_final/domestic_appliances.jpg" },
    { title: "Outdoor Furniture", desc: "Provides weather-resistant framing for durable outdoor furniture.", icon: "Car", image: "/images/metal_final/outdoor_furniture.jpg" },
    { title: "Automotive Trim", desc: "Utilized in decorative automotive trim and brightwork components.", icon: "ShieldCheck", image: "/images/metal_final/automotive_trim.jpg" }
]);

// Mild Steel and HMS
replaceApplications("hms-and-mild-steel-scrap", [
    { title: "Scaffolding Systems", desc: "Melted and reformed into strong scaffolding systems for construction.", icon: "Package", image: "/images/metal_final/scaffolding_systems.jpg" },
    { title: "Bridge Supports", desc: "Used in producing heavy-duty bridge supports and infrastructure.", icon: "Settings", image: "/images/metal_final/bridge_supports.jpg" },
    { title: "Storage Racks", desc: "Recycled into heavy-duty storage racks for warehousing and logistics.", icon: "Car", image: "/images/metal_final/storage_racks.jpg" },
    { title: "Fencing Wire Mesh", desc: "Processed into durable fencing wire mesh for agricultural and security use.", icon: "ShieldCheck", image: "/images/metal_final/fencing_wire_mesh.jpg" }
]);

replaceApplications("hms-1-scrap", [
    { title: "Structural Steel", desc: "Melted down to produce I-beams and columns for major construction projects.", icon: "Package", image: "/images/metal_final/i_beam_production.jpg" },
    { title: "Heavy Machinery", desc: "Crucial for forging components used in industrial and agricultural machinery.", icon: "Settings", image: "/images/metal_final/heavy_machinery.jpg" },
    { title: "Shipbuilding", desc: "Recycled steel plates are heavily utilized in commercial shipbuilding and repairs.", icon: "Car", image: "/images/metal_final/shipbuilding_plates.jpg" },
    { title: "Structural Supports", desc: "Processed into rebar to provide tensile strength for concrete structures globally.", icon: "ShieldCheck", image: "/images/metal_final/structural_supports.jpg" }
]);

replaceApplications("hms-2-scrap", [
    { title: "Reinforcing Bars", desc: "Processed into rebar to provide tensile strength for concrete structures globally.", icon: "ShieldCheck", image: "/images/metal_final/reinforcing_bar.jpg" },
    { title: "Railroad Tracks", desc: "Recycled into new rails and components for railway infrastructure.", icon: "Package", image: "/images/metal_final/railroad_tracks.jpg" },
    { title: "Electric Arc Furnaces", desc: "Ideal feedstock for melting down in electric arc furnaces for new steel.", icon: "Settings", image: "/images/metal_final/electric_arc_furnaces.jpg" },
    { title: "Pipe Manufacturing", desc: "Used to manufacture strong steel pipes for industrial and civil engineering.", icon: "Car", image: "/images/metal_final/pipe_manufacturing.jpg" }
]);

replaceApplications("shredded-steel-scrap", [
    { title: "Electric Arc Furnaces", desc: "Excellent high-density feed for rapid melting in electric arc furnaces.", icon: "Package", image: "/images/metal_final/electric_arc_furnaces.jpg" },
    { title: "Powder Metallurgy", desc: "Converted into metal powder for 3D printing and specialized manufacturing.", icon: "Settings", image: "/images/metal_final/powder_metallurgy.jpg" },
    { title: "Fasteners & Nuts", desc: "Recycled into durable fasteners, nuts, and bolts for general construction.", icon: "Car", image: "/images/metal_final/fasteners_nuts.jpg" },
    { title: "Briquette Production", desc: "Compacted into steel briquettes for efficient storage and remelting.", icon: "ShieldCheck", image: "/images/metal_final/briquette_production.jpg" }
]);

replaceApplications("ms-sheet-fabrication-scrap", [
    { title: "Appliance Bodies", desc: "Used in producing bodies and casings for home and commercial appliances.", icon: "Package", image: "/images/metal_final/appliance_bodies.jpg" },
    { title: "Automotive Panels", desc: "Recycled into sheet metal for automotive body panels and chassis.", icon: "Settings", image: "/images/metal_final/automotive_panels.jpg" },
    { title: "Electrical Enclosures", desc: "Formed into protective enclosures for electrical and control systems.", icon: "Car", image: "/images/metal_final/electrical_enclosures.jpg" },
    { title: "HVAC Ducting", desc: "Used to manufacture ventilation ducts and HVAC system components.", icon: "ShieldCheck", image: "/images/metal_final/hvac_ducting.jpg" }
]);

replaceApplications("ms-turning-scrap", [
    { title: "Gear Manufacturing", desc: "Recycled and forged into high-strength gears for machinery.", icon: "Package", image: "/images/metal_final/gear_manufacturing.jpg" },
    { title: "Powder Metallurgy", desc: "Processed into fine steel powder for advanced metallurgy applications.", icon: "Settings", image: "/images/metal_final/powder_metallurgy.jpg" },
    { title: "Counterweights", desc: "Melted to produce heavy counterweights for elevators and cranes.", icon: "Car", image: "/images/metal_final/counterweights.jpg" },
    { title: "Briquette Production", desc: "Compacted into solid briquettes for efficient transport and melting.", icon: "ShieldCheck", image: "/images/metal_final/briquette_production.jpg" }
]);

replaceApplications("ms-forging-scrap", [
    { title: "Fasteners & Nuts", desc: "Ideal for forging into high-strength bolts, nuts, and industrial fasteners.", icon: "Package", image: "/images/metal_final/fasteners_nuts.jpg" },
    { title: "Hand Tools", desc: "Recycled into durable hand tools for construction and mechanics.", icon: "Settings", image: "/images/metal_final/hand_tools.jpg" },
    { title: "Automotive Drivetrains", desc: "Forged into critical automotive components like axles and drivetrains.", icon: "Car", image: "/images/metal_final/automotive_drivetrains.jpg" },
    { title: "Flanges & Fittings", desc: "Used to manufacture heavy-duty pipe flanges and industrial fittings.", icon: "ShieldCheck", image: "/images/metal_final/flanges_fittings.jpg" }
]);

replaceApplications("ms-angles-scrap", [
    { title: "Transmission Towers", desc: "Recycled into steel profiles for high-voltage power transmission towers.", icon: "Package", image: "/images/metal_final/transmission_towers.jpg" },
    { title: "Solar Panel Mounts", desc: "Used to fabricate robust mounting structures for solar panel farms.", icon: "Settings", image: "/images/metal_final/solar_panel_mounts.jpg" },
    { title: "Metal Roofing", desc: "Melted and rolled into durable metal roofing sheets and panels.", icon: "Car", image: "/images/metal_final/metal_roofing.jpg" },
    { title: "Structural Supports", desc: "Utilized in creating angular structural supports for commercial buildings.", icon: "ShieldCheck", image: "/images/metal_final/structural_supports.jpg" }
]);

replaceApplications("ms-sheet-stamping-scrap", [
    { title: "Metal Stamping", desc: "Recycled back into fresh steel sheets for precision metal stamping.", icon: "Package", image: "/images/metal_final/metal_stamping.jpg" },
    { title: "Motor Laminations", desc: "Used to produce laminations for electric motors and transformers.", icon: "Settings", image: "/images/metal_final/motor_laminations.jpg" },
    { title: "Consumer Electronics", desc: "Formed into internal chassis and shielding for consumer electronics.", icon: "Car", image: "/images/metal_final/consumer_electronics.jpg" },
    { title: "Rivets & Fasteners", desc: "Processed into small mechanical parts like rivets and specialized fasteners.", icon: "ShieldCheck", image: "/images/metal_final/rivets_fasteners.jpg" }
]);

// Aluminum
replaceApplications("aluminium-scrap", [
    { title: "Beverage Cans", desc: "Rapid can-to-can recycling loop, saving enormous energy compared to primary aluminum.", icon: "Recycle", image: "/images/metal_final/can_to_can_recycling.jpg" },
    { title: "Automotive & Aerospace", desc: "Lightweighting applications including engine blocks, transmission cases, and aircraft parts.", icon: "Car", image: "/images/metal_final/automotive_castings.jpg" },
    { title: "Electrical Wiring", desc: "Extruded into high-conductivity cables and wiring for power grid infrastructure.", icon: "Battery", image: "/images/metal_final/aerospace_wiring.jpg" },
    { title: "HVAC Systems", desc: "Used extensively in manufacturing heat exchangers, radiators, and air conditioning coils.", icon: "Settings", image: "/images/metal_final/hvac_ducting.jpg" }
]);

replaceApplications("aluminum-radiators-talk-scrap", [
    { title: "Air Conditioning Coils", desc: "Recycled directly into new AC coils and climate control components.", icon: "Recycle", image: "/images/metal_final/air_conditioning_coils.jpg" },
    { title: "New Heat Exchangers", desc: "Ideal for manufacturing high-efficiency heat exchangers for industrial cooling.", icon: "Car", image: "/images/metal_final/new_heat_exchangers.jpg" },
    { title: "Aerospace Cooling", desc: "Used in advanced thermal management systems for aerospace applications.", icon: "Battery", image: "/images/metal_final/aerospace_cooling.jpg" },
    { title: "HVAC Systems", desc: "Melted down to produce new commercial and residential HVAC components.", icon: "Settings", image: "/images/metal_final/hvac_systems.jpg" }
]);

replaceApplications("used-beverage-can-ubc-scrap", [
    { title: "Can-to-Can Recycling", desc: "Perfectly suited for rapid closed-loop beverage can manufacturing.", icon: "Recycle", image: "/images/metal_final/can_to_can_recycling.jpg" },
    { title: "Foil Packaging", desc: "Processed into thin aluminum foil for food and pharmaceutical packaging.", icon: "Car", image: "/images/metal_final/foil_packaging.jpg" },
    { title: "Cookware", desc: "Recycled into high-quality aluminum pots, pans, and kitchenware.", icon: "Battery", image: "/images/metal_final/cookware.jpg" },
    { title: "Bicycle Frames", desc: "Used to produce lightweight and durable frames for bicycles.", icon: "Settings", image: "/images/metal_final/bicycle_frames.jpg" }
]);

replaceApplications("aluminum-cables-scrap", [
    { title: "Power Grid Expansion", desc: "Recycled into new high-tension cables for expanding electrical grids.", icon: "Recycle", image: "/images/metal_final/power_grid_expansion.jpg" },
    { title: "Coaxial Cables", desc: "Used in the manufacturing of telecommunications and coaxial cables.", icon: "Car", image: "/images/metal_final/coaxial_cables.jpg" },
    { title: "Transformer Windings", desc: "Processed into conductive strips for electrical transformer windings.", icon: "Battery", image: "/images/metal_final/transformer_windings.jpg" },
    { title: "Antenna Systems", desc: "Utilized in fabricating lightweight radio and telecommunication antennas.", icon: "Settings", image: "/images/metal_final/antenna_systems.jpg" }
]);

replaceApplications("cast-aluminum-tense-scrap", [
    { title: "Engine Blocks", desc: "Recycled to cast new, lightweight automotive engine blocks.", icon: "Recycle", image: "/images/metal_final/engine_blocks.jpg" },
    { title: "Pump Housings", desc: "Used for casting robust housings for industrial water and chemical pumps.", icon: "Car", image: "/images/metal_final/pump_housings.jpg" },
    { title: "Outdoor Furniture", desc: "Cast into ornate and durable frames for patio and outdoor furniture.", icon: "Battery", image: "/images/metal_final/outdoor_furniture.jpg" },
    { title: "Gear Manufacturing", desc: "Used to produce specialized aluminum gears and mechanical components.", icon: "Settings", image: "/images/metal_final/gear_manufacturing.jpg" }
]);

replaceApplications("aluminium-wire-scrap", [
    { title: "Welding Wire", desc: "Processed into consumable aluminum wire for MIG and TIG welding.", icon: "Recycle", image: "/images/metal_final/welding_wire.jpg" },
    { title: "Fencing Wire Mesh", desc: "Extruded into corrosion-resistant wire for fencing and mesh products.", icon: "Car", image: "/images/metal_final/fencing_wire_mesh.jpg" },
    { title: "Nails & Fasteners", desc: "Used to manufacture lightweight aluminum nails and specialty fasteners.", icon: "Battery", image: "/images/metal_final/nails_fasteners.jpg" },
    { title: "Consumer Electronics", desc: "Utilized in producing internal wiring and components for electronics.", icon: "Settings", image: "/images/metal_final/consumer_electronics.jpg" }
]);

replaceApplications("aluminium-6063-scrap", [
    { title: "Architectural Frames", desc: "Recycled into premium extrusions for window and door frames.", icon: "Recycle", image: "/images/metal_final/architectural_frames.jpg" },
    { title: "Heat Sinks", desc: "Used to manufacture highly efficient heat sinks for electronics.", icon: "Car", image: "/images/metal_final/heat_sinks.jpg" },
    { title: "Bicycle Frames", desc: "Extruded into strong, lightweight tubes for performance bicycle frames.", icon: "Battery", image: "/images/metal_final/bicycle_frames.jpg" },
    { title: "Solar Panel Mounts", desc: "Formed into corrosion-resistant mounting structures for solar panels.", icon: "Settings", image: "/images/metal_final/solar_panel_mounts.jpg" }
]);

fs.writeFileSync(path, content, 'utf8');
console.log("Done updating productDetailsData.js");
