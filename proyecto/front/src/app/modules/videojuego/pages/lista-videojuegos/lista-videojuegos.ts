import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { VideojuegoService } from '../../../../api/services/videojuego/videojuego.service';
import { Videojuego } from '../../interfaces/videojuego.interface';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-lista-videojuegos',
  imports: [TableModule],
  templateUrl: './lista-videojuegos.html',
  styleUrl: './lista-videojuegos.css'
})
export class ListaVideojuegos implements OnInit, OnDestroy {

  videojuegos: Videojuego[] = [];
  videojuegoService = inject(VideojuegoService);

  ngOnInit(): void {
    this.listarVideojuegos();
  }

  ngOnDestroy(): void {
    // Código a ejecutar al destruir el componente
  }

  listarVideojuegos(): void {
    this.videojuegoService.listVideojuegos().subscribe({
      next: (videojuegos: Videojuego[]) => {
        this.videojuegos = videojuegos;
      },
      error: () => {

      },
      complete: () => {

      }
    })
  }
}
