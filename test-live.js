const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('pageerror', err => {
    console.log('--- PAGE ERROR ---');
    console.log(err.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('--- CONSOLE ERROR ---');
      console.log(msg.text());
    }
  });
  await page.goto('https://www.knitta-corner.shop', { waitUntil: 'networkidle0' });
  console.log('Finished loading Home page.');
  await browser.close();
})();
