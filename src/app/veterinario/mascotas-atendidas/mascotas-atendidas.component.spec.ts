import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasAtendidasComponent } from './mascotas-atendidas.component';

describe('MascotasAtendidasComponent', () => {
  let component: MascotasAtendidasComponent;
  let fixture: ComponentFixture<MascotasAtendidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MascotasAtendidasComponent]
    });
    fixture = TestBed.createComponent(MascotasAtendidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
