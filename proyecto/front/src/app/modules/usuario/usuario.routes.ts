import { Routes } from '@angular/router';
import { ViewUser } from './pages/view-user/view-user';
import { CreateUser } from './pages/create-user/create-user';

export const usuarioRoutes: Routes = [

    {
        path: 'verUsuario/:id', // ¡Cambiado de 'perfil/:id' a solo ':id'!
        component: ViewUser
    },
    {
      path: 'registro',
      component:CreateUser
    },
    {
        path: '**', // Este debe ir al final, o podría atrapar ':id' si lo pones primero
        redirectTo: ''
    }

];
