import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraPesoComponent } from './calculadora-peso.component';

describe('CalculadoraPesoComponent', () => {
  let component: CalculadoraPesoComponent;
  let fixture: ComponentFixture<CalculadoraPesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculadoraPesoComponent]
    });
    fixture = TestBed.createComponent(CalculadoraPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
