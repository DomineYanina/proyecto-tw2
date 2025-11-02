import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVideojuegos } from './lista-videojuegos';

describe('ListaVideojuegos', () => {
  let component: ListaVideojuegos;
  let fixture: ComponentFixture<ListaVideojuegos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaVideojuegos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaVideojuegos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
