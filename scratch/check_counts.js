import fs from 'fs';
import { productDetailsData } from '../src/data/productDetailsData.js';
import { indiaLocations } from '../src/data/indiaLocations.js';
import { indiaPortsLocations } from '../src/data/indiaPortsLocations.js';

const cachePath = './src/data/keywordCache.json';
let keywordCache = {};
if (fs.existsSync(cachePath)) {
  keywordCache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
}

const getVolume = (slug) => {
  return keywordCache[slug] ? keywordCache[slug].volume : -1;
};

let validProducts = 0;
for (const slug in productDetailsData) {
  if (getVolume(slug) !== 0) validProducts++;
}

console.log('Valid products:', validProducts);
console.log('India locations:', Object.keys(indiaLocations).length);
console.log('Total India expected:', validProducts * Object.keys(indiaLocations).length);
