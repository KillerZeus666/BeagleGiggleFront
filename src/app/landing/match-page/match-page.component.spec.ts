import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPageComponent } from './match-page.component';

describe('MatchPageComponent', () => {
  let component: MatchPageComponent;
  let fixture: ComponentFixture<MatchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchPageComponent]
    });
    fixture = TestBed.createComponent(MatchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
