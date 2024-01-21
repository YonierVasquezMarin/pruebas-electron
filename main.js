const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const url = require("url");
const path = require("path");

let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 1300,
        height: 800,
        title: "Pruebas de Electron",
        resizable: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    appWin.loadURL(url.format({
        pathname: path.join(__dirname, "dist/browser/index.html"),
        protocol: "file",
        slashes: true
    }));

    appWin.setMenu(null);

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
