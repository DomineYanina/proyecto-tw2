import { Routes } from '@angular/router';
import { ViewUser } from './pages/view-user/view-user';
import { CreateUser } from './pages/create-user/create-user';
import { LoginUserComponent } from './pages/login-user/login-user.component';
import { UpdateUser } from './pages/update-user/update-user';

export const usuarioRoutes: Routes = [

    {
        path: 'verUsuario',
        component: ViewUser
    },
    {
      path: 'actualizar',
      component: UpdateUser
    },
    {
      path: 'registro',
      component:CreateUser
    },
    {
      path: 'login',
      component: LoginUserComponent
    },
    {
      path: '**',
      redirectTo: 'login'
    }
];
