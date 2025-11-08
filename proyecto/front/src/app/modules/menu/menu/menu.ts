import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu'; // ⬅️ Nuevo: Módulo para el menú desplegable
import { MenuItem } from 'primeng/api'; // ⬅️ Nuevo: Interfaz para definir los ítems

@Component({
  selector: 'app-menu',
  standalone: true,
  // ⬅️ Añadimos MenuModule a las importaciones
  imports: [RouterLink, ButtonModule, MenuModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {

  menuItems: MenuItem[] = [];
  @ViewChild('menu') menu: any; // Referencia al componente p-menu en el template

  ngOnInit(): void {
    // Definición de los ítems del menú desplegable "Videojuegos"
    this.menuItems = [
      {
        label: 'Ver Catálogo',
        icon: 'pi pi-list',
        routerLink: ['/videojuego/catalogo'] // Enlace a la lista principal
      },
      {
        label: 'Buscar por Título',
        icon: 'pi pi-search',
        routerLink: ['/videojuego/buscar'] // Enlace a la búsqueda
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
}