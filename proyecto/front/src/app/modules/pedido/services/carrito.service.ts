import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carrito, CarritoItem } from '../interfaces/carrito.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  // El estado inicial del carrito
  private carritoInicial: Carrito = { items: [], total: 0, cantidadTotal: 0 };
  
  // Usamos BehaviorSubject para almacenar el estado y hacerlo observable
  private carritoSubject = new BehaviorSubject<Carrito>(this.carritoInicial);
  
  // Observable que los componentes suscribirán para obtener el carrito
  public carrito$ = this.carritoSubject.asObservable(); 

  constructor() { }

  private actualizarCarrito(carrito: Carrito): void {
    // Aquí podrías guardar el carrito en LocalStorage
    this.carritoSubject.next(carrito);
  }

  agregarItem(item: CarritoItem): void {
    const carritoActual = this.carritoSubject.value;
    // Lógica para agregar, sumar cantidad si ya existe, recalcular total, etc.
    // ...
    // Luego, llamas a this.actualizarCarrito(nuevoCarrito);
  }

  // Otros métodos: eliminarItem, limpiarCarrito, etc.
}