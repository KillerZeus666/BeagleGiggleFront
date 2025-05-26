import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimoniosDetailComponent } from './testimonios-detail.component';

describe('TestimoniosDetailComponent', () => {
  let component: TestimoniosDetailComponent;
  let fixture: ComponentFixture<TestimoniosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimoniosDetailComponent]
    });
    fixture = TestBed.createComponent(TestimoniosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
