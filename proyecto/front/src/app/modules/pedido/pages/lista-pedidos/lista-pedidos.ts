import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { PedidoService } from '../../../../api/services/pedido/pedido.service';
import { ToastModule } from 'primeng/toast';
import { Pedido } from '../../interfaces/pedido.interface';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { DatePipe, CommonModule, CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth.service';
import { TagModule } from 'primeng/tag';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    CardModule,
    ButtonModule,
    DatePipe,
    CurrencyPipe,
    ToastModule,
    TagModule,
    RippleModule
  ],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css',
})
export class ListaPedidos implements OnInit, OnDestroy {
  auth=inject(AuthService);

  pedidos: Pedido[] = [];
  
  expandedRows: { [key: number]: boolean } = {};

  pedidoService = inject(PedidoService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit(): void {
    if(!this.auth.verificarSiHayUsuarioEnSession()){
      this.router.navigate(["usuario/login"]);
    }
    this.listarPedidos();
  }

  ngOnDestroy(): void {
    
  }

  listarPedidos(): void {
    const userIdStr = this.authService.getUserId();

    if (!userIdStr) {
      this.pedidos = [];
      return;
    }

    const userId = parseInt(userIdStr, 10);
    console.log('Cargando pedidos para el usuario ID:', userId);

    this.pedidoService.getPedidosUsuario(userId).subscribe({
      next: (pedidos: Pedido[]) => {
        this.pedidos = pedidos;
        console.log('Cantidad de videojuegos recibidos:', pedidos[0].videojuegos?.length);
        this.cdr.detectChanges();
        console.log('Pedidos cargados:', pedidos);
      },
      error: (err) => {
        console.error('Error al cargar los pedidos:', err);
        this.pedidos = [];
      },
      complete: () => {
        
      }
    })
  }
  
  onRowExpand(event: TableRowExpandEvent) {
  }

  onRowCollapse(event: TableRowCollapseEvent) {
  }

  expandAll() {
    this.expandedRows = {};
    this.pedidos.forEach(pedido => (this.expandedRows[pedido.id] = true));
    this.cdr.detectChanges();
  }

  collapseAll() {
    this.expandedRows = {};
    this.cdr.detectChanges();
  }

  
  getStatusSeverity(estado: string): string {
    switch (estado.toLowerCase()) {
        case 'completado':
            return 'success';
        case 'pendiente':
            return 'warning';
        case 'cancelado':
            return 'danger';
        default:
            return 'info';
    }
  }

}
