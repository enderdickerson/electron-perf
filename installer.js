const electronInstaller = require('electron-winstaller');

const resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: 'builds/UrlPerf-win32-x64',
  outputDirectory: 'releases/installer64',
  authors: 'Andrew Dickerson',
  exe: 'urlperf.exe'
});

resultPromise.then(() => console.log('It worked!'), (e) => console.log(`No dice: ${e.message}`));
