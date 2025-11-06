import { Routes } from '@angular/router';
import { Carrito } from './pages/carrito/carrito';
export const carritoRoutes: Routes = [
    {
        path: 'carrito',
        component: Carrito
    },
    {
        path: '**',
        redirectTo: ''
    }
];