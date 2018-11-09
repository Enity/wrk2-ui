import { app, BrowserWindow } from 'electron';
import { BenchmarksService } from './services/benchmarksService';

let mainWindow;
/**
 * @static
*/
export class Main {
    static main() {
        this._initElectronListeners();
        new BenchmarksService().initListeners();
    }

    static _createWindow() {
        const winURL =
            process.env.NODE_ENV === 'development'
                ? `http://localhost:9080`
                : `file://${__dirname}/index.html`;
        mainWindow = new BrowserWindow({
            height: 500,
            useContentSize: true,
            width: 1000
        });

        mainWindow.loadURL(winURL);
        mainWindow.setMenu(null);

        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }

    static _initElectronListeners() {
        app.on('ready', this._createWindow);

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', () => {
            if (mainWindow === null) {
                this.createWindow();
            }
        });
    }
}
