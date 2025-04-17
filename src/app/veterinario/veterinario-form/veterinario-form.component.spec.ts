import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioFormComponent } from './veterinario-form.component';

describe('VeterinarioFormComponent', () => {
  let component: VeterinarioFormComponent;
  let fixture: ComponentFixture<VeterinarioFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioFormComponent]
    });
    fixture = TestBed.createComponent(VeterinarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
