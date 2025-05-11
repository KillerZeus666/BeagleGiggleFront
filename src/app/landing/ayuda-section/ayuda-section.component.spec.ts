import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaSectionComponent } from './ayuda-section.component';

describe('AyudaSectionComponent', () => {
  let component: AyudaSectionComponent;
  let fixture: ComponentFixture<AyudaSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AyudaSectionComponent]
    });
    fixture = TestBed.createComponent(AyudaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
