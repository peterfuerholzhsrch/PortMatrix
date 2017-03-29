import { browser, element, by } from 'protractor';

export class PortMatrixPage {
  navigateTo() {
    return browser.get('/user');
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
    return element(by.css('.login-button')).click();
  }

  getUserEmail() {
    return element(by.css('.user-email'));
  }

  getLogOutButton() {
      return element(by.css('.log-out'));
  }

  getNetworkswitchingsHeader() {
    return element(by.css('networkswitchings-header'));
  }

  getFirstNetworkswitch() {
    return element(by.css('[class $= "_system"]:first-child'));
  }

  getSaveButton() {
    return element(by.css('.btn-success'));
  }

  getMobileViewButton() {
    return element(by.css('.mobile-view-button'));
  }
}
