import { Routes } from '@angular/router';
import { ViewUser } from './pages/view-user/view-user';

export const usuarioRoutes: Routes = [

    {
        path: ':id', // ¡Cambiado de 'perfil/:id' a solo ':id'!
        component: ViewUser
    },
    {
        path: '**', // Este debe ir al final, o podría atrapar ':id' si lo pones primero
        redirectTo: ''
    }

];
