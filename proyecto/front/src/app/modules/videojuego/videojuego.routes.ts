import { Routes } from '@angular/router';
import { DetalleVideojuego } from './pages/detalle-videojuego/detalle-videojuego';
import { ListaVideojuegos } from './pages/lista-videojuegos/lista-videojuegos';

export const videojuegoRoutes: Routes = [
    {
        path: 'detalle-videojuego/:id',
        component: DetalleVideojuego
    },
    {
        path: 'lista-videojuegos',
        component: ListaVideojuegos
    },
    {
        path: '**',
        redirectTo: ''
    }
];