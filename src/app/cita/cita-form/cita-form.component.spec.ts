import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaFormComponent } from './cita-form.component';

describe('CitaFormComponent', () => {
  let component: CitaFormComponent;
  let fixture: ComponentFixture<CitaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitaFormComponent]
    });
    fixture = TestBed.createComponent(CitaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
