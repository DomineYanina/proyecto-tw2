// import { Component, inject } from '@angular/core';
// import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
// import { Usuario } from '../../interfaces/usuario.interface';
// import { Router } from '@angular/router';
// import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
// import { Button } from 'primeng/button';

// @Component({
//   selector: 'app-update-user',
//   standalone: true,
//   imports: [ReactiveFormsModule,Button],
//   templateUrl: './update-user.html',
//   styleUrls: ['./update-user.css'],
// })
// export class UpdateUser {

//   router = inject(Router);
//   usuarioService = inject(UsuarioService);
//   private fb = inject(FormBuilder);

//   usuario!: Usuario;
//   form!: FormGroup;

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       nombre: [this.usuario?.nombre, Validators.required],
//       apellido: [this.usuario?.apellido],
//       email: [this.usuario?.email, [Validators.required, Validators.email]],
//       // Otros campos según la interfaz Usuario
//     });
//   }
//   ngOnDestroy(): void {

//   }

//   actualizarUsuario() {
//     const updatedUsuario: Usuario = {
//       nombre: this.form.get('nombre')?.value,
//       apellido: this.form.get('apellido')?.value,
//       email: this.form.get('email')?.value,
//       id: this.form.get('id')?.value,
//       password_hash: this.form.get('password_hash')?.value,
//       usuario : this.form.get('usuario')?.value,
//       direccion : this.form.get('direccion')?.value
//       // Otros campos según la interfaz Usuario
//     };
//     this.usuarioService.updateUsuario(updatedUsuario).subscribe({
//       next: (usuario: Usuario) => {
//         console.log('Usuario actualizado:', usuario);
//       },
//       error: (error) => {
//         console.error('Error al actualizar el usuario:', error);
//       },
//       complete: () => {
//         this.router.navigate(['usuario/verUsuario']);
//       }
//     });
//   }
// }

import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, Button],
  templateUrl: './update-user.html',
  styleUrls: ['./update-user.css'],
})
export class UpdateUser {

  router = inject(Router);
  usuarioService = inject(UsuarioService);
  private fb = inject(FormBuilder);

  usuario!: Usuario;
  form!: FormGroup;

  ngOnInit(): void {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Incluir todos los campos necesarios para la actualización
      id: [''],
      password_hash: [''],
      usuario : [''],
      direccion : ['']
    });

    // 2. Cargar los datos existentes en el formulario
    this.cargarDatosUsuarioActual();
  }
 
  ngOnDestroy(): void {
    // Aquí puedes gestionar la cancelación de suscripciones si las hubieras creado.
  }

  /**
   * Carga los datos del usuario autenticado y los precarga en el formulario.
   */
  cargarDatosUsuarioActual(): void {
    // Llama a getUsuario() de tu servicio, el cual usa el ID interno.
    this.usuarioService.getUsuario().subscribe({
      next: (dataUsuario: Usuario) => {
        this.usuario = dataUsuario;

        // Usamos patchValue para rellenar el formulario
        this.form.patchValue({
          nombre: dataUsuario.nombre,
          apellido: dataUsuario.apellido,
          email: dataUsuario.email,
          id: dataUsuario.id,
          password_hash: dataUsuario.password_hash,
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
    // Verificar validez antes de enviar
    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    // Mapear los datos del formulario a la interfaz Usuario
    const updatedUsuario: Usuario = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      email: this.form.get('email')?.value,
      id: this.form.get('id')?.value, // El ID se cargó y se envía de vuelta
      password_hash: this.form.get('password_hash')?.value,
      usuario : this.form.get('usuario')?.value,
      direccion : this.form.get('direccion')?.value
    };
   
    this.usuarioService.updateUsuario(updatedUsuario).subscribe({
      next: (usuario: Usuario) => {
        console.log('Usuario actualizado exitosamente:', usuario);
        // 🚀 Redirigir al menú principal/vista después del éxito
        this.router.navigate(['usuario/verUsuario']);
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
        // Aquí podrías mostrar una notificación de error
      }
    });
  }
}
