const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('pageerror', err => {
    console.error('Page error: ', err.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('Console error:', msg.text());
  });
  try {
    await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle0', timeout: 10000 });
    console.log("Page loaded successfully.");
  } catch (e) {
    console.error("Navigation error:", e);
  }
  await browser.close();
})();
