import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Carrito } from '../../../modules/carrito/interfaces/carrito.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  http = inject(HttpClient);

  constructor() { }

  obtenerCarrito(id: number): Observable<Carrito> {
      return this.http.get<Carrito>(`${environment.api_url}/carrito/${id}`);
    }
}
