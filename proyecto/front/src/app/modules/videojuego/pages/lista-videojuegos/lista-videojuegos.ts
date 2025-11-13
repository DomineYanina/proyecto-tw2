import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { VideojuegoService } from '../../../../api/services/videojuego/videojuego.service';
import { Videojuego } from '../../interfaces/videojuego.interface';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { VideojuegoFilter } from '../../components/videojuego-filter/videojuego-filter';

@Component({
  selector: 'app-lista-videojuegos',
  standalone: true,
  imports: [TableModule, CommonModule, CardModule, ButtonModule, VideojuegoFilter],
  templateUrl: './lista-videojuegos.html',
  styleUrls: ['./lista-videojuegos.css']
})
export class ListaVideojuegos implements OnInit, OnDestroy {

  videojuegos: Videojuego[] = [];
  videojuegoService = inject(VideojuegoService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);


  ngOnInit(): void {
    this.listarVideojuegos();
  }

  ngOnDestroy(): void {

  }

  listarVideojuegos(): void {
    this.videojuegoService.listVideojuegos().subscribe({
      next: (videojuegos: Videojuego[]) => {
        this.videojuegos = videojuegos;
        console.log(this.videojuegos);
        this.cdr.detectChanges();
      },
      error: () => {

      },
      complete: () => {

      }
    })
  }

  verDetalles(id: number): void {
    this.router.navigate(['/videojuego/detalle-videojuego', id]);
  }

  onApply(filtros: { nombre?: string; clasificacion?: string; precioMin?: number; precioMax?: number }): void {
    this.videojuegoService.obtenerFiltrados(filtros).subscribe({
      next: (videojuegos) => {
        this.videojuegos = videojuegos;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al filtrar videojuegos:', error);
      }
    });
  }


  onClear(): void {
    this.listarVideojuegos();
  }
}
