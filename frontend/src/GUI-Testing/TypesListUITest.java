import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class TypesListUITest {
    @Test
    //Searching for Pidgey
    public void t0() throws InterruptedException{
        boolean found = false;
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/types/normal");
        Thread.sleep(10000);
        WebElement we = wd.findElement(By.cssSelector("div.col-lg-6:nth-child(1) > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)"));
        we.click();
        Thread.sleep(2000);
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/pokemon/16/", url);
        wd.quit();
    }

    @Test
    //Searching for Drizzle
    public void t1() throws InterruptedException{
        boolean found = false;
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/types/normal");
        Thread.sleep(10000);
        WebElement we = wd.findElement(By.cssSelector("div.col-lg-6:nth-child(2) > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)"));
        we.click();
        Thread.sleep(2000);
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/moves/pound", url);
        wd.quit();
    }
}
