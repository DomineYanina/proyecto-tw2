import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../../../modules/usuario/interfaces/usuario.interface';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../core/auth.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  http = inject(HttpClient);
  private authService = inject(AuthService);



  constructor() { }

  getUsuario(): Observable<Usuario> {
    const user = this.authService.getUser();
    if (!user || !user.id) {
      throw new Error('Usuario no autenticado o ID no disponible');
    }
    return this.http.get<Usuario>(`${environment.api_url}/user/${user.id}`);

  }
}
