import { BrowserWindow, Menu, Tray } from 'electron';
import * as path from 'path';

export class TrayBuilder {
  tray: Tray | null;
  mainWindow: BrowserWindow | null;

  constructor(mainWindow: BrowserWindow | null) {
    this.tray = null;
    this.mainWindow = mainWindow;
  }

  getWindowPosition = () => {
    if (this.mainWindow == null || this.tray == null) {
      return;
    }

    const windowBounds = this.mainWindow.getBounds();
    const { x, y, width, height } = this.tray.getBounds();
    const posX = Math.round(x + width / 2 - windowBounds.width / 2);
    const posY = Math.round(y + height);

    return { x: posX, y: posY };
  };

  showWindow = () => {
    const position = this.getWindowPosition();
    if (this.mainWindow == null || position == null) {
      return;
    }

    this.mainWindow.setPosition(position.x, position.y, false);
    this.mainWindow.show();
    this.mainWindow.setVisibleOnAllWorkspaces(true);
    this.mainWindow.focus();
    this.mainWindow.setVisibleOnAllWorkspaces(false);
  };

  toggleWindow = () => {
    if (this.mainWindow == null) {
      return;
    }
    return this.mainWindow.isVisible() ? this.mainWindow.hide() : this.showWindow();
  };

  onRightClick = () => {
    if (this.tray == null) {
      return;
    }
    const menu = [
      {
        role: 'quit',
        accelerator: 'Command+Q',
        label: 'Quit Routines Mini',
      },
    ];
    this.tray.popUpContextMenu(Menu.buildFromTemplate(menu as any));
  };

  build = () => {
    this.tray = new Tray(path.join(__dirname, './assets/icon.png'));
    this.tray.setIgnoreDoubleClickEvents(true);

    this.tray.on('click', this.toggleWindow);
    this.tray.on('right-click', this.onRightClick);
  };
}
