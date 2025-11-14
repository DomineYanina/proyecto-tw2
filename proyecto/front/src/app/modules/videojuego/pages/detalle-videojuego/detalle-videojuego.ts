import { Component, inject, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
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
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-detalle-videojuego',
  standalone: true,
  imports: [DividerModule, ImageModule, DatePipe, CommonModule, CurrencyPipe, ButtonModule, GalleriaModule],
  // Nota: Deberías usar template y styles inline o en el mismo archivo para cumplir con el Single-File Mandate,
  // pero mantengo la estructura original por el momento.
  templateUrl: './detalle-videojuego.html',
  styleUrl: './detalle-videojuego.css'
})
export class DetalleVideojuego implements OnInit, OnDestroy {

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
  imagenesGaleria: string[] = [];



  @ViewChild('audioFx') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  tarjetaMediosActiva: boolean = false;
  tarjetaInfoActiva: boolean = false;
  // Nueva variable para gestionar el estado de ocultamiento
  otraTarjetaInactiva: boolean = false;

  toggleTarjeta(tipo: 'medios' | 'info') {
    // Lógica para reproducir sonido y alternar estados...
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

  // Asegúrate de que este método también exista
  playFuturisticSound() {
    // ... lógica para reproducir audio ...
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      const audio = this.audioPlayerRef.nativeElement;
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.warn('Error al reproducir el audio:', error);
      });
    }
  }

  ngOnInit(): void {
    // Hemos combinado la carga del videojuego y el desarrollador en un solo método
    this.cargarDatosDesdeRuta();
    // La carga de requisitos sigue siendo independiente, solo necesita el ID de la ruta
    this.obtenerRequisitosPC();
  }

  ngOnDestroy(): void {
    // Código a ejecutar al destruir el componente (p. ej., desuscripciones manuales si no usamos async pipe)
  }

  /**
   * Carga el Videojuego a partir del parámetro 'id' de la ruta
   * y luego encadena la llamada para obtener el Desarrollador usando el 'id_desarrollador'.
   */
  cargarDatosDesdeRuta(): void {
    this.route.params.pipe(
      // 1. Obtener el ID de la ruta y obtener el Videojuego
      switchMap(params => {
        const id = +params['id']; // El '+' convierte el string del parámetro a número
        if (id && !isNaN(id)) {
          this.videojuegoId = id;
          return this.videojuegoService.getVideojuegoById(id);
        }
        return of(null); // Retorna un observable nulo si el ID no es válido
      }),
      // Asegurarse de que el videojuego no sea nulo antes de continuar
      filter((videojuego): videojuego is Videojuego => !!videojuego),
      // 2. Usar 'tap' para asignar el videojuego a la propiedad local
      tap(videojuego => {
        this.videojuego = videojuego;
        this.desarrolladorId = videojuego.id_desarrollador || 0;
        // LLAMADA CLAVE: Generar las rutas de la galería después de cargar el juego
        if (this.videojuego.url_portada && this.videojuego.url_portada.endsWith('.jpeg.jpeg')) {
        // Reemplaza la doble extensión con una simple
        this.videojuego.url_portada = this.videojuego.url_portada.replace('.jpeg.jpeg', '.jpeg');
      }
        this.generarRutasGaleria();
        console.log('Videojuego obtenido:', this.videojuego);
      }),
      // 3. Usar el segundo 'switchMap' para pasar del observable del Videojuego
      //    al observable del Desarrollador, usando el id_desarrollador.
      switchMap(videojuego => {
        if (videojuego.id_desarrollador) {
          // ⬅️ ¡Aquí se pasa correctamente el id_desarrollador!
          return this.videojuegoService.getDesarrolladorByVideojuegoId(videojuego.id_desarrollador);
        }
        return of(null); // Retorna nulo si no hay ID de desarrollador
      })
    ).subscribe({
      next: (desarrollador) => {
        this.desarrollador = desarrollador;
        console.log('Desarrollador obtenido:', this.desarrollador);
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
          // No necesitamos almacenar this.videojuegoId aquí de nuevo, pero lo mantenemos por consistencia
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

  agregarACarrito(): void {
    const userIdStr = this.authService.getUserId();
    const videojuegoId = this.videojuego?.id;

    // 1. Verificar el ID del usuario
    if (!userIdStr) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debe iniciar sesión para agregar ítems al carrito.' });
      return;
    }

    // 2. Verificar el ID del videojuego
    if (!videojuegoId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo identificar el videojuego.' });
      return;
    }

    const userId = parseInt(userIdStr, 10);

    // 3. Llamar al servicio del carrito
    this.carritoService.agregarItem(userId, videojuegoId, 1) // Añade 1 unidad
      .subscribe({
        next: (response) => {
          console.log('Videojuego añadido al carrito:', response);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `${this.videojuego?.nombre} añadido al carrito.` });
        },
        error: (err) => {
          console.error('Error al añadir al carrito:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al procesar tu solicitud.' });
        }
      });
  }


  volverALaLista(): void {
    this.router.navigate(['/videojuego/lista-videojuegos']);
  }

  generarRutasGaleria(): void {
    if (!this.videojuego?.nombre) {
      this.imagenesGaleria = [];
      return;
    }

    // Normaliza el nombre del juego para que coincida con la carpeta:
    // Ejemplo: "Cyberpunk 2077" -> "cyberpunk_2077"
    const nombreCarpeta = this.videojuego.nombre
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Elimina caracteres especiales
      .replace(/\s+/g, '_');      // Reemplaza espacios con guiones bajos

    const rutasBase = 'assets/imagenes-juegos/' + nombreCarpeta + '/';

    // Intentamos cargar 5 imágenes (puedes ajustar este número)
    for (let i = 1; i <= 5; i++) {
      // En un proyecto real, esto debería verificar la existencia del archivo o usar un API
      // Por ahora, asumimos que pueden existir hasta 5 archivos nombrados img_1.jpg a img_5.jpg.
      this.imagenesGaleria.push(rutasBase + `img_${i}.jpg`);
    }

    // Opcional: Si quieres la portada como primera imagen
    // if (this.videojuego.url_portada) {
    //     this.imagenesGaleria.unshift(this.videojuego.url_portada);
    // }

    console.log('Rutas de la galería generadas:', this.imagenesGaleria);
  }
}

