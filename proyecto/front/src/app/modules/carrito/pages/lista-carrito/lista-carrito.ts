import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { of } from 'rxjs'; 
import { catchError } from 'rxjs/operators'; 
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { AuthService } from '../../../../core/auth.service';
import { CarritoItem } from '../../interfaces/carrito.interface';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-carrito',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ProgressSpinnerModule, 
    CardModule, 
    ButtonModule, 
    ImageModule, 
    TagModule,
    CurrencyPipe
  ],
  templateUrl: './lista-carrito.html',
  styleUrl: './lista-carrito.css'
})
export class ListaCarrito implements OnInit {
  
  // Servicios inyectados
  private carritoService = inject(CarritoService);
  private authService = inject(AuthService);
  
  private router = inject(Router);
  
  // Propiedades reactivas
  carritoItems: CarritoItem[] = [];
  
  private cdr = inject(ChangeDetectorRef);
  
  // Propiedades calculadas
  totalCarrito: number = 0;
  cantidadTotal: number = 0;

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    const userIdStr = this.authService.getUserId();
    if (!userIdStr) {
      this.carritoItems = [];
      this.calcularTotales();
      return;
    }
    
    const userId = parseInt(userIdStr, 10);

    // 1. Obtener el carrito completo (Observable<CarritoItem[]>)
    this.carritoService.obtenerCarrito(userId).pipe(
      catchError(err => {
        console.error('Error al cargar carrito:', err);
        this.carritoItems = [];
        this.totalCarrito = 0;
        this.cantidadTotal = 0;
        // ✅ SOLUCIÓN AL ERROR DE TIPADO: 
        // Se añade un cast al valor que devuelve 'of' para que TypeScript sepa 
        // que, en caso de error, sigue emitiendo el tipo esperado (CarritoItem[])
        return of([] as CarritoItem[]); 
      })
    )
    .subscribe({
      // El tipo 'itemsCompletos' ya no causará el error porque el tipo del Observable final es consistente.
      next: (itemsCompletos: CarritoItem[]) => { 
        this.carritoItems = itemsCompletos;
        
        this.calcularTotales();
        
        console.log('Items de Carrito con Videojuego:', this.carritoItems);
        this.cdr.detectChanges();
      },
      error: () => {
        // El error ya fue manejado en catchError
      }
    });
  }

  private calcularTotales(): void {
    let total = 0;
    let cantidad = 0;

    this.carritoItems.forEach(item => {
      // item.videojuego ahora es mandatorio si usas la interfaz actualizada
      if (item.videojuego && item.videojuego.precio && item.cantidad) {
        total += item.videojuego.precio * item.cantidad; 
        cantidad += item.cantidad;
      }
    });

    this.totalCarrito = total;
    this.cantidadTotal = cantidad;
  }
  
  seguirComprando(): void {
    this.router.navigate(['/videojuego/lista-videojuegos']);
  }

  comprar(): void {
    const userIdStr = this.authService.getUserId();
    console.log('Iniciando proceso de compra para el usuario ID:', userIdStr);

    if (!userIdStr) {
      console.error('Error: Usuario no autenticado para realizar la compra.');
      // Opcional: Redirigir al login si el ID no existe
      this.router.navigate(['/auth/login']); 
      return;
    }

    const userId = parseInt(userIdStr, 10);

    // 1. Llamar al servicio para realizar la compra
    this.carritoService.realizarCompra(userId)
      .pipe(
        catchError(err => {
          console.error('Error al procesar la compra:', err);
          // Opcional: Mostrar un mensaje de error al usuario
          alert('Hubo un error al procesar tu compra. Inténtalo de nuevo.');
          return of(null); // Emitir un valor nulo para completar el Observable sin error
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.id) {
            console.log('Compra realizada con éxito:', response);
            
            // 1. Limpiar el estado del carrito en el front-end
            this.carritoItems = [];
            this.calcularTotales();
            this.cdr.detectChanges(); 
            
            // 2. Navegar a la página de checkout, pasando el ID del pedido
            this.router.navigate(['/checkout', response.id]); // Redirección al nuevo componente
          }
        },
        error: (err) => {
          // Ya manejado en catchError, pero por si acaso.
          console.error('Suscripción terminada con error:', err);
        }
      });
  }


}