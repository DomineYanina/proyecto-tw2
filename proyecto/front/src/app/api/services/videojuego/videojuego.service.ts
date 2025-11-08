import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get<Videojuego>(`${environment.apiUrl}/videojuego/${id}`);
  }

  getRequisitosPCByVideojuegoId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/videojuego/${id}/requisitos-pc`);
  }


  getDesarrolladorByVideojuegoId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/videojuego/desarrollador/${id}`);
  }


}
