import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CompraService } from '../../../../api/services/compra/compra.service';
import { Pedido } from '../../interfaces/pedido.interface';
import { Videojuego } from '../../../videojuego/interfaces/videojuego.interface';
import { TableModule } from 'primeng/table';
import { DatePipe, CommonModule, CurrencyPipe  } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth.service';

@Component({
  selector: 'app-lista-pedidos',
  imports: [TableModule, CommonModule, CardModule, ButtonModule, DatePipe, CurrencyPipe],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css',
})
export class ListaPedidos implements OnInit, OnDestroy {

pedidos: Pedido[] = [];
videojuegos: Videojuego[] = [];
  compraService = inject(CompraService);
    private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit(): void {
    this.listarPedidos();
  }

  ngOnDestroy(): void {
    // Código a ejecutar al destruir el componente
  }

  listarPedidos(): void {
    const userIdStr = this.authService.getUserId();

        if (!userIdStr) {
            this.pedidos= [];
            return;
        }

        const userId = parseInt(userIdStr, 10);

        this.compraService.getPedidosUsuario(userId).subscribe({
            next: (pedidos: Pedido[]) => {
                // Actualiza la señal de pedidos con la data recibida
                this.pedidos = pedidos;
                console.log('Pedidos cargados:', pedidos);
            },
            error: (err) => {
                console.error('Error al cargar los pedidos:', err);
                this.pedidos= []; // En caso de error, limpia la lista
            },
            complete: () => {
                // Lógica de finalización
            }
      })
    }

}
