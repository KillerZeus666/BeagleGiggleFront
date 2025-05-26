import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuletaPremiosComponent } from './ruleta-premios.component';

describe('RuletaPremiosComponent', () => {
  let component: RuletaPremiosComponent;
  let fixture: ComponentFixture<RuletaPremiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuletaPremiosComponent]
    });
    fixture = TestBed.createComponent(RuletaPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
