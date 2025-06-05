const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Random user-agent to mimic human behavior
  const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
  ];
  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  await page.setUserAgent(userAgent);

  // Navigate to the exam page
  await page.goto('https://example.com/restricted-page?cmid=140930', {
    waitUntil: 'networkidle2'
  });

  // Wait for ACE Editor and MathJax to load
  await page.waitForSelector('.ace_content', { timeout: 10000 });
  await page.waitForSelector('.MathJax', { timeout: 10000 });

  // Inject targeted CSS overrides
  await page.addStyleTag({
    content: `
      @media print {
        .ace_content, .ace_text-layer, .ace_line {
          display: block !important;
          visibility: visible !important;
        }
        .MathJax, .MJXp-math, .MathJax_Display {
          display: inline-block !important;
          visibility: visible !important;
        }
        body * {
          visibility: visible !important;
          display: block !important;
        }
      }
    `
  });

  // Remove click event listeners
  await page.evaluate(() => {
    document.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
    }, true);
  });

  // Add random delay (1-3 seconds)
  await page.waitForTimeout(Math.floor(Math.random() * 2000) + 1000);

  // Generate PDF
  await page.pdf({
    path: 'output.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
  });

  await browser.close();
})();