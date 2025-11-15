import { Component, inject, OnDestroy, OnInit, ElementRef, ViewChild, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, filter } from 'rxjs/operators'; // ⬅️ Añadido tap y filter
import { of } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { Desarrollador, RequisitosPC, Videojuego } from '../../interfaces/videojuego.interface';
import { VideojuegoService } from '../../../../api/services/videojuego/videojuego.service';
import { ImageModule } from 'primeng/image';
import { DatePipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/auth.service';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { MessageService } from 'primeng/api';


import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-detalle-videojuego',
  standalone: true,
  imports: [DividerModule, ImageModule, DatePipe, CommonModule, CurrencyPipe, ButtonModule, ProgressSpinnerModule],
  templateUrl: './detalle-videojuego.html',
  styleUrl: './detalle-videojuego.css'
})
export class DetalleVideojuego implements OnInit, OnDestroy {
  spinner=signal<boolean>(false);

  mensajeDeError=signal<string>("");

  videojuegoId: number = 0;
  desarrolladorId: number = 0;
  videojuegoExtra: Videojuego | null = null;
  desarrollador: Desarrollador | null = null;
  videojuego: Videojuego | null = null;
  requisitos: RequisitosPC | null = null;
  videojuegoService = inject(VideojuegoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  carritoService = inject(CarritoService);
  private messageService = inject(MessageService);


  @ViewChild('audioFx') audioPlayerRef!: ElementRef<HTMLAudioElement>;
tarjetaMediosActiva: boolean = false;
tarjetaInfoActiva: boolean = false;
otraTarjetaInactiva: boolean = false;

toggleTarjeta(tipo: 'medios' | 'info') {
    if (!this.tarjetaMediosActiva && !this.tarjetaInfoActiva) {
        this.playFuturisticSound();
    }

    if (tipo === 'medios') {
        this.tarjetaMediosActiva = !this.tarjetaMediosActiva;
        this.tarjetaInfoActiva = false;
    } else {
        this.tarjetaInfoActiva = !this.tarjetaInfoActiva;
        this.tarjetaMediosActiva = false;
    }

    this.otraTarjetaInactiva = this.tarjetaMediosActiva || this.tarjetaInfoActiva;
  }

  playFuturisticSound() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
        const audio = this.audioPlayerRef.nativeElement;
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.warn('Error al reproducir el audio:', error);
        });
    }
  }

  ngOnInit(): void {
    this.mensajeDeError.set("");
     this.spinner.set(false);
    this.cargarDatosDesdeRuta();
    this.obtenerRequisitosPC();
  }

  ngOnDestroy(): void {
  }


  cargarDatosDesdeRuta(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = +params['id'];
        if (id && !isNaN(id)) {
          this.videojuegoId = id;
          return this.videojuegoService.getVideojuegoById(id);
        }
        return of(null);
      }),
      filter((videojuego): videojuego is Videojuego => !!videojuego),
      tap(videojuego => {
        this.videojuego = videojuego;
        this.desarrolladorId = videojuego.id_desarrollador || 0;
        console.log('Videojuego obtenido:', this.videojuego);
      }),

      switchMap(videojuego => {
        if (videojuego.id_desarrollador) {

          return this.videojuegoService.getDesarrolladorByVideojuegoId(videojuego.id_desarrollador);
        }
        return of(null);
      })
    ).subscribe({
      next: (desarrollador) => {
        this.desarrollador = desarrollador;
        console.log('Desarrollador obtenido:', this.desarrollador);

        setTimeout(() => {
            this.spinner.set(true);
        }, 500);

      },
      error: (error) => {
        console.error('Error al obtener el videojuego o el desarrollador:', error);
      }
    });
  }

  obtenerRequisitosPC(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = +params['id'];
        if (id && !isNaN(id)) {

          return this.videojuegoService.getRequisitosPCByVideojuegoId(id);
        }
        return of(null);
      }
    )
    ).subscribe({
      next: (requisitos) => {
        this.requisitos = requisitos;
        console.log('Requisitos de PC obtenidos:', this.requisitos);
      },
      error: (error) => {
        console.error('Error al obtener los requisitos de PC:', error);
      }
    });
  }

  agregarACarrito(videojuego_id: number | undefined): void {
    const userIdStr = this.authService.getUserId();
    const videojuegoId = videojuego_id;

    if (!userIdStr) {
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Debe iniciar sesión para agregar ítems al carrito.'});
      return;
    }

    if (!videojuegoId) {
       this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo identificar el videojuego.'});
       return;
    }

    const userId = parseInt(userIdStr, 10);

    this.carritoService.agregarItem(userId, videojuegoId, 1)
      .subscribe({
        next: (response) => {
          console.log('Videojuego añadido al carrito:', response);
          this.messageService.add({severity:'success', summary: 'Éxito', detail: `${this.videojuego?.nombre} añadido al carrito.`});
        },
        error: (err) => {
          this.mensajeDeError.set("El juego ya esta en el carrito");
           setTimeout(() => {
            this.mensajeDeError.set("");
        }, 2000);

          console.error('Error al añadir al carrito:', err);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Hubo un error al procesar tu solicitud.'});
        }
      });
  }

  volverALaLista(): void {
    this.router.navigate(['/videojuego/lista-videojuegos']);
  }

}

