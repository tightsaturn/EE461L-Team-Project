import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import static org.junit.Assert.assertTrue;

public class ItemsUITest {
    @Test
    //Searching for Timer-ball
    public void t0() throws InterruptedException{
        boolean found = false;
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/items");
        Thread.sleep(10000);
        WebElement we = wd.findElement(By.cssSelector("#mainContent > form > input:nth-child(2)"));
        we.sendKeys("Timer-ball");
        we.findElement(By.xpath("/html/body/div/div[2]/form/button[2]")).click();
        WebElement result = wd.findElement(By.cssSelector(".table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)"));
        String text = result.getText();
        if(text.contains("Timer-ball")){
            found = true;
        }
        assertTrue(found);
        wd.quit();
    }

    //Test the includes for instances
    @Test
    public void t1() throws InterruptedException{
        boolean found = false;
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/items");
        Thread.sleep(10000);
        WebElement we = wd.findElement(By.cssSelector("input.mr-sm-2:nth-child(4)"));
        we.sendKeys("ball");
        we.findElement(By.xpath("/html/body/div/div[2]/form/button[2]")).click();
        WebElement result = wd.findElement(By.cssSelector(".table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)"));
        String text = result.getText();
        if(text.contains("Master-ball")){
            found = true;
        }
        assertTrue(found);
        wd.quit();
    }
}
