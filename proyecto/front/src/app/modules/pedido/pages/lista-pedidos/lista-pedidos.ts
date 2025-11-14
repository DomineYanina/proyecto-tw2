import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { PedidoService } from '../../../../api/services/pedido/pedido.service';
import { ToastModule } from 'primeng/toast';
import { Pedido } from '../../interfaces/pedido.interface';
// No necesitas importar Videojuego aquí si solo lo usas dentro de PedidoVideojuego
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table'; // Importa los tipos de eventos
import { DatePipe, CommonModule, CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth.service';
import { TagModule } from 'primeng/tag'; // Se recomienda importar este módulo para p-tag
import { RippleModule } from 'primeng/ripple'; // Se recomienda importar este módulo para pRipple

@Component({
  selector: 'app-lista-pedidos',
  // Asegúrate de que todos los módulos de PrimeNG usados en el HTML estén aquí
  standalone: true, // Si es un componente standalone
  imports: [
    TableModule, 
    CommonModule, 
    CardModule, 
    ButtonModule, 
    DatePipe, 
    CurrencyPipe, 
    ToastModule, 
    TagModule, 
    RippleModule // Añadido para pRipple
  ],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css',
})
export class ListaPedidos implements OnInit, OnDestroy {

  pedidos: Pedido[] = [];
  // 🎯 Objeto para rastrear las filas expandidas por su ID.
  expandedRows: { [key: number]: boolean } = {}; 
  
  // Inyecciones de dependencias
  pedidoService = inject(PedidoService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef); // Necesario para expandAll/collapseAll
  private router = inject(Router);

  ngOnInit(): void {
    this.listarPedidos();
  }

  ngOnDestroy(): void {
    // Lógica de limpieza al destruir el componente
  }

  /**
   * Obtiene la lista de pedidos del usuario actual.
   */
  listarPedidos(): void {
    const userIdStr = this.authService.getUserId();

    if (!userIdStr) {
      this.pedidos = [];
      // Opcional: Mostrar mensaje al usuario de que debe iniciar sesión
      return;
    }

    const userId = parseInt(userIdStr, 10);
    console.log('Cargando pedidos para el usuario ID:', userId);

    this.pedidoService.getPedidosUsuario(userId).subscribe({
      next: (pedidos: Pedido[]) => {
        this.pedidos = pedidos;
        this.cdr.detectChanges();
        console.log('Pedidos cargados:', pedidos);
      },
      error: (err) => {
        console.error('Error al cargar los pedidos:', err);
        this.pedidos = [];
        // Opcional: Mostrar un mensaje de error usando p-toast
      },
      complete: () => {
        // Lógica de finalización
      }
    })
  }
  
  /**
   * Maneja el evento cuando una fila de pedido se expande.
   * @param event El evento de expansión de fila.
   */
  onRowExpand(event: TableRowExpandEvent) {
    // Si necesitas cargar detalles adicionales de los videojuegos que no vienen 
    // en la carga inicial del pedido, este es el lugar para hacerlo.
    // console.log('Fila expandida:', event.data.id);
  }

  /**
   * Maneja el evento cuando una fila de pedido se colapsa.
   * @param event El evento de colapso de fila.
   */
  onRowCollapse(event: TableRowCollapseEvent) {
    // console.log('Fila colapsada:', event.data.id);
  }

  /**
   * Expande todas las filas.
   */
  expandAll() {
    this.expandedRows = {}; // Limpia el objeto
    this.pedidos.forEach(pedido => (this.expandedRows[pedido.id] = true));
    // Forzar la detección de cambios para actualizar la vista inmediatamente
    this.cdr.detectChanges(); 
  }

  /**
   * Colapsa todas las filas.
   */
  collapseAll() {
    this.expandedRows = {}; // Limpia el objeto
    // Forzar la detección de cambios
    this.cdr.detectChanges(); 
  }

  /**
   * Devuelve la severidad (color) de la etiqueta PrimeNG basado en el estado del pedido.
   * @param estado El estado del pedido ('pendiente', 'completado', 'cancelado').
   * @returns La severidad correspondiente ('warning', 'success', 'danger').
   */
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