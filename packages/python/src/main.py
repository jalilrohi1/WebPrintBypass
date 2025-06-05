# python/src/main.py
from playwright.sync_api import sync_playwright
import random
import time

PRINT_OVERRIDE_CSS = """
@media print {
  .ace_content, .ace_text-layer, .ace_line,
  .MathJax, .MJXp-math {
    display: block !important;
    visibility: visible !important;
  }
  * {
    visibility: visible !important;
    display: block !important;
  }
}
"""

USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
]

def random_delay():
  time.sleep(random.uniform(1, 3))

with sync_playwright() as p:
  browser = p.chromium.launch(headless=True)
  page = browser.new_page()
  
  # Set random user-agent
  page.set_user_agent(random.choice(USER_AGENTS))
  
  # Navigate to target
  page.goto("https://example.com/restricted-page") 
  
  # Wait for dynamic content
  page.wait_for_selector(".ace_content")
  page.wait_for_selector(".MathJax")
  
  # Inject CSS
  page.add_init_script(content=f"""
  (() => {{
    const style = document.createElement('style');
    style.textContent = `{PRINT_OVERRIDE_CSS}`;
    document.head.appendChild(style);
  }})();
  """)
  
  # Add random delay
  random_delay()
  
  # Generate PDF
  page.pdf(path="output.pdf", format="A4", print_background=True)
  browser.close()