const fs = require('fs');
const path = require('path');

const baseUrl = 'https://frostactive.com';
const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

const routes = [
  '/',
  '/order',
  '/about',
  '/blogs',
  '/blogs2',
  '/blogs3',
  '/blogs4',
  '/about',
  '/djangel',
  '/community'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

const outputPath = path.resolve(__dirname, 'public/sitemap.xml');

fs.writeFileSync(outputPath, sitemap);
console.log('✅ sitemap.xml generated at /public/sitemap.xml');
