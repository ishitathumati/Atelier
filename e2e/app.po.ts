import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo(){
      return browser.get('/login');
  }
  get usernameLabel() {
    return element(by.css('.login-field:nth-child(1) label'));
  }

  getEmailTextbox() {
    return element(by.id('username'));
   }
   get passwordLabel() {
    return element(by.css('.login-field:nth-child(2) label'));
  }
   getPasswordTextbox() {
    return element(by.id('password'));
   }
}

export class Page {

  navigateTo(){
    return browser.get('/login');
}

  getTitle() {
    return browser.getTitle();
  }

  getPageOneTitleText() {
    return element(by.tagName('page-page1')).element(by.tagName('ion-title')).element(by.css('.toolbar-title')).getText();
  }

  goToLoginPage(): any{
    let LoginPage = require("../src/pages/login/login").default;
    return new LoginPage();
  }

  getUser(){
    return element(by.id('username'))
  }

  getPass(){
    return element(by.id('password'))
  }
 
}
