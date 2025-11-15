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

  crearPedido(carritoItems: any[]): Observable<Pedido> {
    return this.http.post<Pedido>(`${environment.api_url}/pedidos`, { items: carritoItems });
  }

  getPedidosUsuario(usuarioId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${environment.api_url}/pedidos/${usuarioId}`);
  }

}
