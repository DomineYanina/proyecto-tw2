import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button, ButtonModule } from "primeng/button";
import { Card, CardModule } from 'primeng/card';
import { Tag, TagModule } from 'primeng/tag';
import { AuthService } from '../../../../core/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-view-user',
  imports: [Button,RouterLink,Card,Tag,Card,ButtonModule,CardModule,TagModule],

  templateUrl: './view-user.html',
  styleUrl: './view-user.css',
})
export class ViewUser {
  usuarioService = inject(UsuarioService);
  usuario!: Usuario;
  private cdr = inject(ChangeDetectorRef);

  auth=inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    if(!this.auth.verificarSiHayUsuarioEnSession()){
      this.router.navigate(["usuario/login"]);
    }
    
      this.verUsuario();
  }
  ngOnDestroy(): void {

  }

  verUsuario() {

    this.usuarioService.getUsuario().subscribe({

      next: (usuario: Usuario) => {
        this.usuario = usuario;
        console.log(usuario);
        this.cdr.detectChanges();
      },
      error: (error) => {

      },
      complete: () => {

      }
    });
  }

}