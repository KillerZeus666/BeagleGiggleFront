import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularEdadComponent } from './calcular-edad.component';

describe('CalcularEdadComponent', () => {
  let component: CalcularEdadComponent;
  let fixture: ComponentFixture<CalcularEdadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalcularEdadComponent]
    });
    fixture = TestBed.createComponent(CalcularEdadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
