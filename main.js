const {app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
let args = require('yargs');
const config = require(path.join(__dirname, 'config'));

const logger = require('electron-log');


require('dotenv').config();

// require('electron-reload')(__dirname);

let win = null;

app.on('ready', () => {
  logger.transports.console.level = 'verbose';
  logger.transports.rendererConsole.level = 'debug';

  win = new BrowserWindow({width: 1200, height: 800, frame: false});

  // if (process.env.PACKAGE === 'true') {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  // } else {
  //   win.loadURL(process.env.HOST);
    win.webContents.openDevTools();
  // }

  win.on('closed', function() {
    win = null;
    // background = null;
  });
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
