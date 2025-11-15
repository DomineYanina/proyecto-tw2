import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule
  ],
  template: `
    <div class="flex justify-content-center mt-5">
      <p-card header="¡Compra Exitosa! 🎉" styleClass="w-full md:w-6 shadow-8">
        <div class="text-center p-4">
          <i class="pi pi-check-circle text-green-500 text-6xl mb-3"></i>
          <p class="text-xl font-medium mb-4">
            Gracias por tu compra. Tu pedido ha sido procesado correctamente.
          </p>
          <p *ngIf="pedidoId" class="text-lg mb-5">
            ID de tu Pedido: <strong class="text-blue-600">{{ pedidoId }}</strong>
          </p>
          <p-button
            label="Volver al Catálogo"
            icon="pi pi-home"
            (onClick)="irACatalogo()"
            styleClass="p-button-primary"
          ></p-button>
        </div>
      </p-card>
    </div>
  `,
  styles: ``
})
export class Checkout implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  auth=inject(AuthService);


  pedidoId: string | null = null;

  ngOnInit(): void {
    if(!this.auth.verificarSiHayUsuarioEnSession()){
      this.router.navigate(["usuario/login"]);
    }
    
    this.pedidoId = this.route.snapshot.paramMap.get('id');
  }

  irACatalogo(): void {
    this.router.navigate(['/videojuego/lista-videojuegos']);
  }
}
