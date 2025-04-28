import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoTableComponent } from './tratamiento-table.component';

describe('TratamientoTableComponent', () => {
  let component: TratamientoTableComponent;
  let fixture: ComponentFixture<TratamientoTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TratamientoTableComponent]
    });
    fixture = TestBed.createComponent(TratamientoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
