import { Routes } from '@angular/router';
import { ViewUser } from './pages/view-user/view-user';
import { CreateUser } from './pages/create-user/create-user';
import { LoginUserComponent } from './pages/login-user/login-user.component';

export const usuarioRoutes: Routes = [

    {
        path: 'verUsuario', // ¡Cambiado de 'perfil/:id' a solo ':id'!
        component: ViewUser
    },
    {
      path: 'registro',
      component:CreateUser
    },
    // {
    //     path: '**', // Este debe ir al final, o podría atrapar ':id' si lo pones primero
    //     redirectTo: ''
    // },
    {
      path: 'login',
      component: LoginUserComponent
    },
    // {
    //   path: ':id',
    //   component: ViewUser
    // },
    {
      path: '**',
      redirectTo: 'login' // 👈 opcional: redirige a login si la ruta no existe
    }
];
