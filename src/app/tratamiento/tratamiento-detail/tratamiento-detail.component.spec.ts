import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoDetailComponent } from './tratamiento-detail.component';

describe('TratamientoDetailComponent', () => {
  let component: TratamientoDetailComponent;
  let fixture: ComponentFixture<TratamientoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TratamientoDetailComponent]
    });
    fixture = TestBed.createComponent(TratamientoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
