import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsPageComponent } from './errors-page.component';

describe('ErrorsPageComponent', () => {
  let component: ErrorsPageComponent;
  let fixture: ComponentFixture<ErrorsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorsPageComponent]
    });
    fixture = TestBed.createComponent(ErrorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
