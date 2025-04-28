import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioTableComponent } from './servicio-table.component';

describe('ServicioTableComponent', () => {
  let component: ServicioTableComponent;
  let fixture: ComponentFixture<ServicioTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicioTableComponent]
    });
    fixture = TestBed.createComponent(ServicioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
