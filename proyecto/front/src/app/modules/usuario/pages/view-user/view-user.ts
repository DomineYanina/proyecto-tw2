import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button } from "primeng/button";
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { AuthService } from '../../../../core/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-view-user',
  imports: [Button,RouterLink,Card,Tag,Card],

  templateUrl: './view-user.html',
  styleUrl: './view-user.css',
})
export class ViewUser {
  usuarioService = inject(UsuarioService);
  //activatedRoute = inject(ActivatedRoute);
  //id: number = 0;
  usuario!: Usuario;
  private cdr = inject(ChangeDetectorRef);

  // Con estas 4 lineas manejo la session
  auth=inject(AuthService);
  router = inject(Router);
    //   if(!this.auth.verificarSiHayUsuarioEnSession()){
    //   this.router.navigate(["/"]);}

  ngOnInit(): void {
    if(!this.auth.verificarSiHayUsuarioEnSession()){
      this.router.navigate(["usuario/login"]);
    }
    //this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
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

