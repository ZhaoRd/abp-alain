import { AbpAlainTemplatePage } from './app.po';

describe('AbpAlain App', function() {
  let page: AbpAlainTemplatePage;

  beforeEach(() => {
    page = new AbpAlainTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
