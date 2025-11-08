import { Routes } from '@angular/router';
import { ViewUser } from './pages/view-user/view-user';
import { LoginUserComponent } from './pages/login-user/login-user.component';

export const usuarioRoutes: Routes = [
  {
    path: 'login',
    component: LoginUserComponent
  },
  {
    path: ':id',
    component: ViewUser
  },
  {
    path: '**',
    redirectTo: 'login' // 👈 opcional: redirige a login si la ruta no existe
  }
];
