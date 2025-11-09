import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = `${environment.api_url}/carrito`;

  private http = inject(HttpClient);
  
  agregarItem(usuario_id: number, videojuego_id: number, cantidad: number = 1): Observable<any> {
    const item = {
      usuario_id: usuario_id,
      videojuego_id: videojuego_id,
      cantidad: cantidad
    };
    
    return this.http.post(`${this.apiUrl}/agregar`, item); 

  }

}