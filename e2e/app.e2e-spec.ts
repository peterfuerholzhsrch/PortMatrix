import { PortMatrixPage } from './app.po';

describe('port-matrix App', function() {
  let page: PortMatrixPage;

  beforeEach(() => {
    page = new PortMatrixPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
