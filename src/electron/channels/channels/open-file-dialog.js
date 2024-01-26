const { ipcMain, dialog } = require("electron");

function channel(parameters) {
    ipcMain.on('open-file-dialog', async (event, arg) => {
        try {
            const result = await dialog.showOpenDialog(parameters.appWindow, arg)
            let answer = {}
            if (result.canceled) {
                answer = {ok: false, result: null}
            } else {
                answer = {ok: true, result: result.filePaths}
            }
            event.sender.send('file-dialog-opened', answer);
        } catch (error) {
            console.log(error);
        }
    });
}

module.exports = channel