// core/src/css-overrides.js
export const PRINT_OVERRIDE_CSS = `
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
`;

// core/src/pdf-generator.js
export async function generatePDF(page, outputPath) {
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
  });
}