import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTratamientosComponent } from './historial-tratamientos.component';

describe('HistorialTratamientosComponent', () => {
  let component: HistorialTratamientosComponent;
  let fixture: ComponentFixture<HistorialTratamientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialTratamientosComponent]
    });
    fixture = TestBed.createComponent(HistorialTratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
