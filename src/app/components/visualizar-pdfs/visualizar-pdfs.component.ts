import { LocalFileUrlSafePipe } from './../../pipes/local-file-url-safe.pipe';
import { NgIf } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { OpenFileDialogService } from '../../shared/services/open-file-dialog.service';

@Component({
    selector: 'app-visualizar-pdfs',
    standalone: true,
    imports: [NgIf, LocalFileUrlSafePipe],
    templateUrl: './visualizar-pdfs.component.html',
    styleUrl: './visualizar-pdfs.component.scss',
})
export class VisualizarPdfsComponent {
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private openFileDialogService: OpenFileDialogService
    ) {}

    rutaPdf!: string;

    async abrirPdf() {
        try {
            const filesSelected =
                await this.openFileDialogService.openFileDialog({
                    properties: ['openFile'],
                    filters: [{ name: 'PDF', extensions: ['pdf'] }],
                });
            this.rutaPdf = filesSelected.result[0];
        } catch (error) {
            console.log(error);
        }
    }
}
