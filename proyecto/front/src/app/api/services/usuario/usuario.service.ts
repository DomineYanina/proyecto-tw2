import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../../../modules/usuario/interfaces/usuario.interface';
import { environment } from '../../../../environments/environment.development';
import { UsuarioRegistro } from '../../../modules/usuario/interfaces/usuarioRegistro.interface';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  http = inject(HttpClient);

  constructor() { }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.api_url}/user/${id}`)

  }

  crearNuevoUsuario(nuevoUsuario:UsuarioRegistro): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.api_url}/user/`, nuevoUsuario)
  }
}

// Estructura para hacer una peticion
// ObjetoHTTP.MetodoHTTP(URL, body)
// EJ:
// this.http.delete(`${environment.api_url}/user/${id}`) envio de ID

// const params = new HttpParams().set('nombre', nombre);
// this.http.get<Usuario[]>(`${environment.api_url}/user`, { params }); envio de PARAMETROS

// this.http.post<Usuario>(`${environment.api_url}/user`, usuario); envio de objeto

// ALL se puede concatenear
// this.http.put<Usuario>(`${environment.api_url}/user/${id}`, usuario);

