const fs = require('fs');
const path = require('path');

const dataFile = path.resolve(__dirname, '../src/data/productDetailsData.js');
let content = fs.readFileSync(dataFile, 'utf-8');

// The metal applications
content = content.replace(
    /"title": "Metal Casting",\s*"desc": "Melted down and reused in foundries to create new metal components and alloys.",\s*"icon": "Settings"/g,
    `"title": "Metal Casting",
        "desc": "Melted down and reused in foundries to create new metal components and alloys.",
        "icon": "Settings",
        "image": "/images/metal_final/electric_arc_furnaces.jpg"`
);

content = content.replace(
    /"title": "Automotive Parts",\s*"desc": "Recycled metal is heavily utilized in manufacturing vehicle frames and parts.",\s*"icon": "Car"/g,
    `"title": "Automotive Parts",
        "desc": "Recycled metal is heavily utilized in manufacturing vehicle frames and parts.",
        "icon": "Car",
        "image": "/images/metal_final/automotive_castings.jpg"`
);

content = content.replace(
    /"title": "Infrastructure",\s*"desc": "Used to produce structural steel, roofing, and foundational supports.",\s*"icon": "Package"/g,
    `"title": "Infrastructure",
        "desc": "Used to produce structural steel, roofing, and foundational supports.",
        "icon": "Package",
        "image": "/images/metal_final/structural_supports.jpg"`
);

content = content.replace(
    /"title": "Industrial Machinery",\s*"desc": "Essential for manufacturing heavy-duty industrial equipment and tools.",\s*"icon": "Settings"/g,
    `"title": "Industrial Machinery",
        "desc": "Essential for manufacturing heavy-duty industrial equipment and tools.",
        "icon": "Settings",
        "image": "/images/metal_final/heavy_machinery.jpg"`
);

// The plastic applications
content = content.replace(
    /"title": "Injection Molding",\s*"desc": "Used to manufacture automotive components, household goods, and furniture.",\s*"icon": "Settings"/g,
    `"title": "Injection Molding",
        "desc": "Used to manufacture automotive components, household goods, and furniture.",
        "icon": "Settings",
        "image": "/images/pe_scrap_app1.jpg"`
);

content = content.replace(
    /"title": "Extrusion",\s*"desc": "Ideal for producing pipes, tubes, and plastic films.",\s*"icon": "Package"/g,
    `"title": "Extrusion",
        "desc": "Ideal for producing pipes, tubes, and plastic films.",
        "icon": "Package",
        "image": "/images/pe_scrap_app2.jpg"`
);

content = content.replace(
    /"title": "Packaging",\s*"desc": "Reprocessed into containers, crates, and durable packaging materials.",\s*"icon": "Recycle"/g,
    `"title": "Packaging",
        "desc": "Reprocessed into containers, crates, and durable packaging materials.",
        "icon": "Recycle",
        "image": "/images/pe_scrap_app3.jpg"`
);

content = content.replace(
    /"title": "Consumer Goods",\s*"desc": "Utilized in the production of everyday items and toys.",\s*"icon": "Car"/g,
    `"title": "Consumer Goods",
        "desc": "Utilized in the production of everyday items and toys.",
        "icon": "Car",
        "image": "/images/pe_scrap_app4.jpg"`
);

fs.writeFileSync(dataFile, content, 'utf-8');
console.log("Updated applications with images successfully!");
