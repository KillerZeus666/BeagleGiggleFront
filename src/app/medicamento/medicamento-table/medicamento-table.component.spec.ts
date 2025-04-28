import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoTableComponent } from './medicamento-table.component';

describe('MedicamentoTableComponent', () => {
  let component: MedicamentoTableComponent;
  let fixture: ComponentFixture<MedicamentoTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentoTableComponent]
    });
    fixture = TestBed.createComponent(MedicamentoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
