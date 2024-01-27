import { OpenFileDialogService } from './../../shared/services/open-file-dialog.service';
import { Component } from '@angular/core';
import { ConvertPdfToImagesService } from '../../shared/services/convert-pdf-to-images.service';

@Component({
    selector: 'app-convert-pdf-to-images',
    standalone: true,
    imports: [],
    templateUrl: './convert-pdf-to-images.component.html',
    styleUrl: './convert-pdf-to-images.component.scss',
})
export class ConvertPdfToImagesComponent {
    constructor(
        private convertPdfToImagesService: ConvertPdfToImagesService,
        private openFileDialogService: OpenFileDialogService
    ) {}

    async convertPDFtoImages() {
        const dialogResult = await this.openFileDialogService.openFileDialog({
            title: 'Select PDF file',
            filters: [
                {
                    name: 'PDF Files',
                    extensions: ['pdf'],
                },
            ],
        })
        if (!dialogResult.ok) {
            return;
        }
        const params = {
            pdfPath: dialogResult.result[0],
            outputFolder: 'C:\\test\\',
            format: 'png',
            outPrefix: 'page_',
        };
        await this.convertPdfToImagesService.convertPdfToImages(params);
    }
}
