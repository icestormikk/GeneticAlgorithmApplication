import {app, BrowserWindow} from 'electron';
import electronIsDev = require('electron-is-dev');
import * as path from 'path';
import installExtension, {REACT_DEVELOPER_TOOLS}
  from 'electron-devtools-installer';
import electronReload from 'electron-reload';

let win: BrowserWindow | null = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
      electronIsDev ?
          'http://localhost:3000/' :
          `file://${__dirname}/../index.html`,
  );
  win.on('closed', () => win = null);

  // Hot Reloading
  if (electronIsDev) {
    electronReload(__dirname, {
      electron: path.join(__dirname,
          '..',
          '..',
          'node_modules',
          '.bin',
          'electron',
      ),
      forceHardReset: true,
      hardResetMethod: 'exit',
    });
  }

  // Dev Tools
  installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added extension: ${name}`))
      .catch((error) => console.log(`Error occurred: ${error}`));

  if (electronIsDev) {
    win.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (win == null) {
    createWindow();
  }
});
