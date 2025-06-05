// puppeteer/src/index.js
import { PRINT_OVERRIDE_CSS } from 'core/css-overrides';
import { generatePDF } from 'core/pdf-generator';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

(async () => {
  // Random user-agent
  const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
  ];
  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

  // Launch browser
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent(userAgent);
  
  // Navigate to target URL
  await page.goto('https://example.com/restricted-page',  {
    waitUntil: 'networkidle2'
  });

  // Wait for dynamic content
  await page.waitForSelector('.ace_content');
  await page.waitForSelector('.MathJax');

  // Inject CSS overrides
  await page.addStyleTag({ content: PRINT_OVERRIDE_CSS });

  // Remove click event listeners
  await page.evaluate(() => {
    document.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
    }, true);
  });

  // Add random delay (1-3 seconds)
  await page.waitForTimeout(Math.floor(Math.random() * 2000) + 1000);

  // Generate PDF
  await generatePDF(page, 'output.pdf');
  await browser.close();
})();