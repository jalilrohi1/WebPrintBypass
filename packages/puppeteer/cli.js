// puppeteer/cli.js
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const args = require('yargs')
  .option('url', { type: 'string', demandOption: true, describe: 'URL of the restricted page' })
  .option('output', { type: 'string', default: 'output.pdf', describe: 'Output PDF path' })
  .option('headless', { type: 'boolean', default: true, describe: 'Run browser headless' })
  .help()
  .argv;

(async () => {
  const browser = await puppeteer.launch({ headless: args.headless });
  const page = await browser.newPage();
  
  // Set random user-agent
  const USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
  ];
  await page.setUserAgent(USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]);
  
  // Navigate to URL
  await page.goto(args.url);
  
  // Wait for ACE Editor and MathJax
  await page.waitForSelector('.ace_content');
  await page.waitForSelector('.MathJax');
  
  // Inject CSS
  await page.addStyleTag({ content: require('../core/css-overrides.js').PRINT_OVERRIDE_CSS });
  
  // Add random delay
  await page.waitForTimeout(Math.floor(Math.random() * 2000) + 1000);
  
  // Generate PDF
  await page.pdf({ path: args.output, format: 'A4', printBackground: true });
  await browser.close();
})();