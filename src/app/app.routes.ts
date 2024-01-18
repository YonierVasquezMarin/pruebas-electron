import { Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';

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
        path: '**',
        redirectTo: 'pagina-principal',
    },
];
