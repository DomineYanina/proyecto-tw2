import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.api_url}/user`; // http://localhost:3000/api/user

  constructor(private http: HttpClient) {}

  // 🔐 Login
  login(email: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, contrasena }).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem('token', response.token); // ✅ guarda el token
          localStorage.setItem('user', JSON.stringify(response.user)); // opcional, guarda el usuario
          if (response.user && response.user.id) {
             localStorage.setItem('user_id', response.user.id); // ✅ guarda el ID del usuario
          }
        }
      })
    );
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }
  // 🧭 Obtener el token actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }
    // 📦 Obtener info del usuario logueado
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // 👤 Saber si el usuario sigue logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🚪 Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
  }

  verificarSiHayUsuarioEnSession():boolean{
    let hayUsuarioEnSession:boolean=true;
    if(!this.getToken() || !this.getUser() || !this.getUserId()){
        hayUsuarioEnSession=false;
    }

    return hayUsuarioEnSession;
  }

  verObjetosGuardadosDeLaSession() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key!);
      console.log(key, value);
    }
  }
}
