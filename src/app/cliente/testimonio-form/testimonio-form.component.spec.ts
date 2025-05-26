import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonioFormComponent } from './testimonio-form.component';

describe('TestimonioComponent', () => {
  let component: TestimonioFormComponent;
  let fixture: ComponentFixture<TestimonioFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonioFormComponent]
    });
    fixture = TestBed.createComponent(TestimonioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
