const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const url = require("url");
const path = require("path");

let appWin;
let rootPath = path.join(__dirname, "../../");

createWindow = () => {
    appWin = new BrowserWindow({
        title: "Pruebas de Electron",
        resizable: true,
        icon: path.join(rootPath, "src/assets/platform-icons/background.png"),
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            preload: path.join(rootPath, "src/electron/preload.js")
        }
    });

    appWin.loadURL(url.format({
        pathname: path.join(rootPath, "dist/browser/index.html"),
        protocol: "file",
        slashes: true
    }));

    appWin.setMenu(null);

    appWin.maximize();

    ipcMain.on('abrir-pdf', (event, arg) => {
        dialog.showOpenDialog(appWin, {
            properties: ['openFile'],
            filters: [
                { name: 'PDF', extensions: ['pdf'] }
            ]
        }).then(result => {
            if (!result.canceled) {
                event.sender.send('abrir-pdf', result.filePaths[0]);
            }
        }).catch(err => {
            console.log(err);
        });
    });

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
});