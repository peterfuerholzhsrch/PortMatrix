import { PortMatrixPage } from './app.po';

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
    expect(page.getNetworkswitchingsHeader().isPresent()).toBeTruthy();
  });

  /*  it('should display search', () => {
   page.navigateTo();
   expect(page.getFilter().isPresent()).toBeTruthy();
   });*/
});

describe('App actions', function() {
  let page: PortMatrixPage;

  beforeEach(() => {
    page = new PortMatrixPage();
    let email = 'a@a.a';
    page.navigateTo();
    page.getEmailField().sendKeys(email);
    page.getPasswordField().sendKeys('a');
    page.pressSubmitButton();
  });

  it('has networkswitchings', () => {
    expect(page.getFirstNetworkswitch().isPresent()).toBeTruthy();
  });

  it('can open networkswitching', () => {
    page.getFirstNetworkswitch().click();
    expect(page.getSaveButton().isPresent()).toBeTruthy();
  });
});
