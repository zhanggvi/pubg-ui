if (process.env.NODE_ENV) {
  const openWebPage = (url: string) => window.open(url, '_blank');
  const openUrlCommand = (type: string) => (url: string) => {
    // tslint:disable-next-line:no-console
    console.log(`OPEN URL (${type}):`, url);
    openWebPage(url);
  }

  window.engine.mock('ShowWebPageOnPlatform', openUrlCommand('Platform'));
  window.engine.mock('OpenExternalBrowser', openUrlCommand('External'));
}
