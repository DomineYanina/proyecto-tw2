import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-detalle-videojuego',
  standalone: true,
  imports: [DividerModule, ImageModule, DatePipe, CommonModule, CurrencyPipe, ButtonModule],
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

  /**
   * Obtiene los requisitos de PC basándose en el ID de la ruta,
   * manteniendo la lógica separada ya que no depende del objeto Videojuego.
   */
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

  
  volverALaLista(): void {
    this.router.navigate(['/videojuego/lista-videojuegos']);
  }
}