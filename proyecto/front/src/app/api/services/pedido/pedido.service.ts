import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../../../../app/modules/pedido/interfaces/pedido.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  http = inject(HttpClient);

  constructor() { }

  /*private apiUrl = 'http://localhost:3000/api/pedidos'; 

  constructor(private http: HttpClient) { }*/

  /*${environment.api_url}/carrito*/ 

  // 1. Convertir carrito a pedido (llamada al backend)
  crearPedido(carritoItems: any[]): Observable<Pedido> {
    return this.http.post<Pedido>(`${environment.api_url}/pedidos`, { items: carritoItems });
  }

  // 2. Obtener la lista de pedidos de un usuario
  getPedidosUsuario(usuarioId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${environment.api_url}/pedidos/${usuarioId}`);
  }

  // 3. Obtener el detalle de un pedido
  /*getPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }*/
}
