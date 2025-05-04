import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaDetailComponent } from './cita-detail.component';

describe('CitaDetailComponent', () => {
  let component: CitaDetailComponent;
  let fixture: ComponentFixture<CitaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitaDetailComponent]
    });
    fixture = TestBed.createComponent(CitaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
