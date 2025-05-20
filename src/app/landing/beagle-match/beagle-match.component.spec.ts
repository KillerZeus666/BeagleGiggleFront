import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeagleMatchComponent } from './beagle-match.component';

describe('BeagleMatchComponent', () => {
  let component: BeagleMatchComponent;
  let fixture: ComponentFixture<BeagleMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeagleMatchComponent]
    });
    fixture = TestBed.createComponent(BeagleMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
