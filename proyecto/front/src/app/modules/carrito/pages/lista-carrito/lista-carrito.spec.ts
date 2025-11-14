import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCarrito } from './lista-carrito';

describe('Carrito', () => {
  let component: ListaCarrito;
  let fixture: ComponentFixture<ListaCarrito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCarrito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCarrito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
