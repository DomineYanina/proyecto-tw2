import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { of, throwError } from 'rxjs';
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
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  auth=inject(AuthService);

  private carritoService = inject(CarritoService);
  private authService = inject(AuthService);

  private router = inject(Router);


  carritoItems: CarritoItem[] = [];

  private cdr = inject(ChangeDetectorRef);


  totalCarrito: number = 0;
  cantidadTotal: number = 0;

  ngOnInit(): void {
    if(!this.auth.verificarSiHayUsuarioEnSession()){
      this.router.navigate(["usuario/login"]);
    }
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


    this.carritoService.obtenerCarrito(userId).pipe(
      catchError(err => {
        console.error('Error al cargar carrito:', err);
        this.carritoItems = [];
        this.totalCarrito = 0;
        this.cantidadTotal = 0;

        return of([] as CarritoItem[]);
      })
    )
    .subscribe({

      next: (itemsCompletos: CarritoItem[]) => {
        this.carritoItems = itemsCompletos;

        this.calcularTotales();

        console.log('Items de Carrito con Videojuego:', this.carritoItems);
        this.cdr.detectChanges();
      },
      error: () => {

      }
    });
  }

  private calcularTotales(): void {
    let total = 0;
    let cantidad = 0;

    this.carritoItems.forEach(item => {

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

      this.router.navigate(['/auth/login']);
      return;
    }

    const userId = parseInt(userIdStr, 10);


    this.carritoService.realizarCompra(userId)
      .pipe(
        catchError(err => {
          console.error('Error al procesar la compra:', err);

          alert('Hubo un error al procesar tu compra. Inténtalo de nuevo.');
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
            console.log('Compra realizada con éxito:', response);

            this.carritoItems = [];
            this.calcularTotales();
            this.cdr.detectChanges();


            this.router.navigate(['/pedido/lista-pedidos']);
            console.log('Navegando a la lista de pedidos después de la compra.');
        },
        error: (err) => {

          console.error('Suscripción terminada con error:', err);
        }
      });
  }

  quitarDelCarrito(itemId: number): Observable<any> {
    const userIdStr = this.authService.getUserId();

    if (!userIdStr) {
      console.error('Error: Usuario no autenticado para eliminar el ítem.');
      alert('Debes iniciar sesión para modificar el carrito.');
      return throwError(() => new Error("usuario no autenticado"));
    }

    const userId = parseInt(userIdStr, 10);

    return this.carritoService.eliminarItem(userId, itemId).pipe(
      tap(() => {
        this.cargarCarrito();
        console.log("videoJuegoEliminadoDelCarrito");
      }),
      catchError(err => {
        console.error("Error al eliminar videojuego:", err);
        alert('Hubo un error al eliminar el ítem. Inténtalo de nuevo.');
        return throwError(() => err);
      })
    );
  }

}
