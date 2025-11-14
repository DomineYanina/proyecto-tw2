import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Videojuego} from '../../../modules/videojuego/interfaces/videojuego.interface';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class VideojuegoService {

  http = inject(HttpClient);

  constructor() { }

  listVideojuegos(): Observable<Videojuego[]> {
    return this.http.get<Videojuego[]>(`${environment.api_url}/videojuego/`);
  }

  getVideojuegoById(id: number): Observable<Videojuego> {
    return this.http.get<Videojuego>(`${environment.api_url}/videojuego/${id}`);
  }

  getRequisitosPCByVideojuegoId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/videojuego/${id}/requisitos-pc`);
  }


  getDesarrolladorByVideojuegoId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/videojuego/desarrollador/${id}`);
  }

  obtenerFiltrados(filtros: { nombre?: string; clasificacion?: string; precioMin?: number; precioMax?: number }): Observable<Videojuego[]> {
    let params = new HttpParams();
    
    if (filtros.nombre) {
      params = params.set('nombre', filtros.nombre);
    }
    if (filtros.clasificacion) {
      params = params.set('clasificacion', filtros.clasificacion);
    }
    if (filtros.precioMin !== undefined) {
      params = params.set('precioMin', filtros.precioMin.toString());
    }
    if (filtros.precioMax !== undefined) {
      params = params.set('precioMax', filtros.precioMax.toString());
    }

    return this.http.get<Videojuego[]>(`${environment.api_url}/videojuego/`, { params });
  }
}
