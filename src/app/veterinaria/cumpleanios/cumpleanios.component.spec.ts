import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumpleaniosComponent } from './cumpleanios.component';

describe('CumpleaniosComponent', () => {
  let component: CumpleaniosComponent;
  let fixture: ComponentFixture<CumpleaniosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CumpleaniosComponent]
    });
    fixture = TestBed.createComponent(CumpleaniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
