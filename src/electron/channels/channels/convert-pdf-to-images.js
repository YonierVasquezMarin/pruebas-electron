const { ipcMain } = require("electron");
const pdfPoppler = require('pdf-poppler');

function channel(parameters) {
    ipcMain.on('convert-pdf-to-images', async (event, arg) => {
        let answer
        try {
            const pdfPath = arg.pdfPath
            const outputFolder = arg.outputFolder
            const options = {
                format: arg.format,
                out_dir: outputFolder,
                out_prefix: arg.outPrefix,
                page: null
            }
            await pdfPoppler.convert(pdfPath, options);
            answer = {ok: true, result: null}
            console.log('PDF converted to images successfully!');
        } catch (error) {
            answer = {ok: false, result: error}
            console.error(error);
        } finally {
            event.returnValue = answer;
        }
    });
}

module.exports = channel