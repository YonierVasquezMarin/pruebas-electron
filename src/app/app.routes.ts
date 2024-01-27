import { Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { VisualizarPdfsComponent } from './components/visualizar-pdfs/visualizar-pdfs.component';
import { ConvertPdfToImagesComponent } from './components/convert-pdf-to-images/convert-pdf-to-images.component';

export const routes: Routes = [
    {
        path: '',
        component: PaginaPrincipalComponent,
    },
    {
        path: 'pagina-principal',
        component: PaginaPrincipalComponent,
    },
    {
        path: 'visualizar-pdfs',
        component: VisualizarPdfsComponent,
    },
    {
        path: 'convert-pdf-to-images',
        component: ConvertPdfToImagesComponent,
    },
    {
        path: '**',
        redirectTo: 'pagina-principal',
    },
];
