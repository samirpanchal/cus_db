import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { productDetailsData } from '../src/data/productDetailsData.js';
import { globalLocations } from '../src/data/locations.js';
import { indiaLocations } from '../src/data/indiaLocations.js';
import { indiaPortsLocations } from '../src/data/indiaPortsLocations.js';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = "3cc2cef583894a34ba64fcf1a51c0bfe";
const HOST = "anchorstoneglobal.co.in";
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;
const INDEXNOW_URL = "https://api.indexnow.org/indexnow";

const cachePath = path.join(__dirname, '..', 'src', 'data', 'keywordCache.json');
let keywordCache = {};
if (fs.existsSync(cachePath)) {
  keywordCache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
}

const getVolume = (slug) => {
  return keywordCache[slug] ? keywordCache[slug].volume : -1;
};

// 1. Generate all URLs
let allUrls = [];

const staticPages = [
  '/',
  '/about',
  '/materials',
  '/contact',
  '/quote',
  '/locations',
  '/locations/global',
  '/locations/import-india',
  '/locations/india'
];

for (const page of staticPages) {
  allUrls.push(`https://${HOST}${page}`);
}

for (const slug in productDetailsData) {
  if (getVolume(slug) === 0) continue;
  
  // Base material pages
  allUrls.push(`https://${HOST}/materials/${slug}.html`);
  
  // Global Export
  for (const location in globalLocations) {
    allUrls.push(`https://${HOST}/export/${location}/${slug}.html`);
  }
  
  // India Domestic
  for (const location in indiaLocations) {
    allUrls.push(`https://${HOST}/india/${location}/${slug}.html`);
  }
  
  // India Ports
  for (const location in indiaPortsLocations) {
    allUrls.push(`https://${HOST}/import-india/${location}/${slug}.html`);
  }
}

console.log(`Total URLs to submit: ${allUrls.length}`);

// 2. Submit to IndexNow API in chunks of 10,000
const submitToIndexNow = (urlList, chunkIndex) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      host: HOST,
      key: API_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList
    });

    const url = new URL(INDEXNOW_URL);
    
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log(`✅ Chunk ${chunkIndex + 1} submitted successfully! Response: ${res.statusCode}`);
          resolve();
        } else {
          console.error(`❌ Chunk ${chunkIndex + 1} failed. Status: ${res.statusCode}. Response: ${responseBody}`);
          reject(new Error(`Failed with status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (e) => {
      console.error(`❌ Request error for chunk ${chunkIndex + 1}: ${e.message}`);
      reject(e);
    });

    req.write(data);
    req.end();
  });
};

const CHUNK_SIZE = 10000;

const run = async () => {
  console.log('Starting IndexNow submission...');
  
  for (let i = 0; i < allUrls.length; i += CHUNK_SIZE) {
    const chunk = allUrls.slice(i, i + CHUNK_SIZE);
    console.log(`Submitting chunk ${Math.floor(i / CHUNK_SIZE) + 1} of ${Math.ceil(allUrls.length / CHUNK_SIZE)} (URLs ${i + 1} to ${i + chunk.length})...`);
    
    try {
      await submitToIndexNow(chunk, Math.floor(i / CHUNK_SIZE));
      // Add a small delay between chunks to avoid rate limiting
      if (i + CHUNK_SIZE < allUrls.length) {
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch (error) {
      console.error('Submission stopped due to error.');
      break;
    }
  }
  
  console.log('Finished IndexNow submissions!');
};

run();
