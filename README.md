# The app is underconstruction ....

## 🚨 Ethical Use Policy
This tool is designed for **educational purposes only**. Use it responsibly to:
- Bypass print restrictions on content you own or have permission to access.
- Improve accessibility for visually impaired users.
- Archive content from platforms that may remove it.

**Do NOT use it to:**
- Circumvent paywalls or copyright protections.
- Distribute restricted content without authorization.
- Bypass security measures on sensitive systems.

## 📦 Features
- **CLI**: Run via command line (`python cli.py --url <URL>`)
- **GUI**: Use the Tkinter-based desktop interface
- **CI/CD**: Automated testing with GitHub Actions


webprintbypass/
├── packages/
│   ├── core/               # Shared logic (CSS overrides, utils) for Node.js
│   ├── puppeteer/          # Node.js + Puppeteer implementation (CLI + stealth)
│   ├── python/             # Python implementation (CLI, GUI, Playwright)
│   │   ├── generate_pdf.py # Core logic (ACE/MathJax overrides, PDF generation)
│   │   ├── cli.py          # CLI interface
│   │   └── gui.py          # Tkinter GUI
│   └── java/               # Java + Selenium (future extension)
├── .github/workflows/      # CI/CD pipelines
├── lerna.json              # Lerna config (for Node.js packages)
└── README.md               # Ethical use docs + CLI/GUI instructions


webprintbypass
├── packages
│   ├── core               # Shared utilities (CSS overrides, PDF generation)
│   ├── puppeteer          # Primary engine (Node.js + Puppeteer)
│   ├── python             # Python implementation (PlaywrightSelenium)
│   └── java               # Java implementation (Selenium)
├── .githubworkflows      # CICD pipelines
├── lerna.json              # Lerna config for monorepo
└── README.md