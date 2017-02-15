import { PortMatrixPage } from './app.po';
import {protractor} from "protractor";

describe('port-matrix App', function() {
  let page: PortMatrixPage;

  beforeEach(() => {
    page = new PortMatrixPage();
  });

  it('should display correct browser title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('PortMatrix');
  });

  it('should login', () => {
    let email = 'a@a.a';
    page.navigateTo();
    page.getEmailField().sendKeys(email);
    page.getPasswordField().sendKeys('a');
    page.pressSubmitButton();
    expect(page.getUserEmail().getText()).toEqual("User: " + email);
  });

/*  it('should display search', () => {
    page.navigateTo();
    expect(page.getFilter().isPresent()).toBeTruthy();
  });*/
});
