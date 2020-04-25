import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;

public class TeamBuilderIUTest {
    @Test
    //Test adding Pokemon in Team
    public void t0() throws InterruptedException{
        boolean found = false;
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/teambuilder");
        Thread.sleep(10000);
        WebElement we = wd.findElement(By.cssSelector("div.col-lg-2:nth-child(1) > div:nth-child(1) > div:nth-child(2) > a:nth-child(4)"));
        we.click();
        Thread.sleep(10000);
        we = wd.findElement(By.xpath("/html/body/div/div[2]/div/table/tbody/tr[1]/td[5]/a/button"));
        we.click();
        we = wd.findElement(By.cssSelector("div.col-lg-2:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)"));
        String text = we.getText();
        if (text.equals("Bulbasaur")) {
            found = true;
        }
        assertTrue(found);
        wd.quit();
    }
}
