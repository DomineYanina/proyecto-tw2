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
        }
      })
    );
  }

  // 🧭 Obtener el token actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 👤 Saber si el usuario sigue logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🚪 Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    try { localStorage.removeItem('videojuego-filtros'); } catch(e) { /* ignore */ }
  }

  // 📦 Obtener info del usuario logueado
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
