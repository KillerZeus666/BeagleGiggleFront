import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasTratamientoComponent } from './mascotas-tratamiento.component';

describe('MascotasTratamientoComponent', () => {
  let component: MascotasTratamientoComponent;
  let fixture: ComponentFixture<MascotasTratamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MascotasTratamientoComponent]
    });
    fixture = TestBed.createComponent(MascotasTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
