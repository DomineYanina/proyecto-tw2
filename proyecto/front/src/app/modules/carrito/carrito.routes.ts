import { Routes } from '@angular/router';
import { ListaCarrito } from './pages/lista-carrito/lista-carrito';
export const carritoRoutes: Routes = [
    {
        path: 'carrito',
        component: ListaCarrito
    },
    {
        path: '**',
        redirectTo: ''
    }
];

