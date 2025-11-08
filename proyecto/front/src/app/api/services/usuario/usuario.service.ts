import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../../../modules/usuario/interfaces/usuario.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  http = inject(HttpClient);

  constructor() { }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.api_url}/user/${id}`)

  }
}
