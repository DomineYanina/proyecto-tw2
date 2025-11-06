import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { VideojuegoService } from '../../../../api/services/videojuego/videojuego.service';
import { Videojuego } from '../../interfaces/videojuego.interface';

@Component({
  selector: 'app-lista-videojuegos',
  imports: [],
  templateUrl: './lista-videojuegos.html',
  styleUrl: './lista-videojuegos.css'
})
export class ListaVideojuegos implements OnInit, OnDestroy {

  videojuegoService = inject(VideojuegoService);

  ngOnInit(): void {
    // Código a ejecutar al inicializar el componente
  }

  ngOnDestroy(): void {
    // Código a ejecutar al destruir el componente
  }

  listarVideojuegos(): void {
    this.videojuegoService.listVideojuegos().subscribe({
      next: (data: Videojuego[]) => {
        console.log(data);
      },
      error: () => {

      },
      complete: () => {

      }
    })
  }
}
