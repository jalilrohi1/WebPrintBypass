# python/cli.py
import argparse
from generate_pdf import generate_pdf

def main():
    parser = argparse.ArgumentParser(description="WebPrintBypass CLI - Bypass print restrictions and generate PDFs")
    parser.add_argument("--url", required=True, help="URL of the restricted page")
    parser.add_argument("--output", default="output.pdf", help="Output PDF file path")
    parser.add_argument("--headless", action="store_true", help="Run browser in headless mode")
    args = parser.parse_args()

    try:
        generate_pdf(url=args.url, output_path=args.output, headless=args.headless)
        print(f"✅ PDF saved to {args.output}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()