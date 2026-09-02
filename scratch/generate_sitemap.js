import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { productDetailsData } from '../src/data/productDetailsData.js';
import { globalLocations } from '../src/data/locations.js';
import { indiaLocations } from '../src/data/indiaLocations.js';
import { indiaPortsLocations } from '../src/data/indiaPortsLocations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

const baseUrl = 'https://anchorstoneglobal.co.in';

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

const writeSitemaps = (baseFilename, urls) => {
  const MAX_URLS_PER_SITEMAP = 40000;
  let generatedFiles = [];
  
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
    const chunk = urls.slice(i, i + MAX_URLS_PER_SITEMAP);
    const suffix = urls.length > MAX_URLS_PER_SITEMAP ? `-${(i / MAX_URLS_PER_SITEMAP) + 1}` : '';
    const filename = `${baseFilename.replace('.xml', '')}${suffix}.xml`;
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    chunk.forEach(urlObj => {
      xml += `  <url>\n    <loc>${urlObj.loc}</loc>\n    <changefreq>${urlObj.changefreq}</changefreq>\n    <priority>${urlObj.priority}</priority>\n  </url>\n`;
    });
    xml += `</urlset>`;
    
    fs.writeFileSync(path.join(publicDir, filename), xml);
    generatedFiles.push(filename);
  }
  
  return generatedFiles;
};

const cachePath = path.join(rootDir, 'src', 'data', 'keywordCache.json');
let keywordCache = {};
if (fs.existsSync(cachePath)) {
  keywordCache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
}

const getVolume = (slug) => {
  return keywordCache[slug] ? keywordCache[slug].volume : -1;
};

// 1. Base Sitemap
let baseUrls = [];
for (const page of staticPages) {
  baseUrls.push({ loc: `${baseUrl}${page}`, changefreq: 'weekly', priority: page === '/' ? '1.0' : '0.8' });
}
for (const slug in productDetailsData) {
  if (getVolume(slug) === 0) continue;
  baseUrls.push({ loc: `${baseUrl}/materials/${slug}.html`, changefreq: 'weekly', priority: '0.8' });
}
const baseFiles = writeSitemaps('sitemap-base.xml', baseUrls);

// 2. Global Export Sitemap
let globalUrls = [];
for (const slug in productDetailsData) {
  if (getVolume(slug) === 0) continue;
  for (const location in globalLocations) {
    globalUrls.push({ loc: `${baseUrl}/export/${location}/${slug}.html`, changefreq: 'weekly', priority: '0.7' });
  }
}
const globalFiles = writeSitemaps('sitemap-global.xml', globalUrls);

// 3. India Domestic Sitemap
let indiaUrls = [];
for (const slug in productDetailsData) {
  if (getVolume(slug) === 0) continue;
  for (const location in indiaLocations) {
    indiaUrls.push({ loc: `${baseUrl}/india/${location}/${slug}.html`, changefreq: 'weekly', priority: '0.7' });
  }
}
const indiaFiles = writeSitemaps('sitemap-india.xml', indiaUrls);

// 4. India Ports Sitemap
let indiaPortsUrls = [];
for (const slug in productDetailsData) {
  if (getVolume(slug) === 0) continue;
  for (const location in indiaPortsLocations) {
    indiaPortsUrls.push({ loc: `${baseUrl}/import-india/${location}/${slug}.html`, changefreq: 'weekly', priority: '0.7' });
  }
}
const indiaPortsFiles = writeSitemaps('sitemap-india-ports.xml', indiaPortsUrls);

// 5. Sitemap Index
const allSitemapFiles = [...baseFiles, ...globalFiles, ...indiaFiles, ...indiaPortsFiles];
const now = new Date().toISOString();
let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
allSitemapFiles.forEach(sitemap => {
  indexXml += `  <sitemap>\n    <loc>${baseUrl}/${sitemap}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>\n`;
});
indexXml += `</sitemapindex>`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml);

const totalUrls = baseUrls.length + globalUrls.length + indiaUrls.length + indiaPortsUrls.length;
console.log(`✅ Sitemap Index generated!`);
console.log(`- Base files: ${baseFiles.join(', ')}`);
console.log(`- Global files: ${globalFiles.join(', ')}`);
console.log(`- India files: ${indiaFiles.join(', ')}`);
console.log(`- India Ports files: ${indiaPortsFiles.join(', ')}`);
console.log(`🚀 Total Indexed Footprint: ${totalUrls} pages across ${allSitemapFiles.length} files!`);
