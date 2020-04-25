import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class PokemonInfoPageUITest {

    //Testing Type 1 linking in Bulbasaur
    @Test
    public void t0() throws InterruptedException{
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/pokemon/1");
        Thread.sleep(10000);
        WebElement we = wd.findElement(By.cssSelector("#types > a:nth-child(1) > img:nth-child(1)"));
        we.click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/types/poison", url);
        wd.quit();
    }

    //Testing Type 2 linking in Bulbasaur
    @Test
    public void t1() throws InterruptedException{
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/pokemon/1");
        Thread.sleep(10000);
        WebElement we = wd.findElement(By.cssSelector("#types > a:nth-child(2) > img:nth-child(1)"));
        we.click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/types/grass", url);
        wd.quit();
    }
    //Testing Abilities 1 linking in Bulbasaur
    @Test
    public void t2() throws InterruptedException{
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/pokemon/1");
        Thread.sleep(10000);
        WebElement we = wd.findElement(By.cssSelector("#abilities > div:nth-child(2) > a:nth-child(1)"));
        we.click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/abilities/34/", url);
        wd.quit();
    }

    //Testing Abilities 2 linking in Bulbasaur
    @Test
    public void t3() throws InterruptedException{
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/pokemon/1");
        Thread.sleep(10000);
        WebElement we = wd.findElement(By.cssSelector("#abilities > div:nth-child(3) > a:nth-child(1)"));
        we.click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/abilities/65/", url);
        wd.quit();
    }

    //Testing Move 1 linking in Bulbasaur
    @Test
    public void t4() throws InterruptedException{
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/pokemon/1");
        Thread.sleep(10000);
        WebElement we = wd.findElement(By.cssSelector(".table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)"));
        we.click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/moves/razor-wind", url);
        wd.quit();
    }

}
