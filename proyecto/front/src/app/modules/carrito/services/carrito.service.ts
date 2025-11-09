// src/app/api/services/carrito/carrito.service.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CarritoItem } from '../../carrito/interfaces/carrito.interface'; // Importar solo CarritoItem

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = `${environment.api_url}/carrito`;

  private http = inject(HttpClient);
  
  obtenerCarrito(userId: number): Observable<CarritoItem[]> {
      return this.http.get<CarritoItem[]>(`${this.apiUrl}/${userId}`);
  }
    
  agregarItem(usuario_id: number, videojuego_id: number, cantidad: number = 1): Observable<any> {
    const item = {
      usuario_id: usuario_id,
      videojuego_id: videojuego_id,
      cantidad: cantidad
    };
    
    return this.http.post(`${this.apiUrl}/agregar`, item); 
  }
}