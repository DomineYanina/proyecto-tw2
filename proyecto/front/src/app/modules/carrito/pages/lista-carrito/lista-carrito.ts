import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Observable, of, forkJoin } from 'rxjs'; // forkJoin necesario
import { catchError, map, switchMap } from 'rxjs/operators'; // tap no es estrictamente necesario aquí
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { AuthService } from '../../../../core/auth.service';
import { Carrito, CarritoItem } from '../../interfaces/carrito.interface';

// Importación del servicio de Videojuegos
import { VideojuegoService } from '../../../../api/services/videojuego/videojuego.service'; // Asegúrate que la ruta sea correcta
import { Videojuego } from '../../../videojuego/interfaces/videojuego.interface';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';

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
  private videojuegoService = inject(VideojuegoService); 

  // Propiedades reactivas
  carritoItems: CarritoItem[] = [];
  videojuegos: Videojuego[] = []; // <-- Propiedad para almacenar la lista de videojuegos
  
  private cdr = inject(ChangeDetectorRef);
  
  // Propiedades calculadas (para el resumen del total)
  totalCarrito: number = 0;
  cantidadTotal: number = 0;
  // Eliminamos 'isLoading'

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    const userIdStr = this.authService.getUserId();
    if (!userIdStr) {
      this.carritoItems = [];
      this.videojuegos = []; // Limpiar también la lista de juegos
      return;
    }
    
    const userId = parseInt(userIdStr, 10);

    // 1. Obtener el carrito inicial (Observable<Carrito>)
    this.carritoService.obtenerCarrito(userId).pipe(
      // switchMap espera la respuesta del carrito y luego ejecuta la siguiente lógica
      switchMap((carrito: Carrito) => {
        const items = carrito.items;
        
        if (items.length === 0) {
          this.carritoItems = [];
          this.videojuegos = []; // Limpiar también si el carrito está vacío
          this.calcularTotales();
          return of([]); // Retorna inmediatamente un array vacío si no hay items
        }

        // Creamos un arreglo de Observables, donde cada observable obtiene el Videojuego
        const itemObservables = items.map(item => 
          this.videojuegoService.getVideojuegoById(item.videojuego_id).pipe(
            // Combina el Videojuego con el CarritoItem original
            map(videojuego => ({ ...item, videojuego })) 
          )
        );

        // forkJoin espera a que todos los observables individuales de items se completen
        return forkJoin(itemObservables);
      }),
      // Manejar errores
      catchError(err => {
        console.error('Error al cargar carrito o videojuegos:', err);
        this.carritoItems = [];
        this.videojuegos = [];
        this.totalCarrito = 0;
        this.cantidadTotal = 0;
        return of([]); // Retorna un array vacío para completar la suscripción sin error
      })
    )
    .subscribe({
      next: (itemsCompletos: CarritoItem[]) => {
        // 2. Asignamos la lista completa de ítems con sus videojuegos adjuntos
        this.carritoItems = itemsCompletos;
        
        // 3. NUEVA LÓGICA: Extraemos la lista de Videojuegos de los ítems completos
        this.videojuegos = itemsCompletos
          .map(item => item.videojuego)
          // Filtramos cualquier posible nulo o undefined (aunque no debería ocurrir)
          .filter((v): v is Videojuego => !!v);

        this.calcularTotales(); // Llamamos a calcular totales

        console.log('Items de Carrito con Videojuego:', this.carritoItems);
        this.cdr.detectChanges();
      },
      error: () => {
        // El error ya fue manejado en catchError
      }
    });
  }

  // Descomentado y actualizado para usar this.carritoItems
  private calcularTotales(): void {
    let total = 0;
    let cantidad = 0;

    this.carritoItems.forEach(item => {
      // Usamos el campo opcional 'videojuego' que debe estar poblado ahora
      if (item.videojuego?.precio && item.cantidad) {
        total += item.videojuego.precio * item.cantidad; 
        cantidad += item.cantidad;
      }
    });

    this.totalCarrito = total;
    this.cantidadTotal = cantidad;
  }
}