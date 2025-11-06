import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVideojuego } from './detalle-videojuego';

describe('DetalleVideojuego', () => {
  let component: DetalleVideojuego;
  let fixture: ComponentFixture<DetalleVideojuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleVideojuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleVideojuego);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
