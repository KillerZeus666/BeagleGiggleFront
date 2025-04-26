import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioPageComponent } from './veterinario-page.component';

describe('VeterinarioPageComponent', () => {
  let component: VeterinarioPageComponent;
  let fixture: ComponentFixture<VeterinarioPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioPageComponent]
    });
    fixture = TestBed.createComponent(VeterinarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
