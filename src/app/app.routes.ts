import { Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { VisualizarPdfsComponent } from './visualizar-pdfs/visualizar-pdfs.component';

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
        path: '**',
        redirectTo: 'pagina-principal',
    },
];
