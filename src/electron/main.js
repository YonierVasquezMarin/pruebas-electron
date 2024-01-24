const { BrowserWindow, app } = require("electron");
const url = require("url");
const path = require("path");
const ChannelActivator = require("./channel-activator/channel-activator")

class Main {
    #appWindow
    #rootPath = path.join(__dirname, "../../");

    constructor() {
        this.#activateSystemActions()
        this.#activateChannels()
    }

    #activateSystemActions() {
        app.on("ready", () => this.#createAppWindow());
        app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                app.quit()
            }
        });
    }

    #createAppWindow() {
        this.#createAppWindowInstance();
        this.#setAppMainPage();
        this.#setAdditionalConfig();
        this.#appWindow.on("closed", () => this.#closed());
    }

    #createAppWindowInstance() {
        this.#appWindow = new BrowserWindow({
            title: "Pruebas de Electron",
            resizable: true,
            icon: path.join(this.#rootPath, "src/assets/platform-icons/background.png"),
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true,
                preload: path.join(this.#rootPath, "src/electron/preload.js")
            }
        });
    }
    
    #setAppMainPage() {
        this.#appWindow.loadURL(url.format({
            pathname: path.join(this.#rootPath, "dist/browser/index.html"),
            protocol: "file",
            slashes: true
        }));
    }

    #setAdditionalConfig() {
        this.#appWindow.setMenu(null);
        this.#appWindow.maximize();
        this.#appWindow.webContents.openDevTools();
    }

    #closed() {
        this.#appWindow = null;
    }

    #activateChannels() {
        new ChannelActivator({
            appWindow: this.#appWindow
        }).activateChannels()
    }
}

new Main()