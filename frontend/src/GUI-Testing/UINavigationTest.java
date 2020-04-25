import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.*;

public class UINavigationTest {

    @Test
    //Test the navbar from the homepage
    public void t0() {
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/");
        List<WebElement> anchors = wd.findElements(By.tagName("a"));
        Iterator<WebElement> i = anchors.iterator();
        int j = 0;
        ArrayList navBar = new ArrayList<String>();
        navBar.add("/pokemon");
        navBar.add("/moves");
        navBar.add("/abilities");
        navBar.add("/items");
        navBar.add("/");
        navBar.add("/types");
        navBar.add("/teambuilder");
        navBar.add("/aboutus");
        navBar.add("/feedback");
        while (i.hasNext()) {
            WebElement anchor = i.next();
            if(anchor.getAttribute("href") != null) {
                if (anchor.getAttribute("href").contains((CharSequence) navBar.get(j))) {
                    anchor.click();
                    String url = wd.getCurrentUrl();
                    assertEquals("https://togepedia.appspot.com" + navBar.get(j), url);
                    j++;
                    wd.navigate().back();
                }
            }
        }
        wd.quit();
    }

    //Test the Learn More Button on the pokemon page
    @Test
    public void t1() {
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/pokemon");
        // wd.findElement(By.cssSelector("btn btn-btn btn-danger")).click();
        wd.findElement(By.cssSelector("div.col-sm-3:nth-child(1) > div:nth-child(1) > div:nth-child(3) > a:nth-child(1) > button:nth-child(1)")).click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/pokemon/1", url);
        wd.quit();
    }


    //Test the Move Name href links on the Moves page
    @Test
    public void t3() throws InterruptedException {
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/moves");
        // wd.findElement(By.cssSelector("btn btn-btn btn-danger")).click();
        Thread.sleep(10000);
        wd.findElement(By.cssSelector("div.col-sm-3:nth-child(1) > div:nth-child(1) > div:nth-child(3) > a:nth-child(1) > button:nth-child(1)")).click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/moves/pound", url);
        wd.quit();
    }

    //Test the Ability Name href links on the Abilities page
    @Test
    public void t4() throws InterruptedException {
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/abilities");
        // wd.findElement(By.cssSelector("btn btn-btn btn-danger")).click();
        Thread.sleep(10000);
        wd.findElement(By.cssSelector("div.col-sm-3:nth-child(1) > div:nth-child(1) > div:nth-child(3) > a:nth-child(1) > button:nth-child(1)")).click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/abilities/1", url);
        wd.quit();
    }

    //Test the Item Name href links on the Items page
    @Test
    public void t5() throws InterruptedException {
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/items");
        // wd.findElement(By.cssSelector("btn btn-btn btn-danger")).click();
        Thread.sleep(10000);
        wd.findElement(By.cssSelector(".table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)")).click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/items/1", url);
        wd.quit();
    }

    //Test the Type href links on the Types page
    @Test
    public void t6() throws InterruptedException {
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/types");
        // wd.findElement(By.cssSelector("btn btn-btn btn-danger")).click();
        Thread.sleep(3000);
        wd.findElement(By.cssSelector("div.col-lg-2:nth-child(1) > a:nth-child(1) > img:nth-child(1)")).click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/types/normal", url);
        wd.quit();
    }

    //Test the Change/Add/Reset links on the TeamBuilder page
    @Test
    public void t8() throws InterruptedException {
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/teambuilder");
        // wd.findElement(By.cssSelector("btn btn-btn btn-danger")).click();
        Thread.sleep(3000);
        wd.findElement(By.cssSelector("div.col-lg-2:nth-child(1) > div:nth-child(1) > div:nth-child(2) > a:nth-child(4)")).click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/teambuilder/addpokemon/1", url);
        Thread.sleep(10000);
        wd.findElement(By.cssSelector(".table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(5) > a:nth-child(1) > button:nth-child(1)")).click();
        url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/teambuilder/change/1/1", url);
        wd.findElement(By.cssSelector(".btn-outline-danger")).click();
        url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/teambuilder/resetTeam", url);
        wd.quit();
    }

    //Test the Feedback page
    @Test
    public void t9() throws InterruptedException {
        System.setProperty("webdriver.gecko.driver", "C:\\Users\\admin\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
        WebDriver wd = new FirefoxDriver(); // launch the browser
        wd.get("https://togepedia.appspot.com/feedback");
        // wd.findElement(By.cssSelector("btn btn-btn btn-danger")).click();
        Thread.sleep(3000);
        wd.findElement(By.cssSelector(".btn")).click();
        String url = wd.getCurrentUrl();
        assertEquals("https://togepedia.appspot.com/feedback/thankyou", url);
        wd.quit();
    }
}