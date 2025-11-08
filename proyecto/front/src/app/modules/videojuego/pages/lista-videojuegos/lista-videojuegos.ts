import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { VideojuegoService } from '../../../../api/services/videojuego/videojuego.service';
import { Videojuego } from '../../interfaces/videojuego.interface';
import { TableModule } from 'primeng/table';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-lista-videojuegos',
  imports: [TableModule, DatePipe, CurrencyPipe, CommonModule, CardModule, ButtonModule],
  templateUrl: './lista-videojuegos.html',
  styleUrl: './lista-videojuegos.css'
})
export class ListaVideojuegos implements OnInit, OnDestroy {

  videojuegos: Videojuego[] = [];
  videojuegoService = inject(VideojuegoService);
  private cdr = inject(ChangeDetectorRef);

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
        console.log(this.videojuegos);
        this.cdr.detectChanges();
      },
      error: () => {

      },
      complete: () => {

      }
    })
  }
}
