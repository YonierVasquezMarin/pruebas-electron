const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Pruebas de Electron",
        resizable: false,
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
