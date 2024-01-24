import { LocalFileUrlSafePipe } from './../../pipes/local-file-url-safe.pipe';
import { NgIf } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-visualizar-pdfs',
    standalone: true,
    imports: [NgIf, LocalFileUrlSafePipe],
    templateUrl: './visualizar-pdfs.component.html',
    styleUrl: './visualizar-pdfs.component.scss',
})
export class VisualizarPdfsComponent {
    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    rutaPdf!: string;

    abrirPdf() {
        window.ipcRenderer.send('open-file-dialog', {
            properties: ['openFile'],
            filters: [{ name: 'PDF', extensions: ['pdf'] }],
        });

        window.ipcRenderer.on('file-dialog-opened', (event: any, arg: string) => {
            this.rutaPdf = arg[0];
            this.changeDetectorRef.detectChanges();
        });
    }
}
