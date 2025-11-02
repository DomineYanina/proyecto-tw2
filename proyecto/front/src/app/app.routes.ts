import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'pedido',
        loadChildren: () => import('./modules/pedido/pedido.routes').then(p => p.pedidoRoutes)
    },
    {
        path: 'videojuego',
        loadChildren: () => import('./modules/videojuego/videojuego.routes').then(v => v.videojuegoRoutes)
    },
    {
        path: 'usuario',
        //loadChildren: () => import('./modules/usuario/usuario.routes').then(u => u.usuarioRoutes)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
