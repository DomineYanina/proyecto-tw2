import { Routes } from '@angular/router';
import { ViewUser } from './modules/usuario/pages/view-user/view-user';

export const routes: Routes = [
    {
        path: 'pedido',
        loadChildren: () => import('./modules/pedido/pedido.routes').then(p => p.pedidoRoutes)
    },
    {
        path: 'perfil',
        loadChildren: () => import('./modules/usuario/usuario.routes').then(pr => pr.usuarioRoutes)
    },
    {
        path: 'videojuego',
        loadChildren: () => import('./modules/videojuego/videojuego.routes').then(v => v.videojuegoRoutes)
    },
    {
        path: 'carrito',
        loadChildren: () => import('./modules/carrito/carrito.routes').then(c => c.carritoRoutes)
    },
    {
        path: 'usuario',
        loadChildren: () => import('./modules/usuario/usuario.routes').then(u => u.usuarioRoutes)
    },
    {
        path: '**',
        redirectTo: 'usuario/login' // Redirige a login si la ruta no existe
    }
];
