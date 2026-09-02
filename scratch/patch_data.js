import fs from 'fs';
import { productDetailsData } from '../src/data/productDetailsData.js';

const dataFile = 'src/data/productDetailsData.js';

for (const key in productDetailsData) {
  const p = productDetailsData[key];
  const isMetal = p.heroImage && p.heroImage.includes('metal_final');

  if (isMetal && p.specifications) {
    p.specifications = p.specifications.filter(spec => 
      spec.label !== 'Purity Level' && spec.label !== 'Moisture/Oil'
    );
  }
}

const newOutput = 'export const productDetailsData = ' + JSON.stringify(productDetailsData, null, 2) + ';\n\n// Dynamic material generator for all 55 materials\nexport const getProductDetail = (slug, rawName) => {\n  const key = slug.toLowerCase();\n  if (productDetailsData[key]) {\n    return productDetailsData[key];\n  }\n};\n';

fs.writeFileSync(dataFile, newOutput, 'utf8');
console.log('Successfully removed the two specifications from Metal products!');
