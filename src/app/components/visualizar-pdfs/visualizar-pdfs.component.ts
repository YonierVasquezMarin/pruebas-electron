import { Component } from '@angular/core';

@Component({
    selector: 'app-visualizar-pdfs',
    standalone: true,
    imports: [],
    templateUrl: './visualizar-pdfs.component.html',
    styleUrl: './visualizar-pdfs.component.scss',
})
export class VisualizarPdfsComponent {
    constructor() {}

    async abrirPdf() {
        window.ipcRenderer.send('abrir-pdf');
        window.ipcMain.on('abrir-pdf', (event: any, arg: any) => {
            console.log(arg);
        });
    }
}
