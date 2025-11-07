import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button } from "primeng/button";
import { Card } from 'primeng/card';

@Component({
  selector: 'app-view-user',
  imports: [Button,RouterLink,Card],

  templateUrl: './view-user.html',
  styleUrl: './view-user.css',
})
export class ViewUser {

  usuarioService = inject(UsuarioService);
  activatedRoute = inject(ActivatedRoute);
  id: number = 0;
  usuario!: Usuario;
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.verUsuario();

  }
  ngOnDestroy(): void {

  }

  verUsuario() {
    //this.router.navigate(['/perfil', usuario.id]);
    this.usuarioService.getUsuario(this.id).subscribe({

      next: (usuario: Usuario) => {
        this.usuario = usuario;
        console.log(usuario);
        this.cdr.detectChanges();
      },
      error: (error) => {
        // Manejo de errores
      },
      complete: () => {
        // Lógica al completar la solicitud
      }
    });
  }

}

