import { Component, ViewChild, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, MenuModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {

  auth = inject(AuthService);
  router = inject(Router);

  menuItems: MenuItem[] = [];
  @ViewChild('menu') menu: any;

  ngOnInit(): void {
    this.auth.verificarSiHayUsuarioEnSession();

    this.menuItems = [
      {
        label: 'Ver Catálogo',
        icon: 'pi pi-list',
        routerLink: ['/videojuego/catalogo']
      },
      {
        label: 'Buscar por Título',
        icon: 'pi pi-search',
        routerLink: ['/videojuego/buscar']
      },
      { separator: true },
      {
        label: 'Administración',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Añadir Nuevo',
            icon: 'pi pi-plus',
            routerLink: ['/videojuego/nuevo']
          }
        ]
      }
    ];
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/usuario/login']);
  }
}
