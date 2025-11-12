import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVideojuego } from './crear-videojuego';

describe('CrearVideojuego', () => {
  let component: CrearVideojuego;
  let fixture: ComponentFixture<CrearVideojuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearVideojuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearVideojuego);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
