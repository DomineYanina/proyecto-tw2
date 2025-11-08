import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { VideojuegoService } from '../../../../api/services/videojuego/videojuego.service';
import { Videojuego } from '../../interfaces/videojuego.interface';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-videojuegos',
  standalone: true,
  imports: [TableModule, CommonModule, CardModule, ButtonModule],
  templateUrl: './lista-videojuegos.html',
  styleUrl: './lista-videojuegos.css'
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
    // Código a ejecutar al destruir el componente
  }

  listarVideojuegos(): void {
    this.videojuegoService.listVideojuegos().subscribe({
      next: (videosjuegos: Videojuego[]) => {
        this.videojuegos = videosjuegos;
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
}
