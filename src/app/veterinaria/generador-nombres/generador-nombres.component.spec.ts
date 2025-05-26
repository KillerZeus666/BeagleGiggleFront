import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneradorNombresComponent } from './generador-nombres.component';

describe('GeneradorNombresComponent', () => {
  let component: GeneradorNombresComponent;
  let fixture: ComponentFixture<GeneradorNombresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneradorNombresComponent]
    });
    fixture = TestBed.createComponent(GeneradorNombresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
