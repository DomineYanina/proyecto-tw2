import { Component, inject, output, signal } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {

  private fb = inject(FormBuilder);

  mensajeError = signal("");

  form!: FormGroup;
  camposFormulario = [
    { nombre: 'email', tipo: "email" },
    { nombre: 'usuario', tipo: "text" },
    { nombre: 'contra', tipo: "password" },
    { nombre: 'nombre', tipo: "text" },
    { nombre: 'apellido', tipo: "text" },
    { nombre: 'direccion', tipo: "text" },
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required,Validators.email]],
      usuario: ["", [Validators.required]],
      contra: ["", [Validators.required,Validators.pattern('(?=.*[0-9])')]],
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      direccion: ["", [Validators.required]]
    });
  }

  eventEmitterFormEmpleado = output<Usuario>();

  sendUsuario() {
    console.log(this.form.value);



    //Validaciones de contraseña y usuario/mail encontrados
    if(true){
      this.mensajeError.set("Error");
    }

    this.form.reset();
  }

  //probar despues
  hayCamposVacios(): boolean {
    let i: number = 0;
    let campoVacio: boolean = false;

    while (!campoVacio && i < this.camposFormulario.length) {
      let nombreCampo: string = this.camposFormulario[i].nombre;
      let valorCampo: string = this.form.get(nombreCampo)?.value;

      if (valorCampo.length == 0) {
        campoVacio = true;
      }
      i++;
    }
    return campoVacio;
  }
}

// const usuario: Usuario = {
//   id: 0,
//   usuario: this.form.get('usuario')?.value,
//   nombre: this.form.get('nombre')?.value,
//   email: "",
//   password_hash: "",
//   apellido:"",
//   direccion:"",
// };

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
