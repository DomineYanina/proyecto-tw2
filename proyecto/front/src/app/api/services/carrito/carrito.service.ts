import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { CarritoItem } from '../../../modules/carrito/interfaces/carrito.interface';
import { environment } from '../../../../environments/environment.development';
import { Pedido } from '../../../modules/pedido/interfaces/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  http = inject(HttpClient);

  constructor() { }

  obtenerCarrito(id: number): Observable<CarritoItem[]> {
      return this.http.get<CarritoItem[]>(`${environment.api_url}/carrito/${id}`);
  }

  agregarItem(usuario_id: number, videojuego_id: number, cantidad: number = 1): Observable<any> {
    const item = {  
      videojuegoId: videojuego_id,
      cantidad: cantidad
    };
    
    return this.http.post(`${environment.api_url}/carrito/agregar/${usuario_id}`, item); 
  }

  realizarCompra(userId: number): Observable<Pedido> {
      return this.http.post<Pedido>(`${environment.api_url}/carrito/compra/${userId}`, {});
  }

  eliminarItem(userId: number, itemId: number): Observable<CarritoItem[]> {
    const url = `${environment.api_url}/carrito/item?userId=${userId}&itemId=${itemId}`;
    return this.http.delete<void>(url).pipe(
        switchMap(() => {
            return this.http.get<CarritoItem[]>(`${environment.api_url}/carrito/${userId}`);
        })
    );
}
}
