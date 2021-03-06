import {PortMatrixPage} from './app.po';

describe('port-matrix App', function() {
  let page: PortMatrixPage;

  beforeEach(() => {
    page = new PortMatrixPage();
  });

  it('should display correct browser title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('PortMatrix');
  });
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

    // Current implementation would work without moving to mobile as well:
    if (!page.getFirstNetworkswitch().isPresent()) {
      page.getMobileViewButton().click();
    }
  });

  afterEach(() => {
    page.getLogOutButton().click();
  });


  it('has networkswitchings', () => {
    expect(page.getFirstNetworkswitch().isPresent()).toBeTruthy();
  });


  it('has a save button', () => {
    page.getFirstNetworkswitch().click();
    expect(page.getSaveButton().isPresent()).toBeTruthy();
  });


  it('has a a networkswitch', () => {
    expect(page.getFirstNetworkswitch().isPresent).toBeTruthy();
  });
});
