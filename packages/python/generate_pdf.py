# python/generate_pdf.py
from playwright.sync_api import sync_playwright
import random
import time

PRINT_OVERRIDE_CSS = """
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
"""

def generate_pdf(url, output_path, headless=True):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=headless)
        page = browser.new_page()
        
        # Random user-agent
        USER_AGENTS = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
        ]
        page.set_user_agent(random.choice(USER_AGENTS))
        
        # Navigate to URL
        page.goto(url)
        
        # Wait for ACE Editor and MathJax
        page.wait_for_selector(".ace_content", timeout=10000)
        page.wait_for_selector(".MathJax", timeout=10000)
        
        # Inject CSS
        page.add_init_script(content=f"""
        (() => {{
            const style = document.createElement('style');
            style.textContent = `{PRINT_OVERRIDE_CSS}`;
            document.head.appendChild(style);
        }})();
        """)
        
        # Add random delay (1-3 seconds)
        time.sleep(random.uniform(1, 3))
        
        # Generate PDF
        page.pdf(path=output_path, format="A4", print_background=True)
        browser.close()