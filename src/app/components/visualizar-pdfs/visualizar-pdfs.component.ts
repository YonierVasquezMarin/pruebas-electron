import { LocalFileUrlSafePipe } from './../../pipes/local-file-url-safe.pipe'
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
        window.ipcRenderer.send('abrir-pdf');
        window.ipcMain.on('abrir-pdf', (event: any, arg: string) => {
            this.rutaPdf = arg;
            this.changeDetectorRef.detectChanges();
        });
    }
}
