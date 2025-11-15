import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/auth.service';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, Card,ButtonModule,Button,RouterLink],
  templateUrl: './update-user.html',
  styleUrls: ['./update-user.css'],
})
export class UpdateUser {

  router = inject(Router);
  usuarioService = inject(UsuarioService);
  private fb = inject(FormBuilder);
  usuario!: Usuario;
  form!: FormGroup;

  auth=inject(AuthService);

  ngOnInit(): void {;
    if(!this.auth.verificarSiHayUsuarioEnSession()){
      this.router.navigate(["usuario/login"]);
    }

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usuario : ['', Validators.required],
      direccion : ['', Validators.required]
    });

    this.cargarDatosUsuarioActual();
  }

  ngOnDestroy(): void {

  }

  cargarDatosUsuarioActual(): void {
    this.usuarioService.getUsuario().subscribe({
      next: (dataUsuario: Usuario) => {
        this.usuario = dataUsuario;

        this.form.patchValue({
          nombre: dataUsuario.nombre,
          apellido: dataUsuario.apellido,
          email: dataUsuario.email,
          usuario: dataUsuario.usuario,
          direccion: dataUsuario.direccion
        });
      },
      error: (error) => {
        console.error('Error al cargar datos del usuario:', error);
      }
    });
  }

  actualizarUsuario() {
    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    const updatedUsuario: Usuario = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      email: this.form.get('email')?.value,
      id: this.form.get('id')?.value,
      password_hash: this.form.get('password_hash')?.value,
      usuario : this.form.get('usuario')?.value,
      direccion : this.form.get('direccion')?.value
    };

    this.usuarioService.updateUsuario(updatedUsuario).subscribe({
      next: (usuario: Usuario) => {
        console.log('Usuario actualizado exitosamente:');

      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
      },
      complete: () => {
        this.router.navigate(['usuario/verUsuario']);
      }

    });
  }
}
