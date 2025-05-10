import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaDetailComponent } from './factura-detail.component';

describe('FacturaDetailComponent', () => {
  let component: FacturaDetailComponent;
  let fixture: ComponentFixture<FacturaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturaDetailComponent]
    });
    fixture = TestBed.createComponent(FacturaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
