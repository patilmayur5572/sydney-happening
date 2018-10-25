import { SydneyHappeningAppPage } from './app.po';

describe('sydney-happening-app App', function() {
  let page: SydneyHappeningAppPage;

  beforeEach(() => {
    page = new SydneyHappeningAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
