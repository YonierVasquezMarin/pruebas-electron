import { Component } from '@angular/core';
import { dialog } from 'electron';

@Component({
    selector: 'app-visualizar-pdfs',
    standalone: true,
    imports: [],
    templateUrl: './visualizar-pdfs.component.html',
    styleUrl: './visualizar-pdfs.component.scss',
})
export class VisualizarPdfsComponent {
    abrirPdfs() {
        dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'PDFs', extensions: ['pdf'] }],
        });
    }
}
