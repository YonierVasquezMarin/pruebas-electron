const { ipcMain, dialog } = require("electron");

class ChannelParameters {
    appWindow
}

class ChannelActivator {
    #parameters

    /**
     * @param {ChannelParameters} parameters 
     */
    constructor(parameters) {
        this.#parameters = parameters
    }

    activateChannels() {
        this.#activateOpenFileDialog()
    }

    #activateOpenFileDialog() {
        ipcMain.on('open-file-dialog', async (event, arg) => {
            try {
                const result = await dialog.showOpenDialog(this.#parameters.appWindow, arg)
                if (!result.canceled) {
                    event.sender.send('file-dialog-opened', result.filePaths);
                }
            } catch (error) {
                console.log(error);
            }
        });
    }
}

module.exports = ChannelActivator