import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'videojuego-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './videojuego-filter.html',
  styleUrls: ['./videojuego-filter.css']
})
export class VideojuegoFilter implements OnInit, OnDestroy {
  @Output() apply = new EventEmitter<any>();
  @Output() clear = new EventEmitter<void>();

  filtros = {
    nombre: '',
    clasificacion: '',
    precioMin: undefined as number | undefined,
    precioMax: undefined as number | undefined
  };

  aplicar(): void {
    this.saveFilters();
    this.apply.emit({ ...this.filtros });
  }

  limpiar(): void {
    this.filtros = { nombre: '', clasificacion: '', precioMin: undefined, precioMax: undefined };

    try { localStorage.removeItem('videojuego-filtros'); } catch (e) {  }
    this.clear.emit();
  }

  ngOnInit(): void {
    try {
      const raw = localStorage.getItem('videojuego-filtros');
      if (raw) {
        const saved = JSON.parse(raw);
        this.filtros = {
          nombre: saved.nombre ?? '',
          clasificacion: saved.clasificacion ?? '',
          precioMin: saved.precioMin !== undefined && saved.precioMin !== null ? Number(saved.precioMin) : undefined,
          precioMax: saved.precioMax !== undefined && saved.precioMax !== null ? Number(saved.precioMax) : undefined
        };
      }
    } catch (e) {

      console.warn('No se pudieron cargar filtros guardados:', e);
    }
  }

  ngOnDestroy(): void {

    this.saveFilters();
  }

  private saveFilters(): void {
    try {
      localStorage.setItem('videojuego-filtros', JSON.stringify(this.filtros));
    } catch (e) {
      console.warn('No se pudieron guardar los filtros:', e);
    }
  }
}
