import { ElectronPerfPage } from './app.po';

describe('electron-perf App', () => {
  let page: ElectronPerfPage;

  beforeEach(() => {
    page = new ElectronPerfPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
