import { Component, inject, output, signal } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { UsuarioRegistro } from '../../interfaces/usuarioRegistro.interface';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {

  usuarioService = inject(UsuarioService);
  router = inject(Router);
  private fb = inject(FormBuilder);

  mensajeError = signal("");

  form!: FormGroup;
  camposFormulario = [
    { nombre: 'email', tipo: "email" },
    { nombre: 'usuario', tipo: "text" },
    { nombre: 'contra', tipo: "password" },
    { nombre: 'nombre', tipo: "text" },
    { nombre: 'apellido', tipo: "text" },
    { nombre: 'direccion', tipo: "text" }];

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      usuario: ["", [Validators.required]],
      contra: ["", [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{5,}/)]],
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      direccion: ["", [Validators.required]]
    });
  }

  eventEmitterFormEmpleado = output<Usuario>();

  sendUsuario() {
    const usuarioNuevo: UsuarioRegistro = {
      usuario: this.form.get('usuario')!.value,
      nombre: this.form.get('nombre')!.value,
      email: this.form.get('email')!.value,
      contrasena: this.form.get('contra')!.value,
      apellido: this.form.get('apellido')!.value,
      direccion: this.form.get('direccion')!.value,
    };

    this.form.reset();

    //TODO terminar esto con los codigo de error
    this.usuarioService.crearNuevoUsuario(usuarioNuevo).subscribe({
      next: (valor) => {
        console.log("exito");
        console.log(valor.usuario);
      },
      error: (error) => {
        console.log("fallo " + error)
        this.mensajeError.set("error");
        console.error("❌ Error recibido:", error);
        console.log("Código:", error.status);
        console.log("Mensaje genérico:", error.message);
        console.log("Cuerpo del error (backend):", error.error);

        // Acceder al mensaje del backend
        const mensaje = error.error?.message || "Error desconocido";
        this.mensajeError.set(mensaje);
      }, complete: () => {
        //Solo se ejecuta cuando es correcto
        this.mensajeError.set("");
        console.log("termino");
        this.router.navigate(['/usuario/login']);
      }
    }
    )
  }
}

// console.log(usuario.nombre);
// this.eventEmitterFormEmpleado.emit(usuario);

// Anotaciones mias

// this.form.get('usuario')?.value
// const control = this.form.get('usuario');
// const valor = control ? control.value : undefined;
// Si control existe (no es null ni undefined), se devuelve control.value.
// condicion? valor verdadero:valor falso

// form!: FormGroup;
//El ! indica que sera inicializado antes de usarlo

// fuera de la clase puedo poner tipado normal
// Pero dentro de funciones tengo que poner LET y CONST para el tipado
// const filas:number=this.camposFormulario.length;
// let i:number=0;

// Expresiones regulares
// /^ --> inicia
// $/ --> asi terminar
// Al menos un número [0-9]
// Al menos una letra mayúscula [A-Z]
// Al menos una letra minuscula [a-z]
// Al menos un símbolo [!@#$%^&*]
// Mínimo 8 caracteres . {8,}
