import { browser, element, by } from 'protractor';

export class PortMatrixPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getTitle() {
    // return element(by.css('app-root h1')).getText();
    return browser.getTitle();
  }

  getFilter() {
    return element(by.css('.networkswitchings-filter'));
  }

  getEmailField() {
    return element(by.css('.email'));
  }

  getPasswordField() {
    return element(by.css('.password'));
  }

  pressSubmitButton() {
    return element(by.css('button[type="submit"]')).click();
  }

  getUserEmail() {
    return element(by.css('.user-email'));
  }

  getLogOutButton() {
      return element(by.css('.log-out'));
  }
}
