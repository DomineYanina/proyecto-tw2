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
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          if (response.user && response.user.id) {
             localStorage.setItem('user_id', response.user.id);
          }
        }
      })
    );
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    try { localStorage.removeItem('videojuego-filtros'); } catch(e) { /* ignore */ }
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
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
