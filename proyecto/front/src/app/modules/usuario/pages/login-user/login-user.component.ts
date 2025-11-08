import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth.service';

@Component({
  selector: 'app-login-user',
  standalone: true, // 👈 importante
  imports: [CommonModule, FormsModule], // 👈 agrega esto
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  email: string = '';
  contrasena: string = '';
  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.email || !this.contrasena) {
      this.errorMsg = 'Por favor completá todos los campos';
      return;
    }

    this.authService.login(this.email, this.contrasena).subscribe({
      next: (response) => {
        console.log('✅ Login exitoso:', response);
        this.router.navigate(['/videojuego/lista-videojuegos']);
      },
      error: (err) => {
        console.error('❌ Error en login:', err);
        this.errorMsg = err.error?.message || 'Credenciales inválidas';
      }
    });
  }
}
