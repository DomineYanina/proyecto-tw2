import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { UsuarioRegistro } from '../../interfaces/usuarioRegistro.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule,CardModule,
    ButtonModule,RouterLink, FloatLabelModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {

  usuarioService = inject(UsuarioService);
  router = inject(Router);
  private fb = inject(FormBuilder);

  mensajeError = signal("");

  value="hola";

  form!: FormGroup;
  camposFormulario = [
    { nombre: 'email', tipo: "email" ,placeholder:"japigames@sape.com"},
    { nombre: 'usuario', tipo: "text",placeholder:" sape123" },
    { nombre: 'contra', tipo: "password",placeholder:"Minimo 5 caracteres, 1 mayuscula, 1 minuscula y 1 numero" },
    { nombre: 'nombre', tipo: "text",placeholder:" Joel" },
    { nombre: 'apellido', tipo: "text",placeholder:" Escobar" },
    { nombre: 'direccion', tipo: "text",placeholder:"Av siempre viva 123" }];

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

  sendUsuario() {
    const usuarioNuevo: UsuarioRegistro = {
      usuario: this.form.get('usuario')!.value,
      nombre: this.form.get('nombre')!.value,
      email: this.form.get('email')!.value,
      contrasena: this.form.get('contra')!.value,
      apellido: this.form.get('apellido')!.value,
      direccion: this.form.get('direccion')!.value,
    };

    this.usuarioService.crearNuevoUsuario(usuarioNuevo).subscribe({
      next: (valor) => {
        console.log(valor);
      },
      error: (error) => {
        let mensaje:string = error.error?.tipo || "otro Error";
        this.mensajeError.set(mensaje);
      }, complete: () => {
        this.mensajeError.set("");
        this.form.reset();
        this.router.navigate(['/usuario/login']);
      }
    })
  }
}