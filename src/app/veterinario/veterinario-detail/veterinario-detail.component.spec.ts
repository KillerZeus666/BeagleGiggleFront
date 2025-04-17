import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioDetailComponent } from './veterinario-detail.component';

describe('VeterinarioDetailComponent', () => {
  let component: VeterinarioDetailComponent;
  let fixture: ComponentFixture<VeterinarioDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioDetailComponent]
    });
    fixture = TestBed.createComponent(VeterinarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
