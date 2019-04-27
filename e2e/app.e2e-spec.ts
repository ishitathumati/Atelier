
import { browser, by, element } from 'protractor';
import { By } from 'selenium-webdriver';
import {LoginPage } from './app.po'
import { Page } from 'ionic-angular/umd/navigation/nav-util';


describe('Register Page test works!', () => {

  it('register page', function() {
    
    browser.driver.get("http://localhost:8100/");

    browser.driver.findElement(By.css(".button-outline > .button-inner")).click();
    browser.driver.findElement(By.xpath("(//input[@type=\'email\'])[2]")).sendKeys("abc123@email.com");
    browser.driver.findElement(By.xpath("(//input[@type=\'password\'])[2]")).sendKeys("123456");
    browser.driver.findElement(By.xpath("(//input[@type='email'])[3]")).sendKeys("sahil");

  
    browser.driver.findElement(By.xpath("//page-register/ion-content/div[2]/ion-card/ion-card-content/ion-list/button/span")).click();


});
});


describe('login Page test works! ', () => {

  it('login page', function() {

  browser.driver.get("http://localhost:8100/");

  browser.driver.findElement(By.css("#username > .text-input")).click();
  browser.driver.findElement(By.css("#username > .text-input")).sendKeys("nick@email.com");
  browser.driver.findElement(By.css("#password > .text-input")).click();
  browser.driver.findElement(By.css("#password > .text-input")).sendKeys("123456");
  browser.driver.findElement(By.css(".button-full > .button-inner")).click();

  browser.driver.sleep(4000)

 
  });
});



describe('Home Page test works!', () => {

  it('Like function works', function() {
    
    browser.driver.get("http://localhost:8100/");

    browser.driver.findElement(By.css(".button-full > .button-inner")).click();
    
    
    //*[@id="tab-t0-1"]

  });
});


describe('profile page test works!' , () => {
  browser.driver.get("http://localhost:8100/");

  it('Go to user pafe', function() {

    // browser.driver.findElement(By.css("#tab-t0-1 > .tab-button-text")).click();
   

    // browser.driver.findElement(By.css("h2:nth-child(2)"))
    // // browser.driver.findElement(By.id("alert-input-0-0")).sendKeys("Nick Singh!");
    // // browser.driver.findElement(By.css(".activated > .button-inner")).click();
    // // browser.driver.findElement(By.css(".alert-button")).click();
    
  });

});





