import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Carrito, CarritoItem } from '../../../modules/carrito/interfaces/carrito.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  http = inject(HttpClient);

  constructor() { }

  obtenerCarrito(id: number): Observable<CarritoItem[]> {
      return this.http.get<CarritoItem[]>(`${environment.api_url}/carrito/${id}`);
    }
}
