import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioTableComponent } from './veterinario-table.component';

describe('VeterinarioTableComponent', () => {
  let component: VeterinarioTableComponent;
  let fixture: ComponentFixture<VeterinarioTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioTableComponent]
    });
    fixture = TestBed.createComponent(VeterinarioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
