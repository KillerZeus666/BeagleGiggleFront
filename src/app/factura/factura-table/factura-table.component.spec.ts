import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaTableComponent } from './factura-table.component';

describe('FacturaTableComponent', () => {
  let component: FacturaTableComponent;
  let fixture: ComponentFixture<FacturaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturaTableComponent]
    });
    fixture = TestBed.createComponent(FacturaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
