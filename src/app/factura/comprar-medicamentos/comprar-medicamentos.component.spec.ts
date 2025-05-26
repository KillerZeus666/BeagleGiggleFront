import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarMedicamentosComponent } from './comprar-medicamentos.component';

describe('ComprarMedicamentosComponent', () => {
  let component: ComprarMedicamentosComponent;
  let fixture: ComponentFixture<ComprarMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComprarMedicamentosComponent]
    });
    fixture = TestBed.createComponent(ComprarMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
