// java/src/main/java/WebPrintBypass.java
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import org.openqa.selenium.print.PrintOptions;
import org.openqa.selenium.print.Page;
import org.openqa.selenium.print.Pdf;

public class WebPrintBypass {
  public static void main(String[] args) {
    // Random user-agent
    String[] userAgents = {
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
    };
    String userAgent = userAgents[new Random().nextInt(userAgents.length)];

    // Setup Chrome options
    ChromeOptions options = new ChromeOptions();
    options.addArguments("--headless=new");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--print-to-pdf");

    // Set user-agent
    options.addArguments("--user-agent=" + userAgent);

    // Launch browser
    WebDriver driver = new ChromeDriver(options);
    
    // Navigate to target
    driver.get("https://example.com/restricted-page"); 
    
    // Wait for dynamic content
    new WebDriverWait(driver, Duration.ofSeconds(10))
      .until(d -> d.findElement(By.cssSelector(".ace_content")));
    
    // Inject CSS overrides
    ((JavascriptExecutor) driver).executeScript("""
      const style = document.createElement('style');
      style.textContent = arguments[0];
      document.head.appendChild(style);
    """, PRINT_OVERRIDE_CSS);

    // Add random delay
    Thread.sleep((long) (Math.random() * 2000) + 1000);

    // Generate PDF
    PrintOptions printOptions = new PrintOptions();
    printOptions.setShrinkToFit(false);
    Pdf pdf = driver.printPage(printOptions);
    Files.write(Paths.get("output.pdf"), Base64.getDecoder().decode(pdf.getContent()));
    
    driver.quit();
  }
}