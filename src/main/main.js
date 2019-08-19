import { app, BrowserWindow, Menu } from 'electron';
import { BenchmarksService } from './services/benchmarksService';

let mainWindow;
/**
 * @static
*/
export class Main {
    static main() {
        Main._initElectronListeners();
        new BenchmarksService().initListeners();
    }

    static _createWindow() {
        const winURL =
            process.env.NODE_ENV === 'development'
                ? `http://localhost:9080`
                : `file://${__dirname}/index.html`;
        mainWindow = new BrowserWindow({
            height: 550,
            useContentSize: true,
            width: 900
        });

        mainWindow.loadURL(winURL);
        mainWindow.setMenu(Main._getMenu());

        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }

    static _getMenu() {
        const template = [
            {
                label: 'Wrk2 Ui',
                submenu: [
                    { label: 'About', selector: 'orderFrontStandardAboutPanel:' },
                    { type: 'separator' },
                    // eslint-disable-next-line standard/object-curly-even-spacing
                    { label: 'Quit', accelerator: 'Command+Q', click() { app.quit(); }}
                ]
            },
            {
                label: 'Edit',
                submenu: [
                    { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
                    { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
                    { type: 'separator' },
                    { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
                    { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
                    { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
                    { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
                ]
            }
        ];

        return Menu.buildFromTemplate(template);
    }

    static _initElectronListeners() {
        app.on('ready', Main._createWindow);

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', () => {
            if (mainWindow === null) {
                Main._createWindow();
            }
        });
    }
}
