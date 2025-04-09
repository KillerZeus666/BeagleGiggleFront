import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMascotasClienteComponent } from './ver-mascotas-cliente.component';

describe('VerMascotasClienteComponent', () => {
  let component: VerMascotasClienteComponent;
  let fixture: ComponentFixture<VerMascotasClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerMascotasClienteComponent]
    });
    fixture = TestBed.createComponent(VerMascotasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
