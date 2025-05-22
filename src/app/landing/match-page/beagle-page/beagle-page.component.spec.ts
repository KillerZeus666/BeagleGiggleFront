import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaglePageComponent } from './beagle-page.component';

describe('BeaglePageComponent', () => {
  let component: BeaglePageComponent;
  let fixture: ComponentFixture<BeaglePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeaglePageComponent]
    });
    fixture = TestBed.createComponent(BeaglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
