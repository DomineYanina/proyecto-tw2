import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../interfaces/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = 'http://localhost:3000/api/pedidos'; 

  constructor(private http: HttpClient) { }

  // 1. Convertir carrito a pedido (llamada al backend)
  crearPedido(carritoItems: any[]): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, { items: carritoItems });
  }

  // 2. Obtener la lista de pedidos de un usuario
  getPedidosUsuario(usuarioId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // 3. Obtener el detalle de un pedido
  getPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }
}