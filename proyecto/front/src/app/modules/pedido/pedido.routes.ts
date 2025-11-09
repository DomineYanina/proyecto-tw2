import { Routes } from '@angular/router';
import { ListaPedidos } from './pages/lista-pedidos/lista-pedidos';
import { DetallePedido } from './pages/detalle-pedido/detalle-pedido';
import { Checkout } from './pages/checkout/checkout';
export const pedidoRoutes: Routes = [
    {
        path: 'lista-pedidos',
        component: ListaPedidos
    },
    {
        path: 'detalle-pedido',
        component: DetallePedido
    },
    {
        path: 'checkout/:id',
        component: Checkout
    },
    {
        path: '**',
        redirectTo: ''
    }
];