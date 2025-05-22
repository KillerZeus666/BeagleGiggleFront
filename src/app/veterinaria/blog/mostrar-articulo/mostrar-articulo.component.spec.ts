import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarArticuloComponent } from './mostrar-articulo.component';

describe('MostrarArticuloComponent', () => {
  let component: MostrarArticuloComponent;
  let fixture: ComponentFixture<MostrarArticuloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarArticuloComponent]
    });
    fixture = TestBed.createComponent(MostrarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
