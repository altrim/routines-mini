import { app, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';
import { TrayBuilder } from './TrayBuilder';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#1a3d53',
    width: 440,
    height: 730,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
      backgroundThrottling: false,
    },
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${__dirname}/../index.html`);
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
};

let Tray = null;
app.whenReady().then(() => {
  createWindow();
  Tray = new TrayBuilder(mainWindow);
  Tray.build();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
