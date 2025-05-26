import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSaludMascotaComponent } from './test-salud-mascota.component';

describe('TestSaludMascotaComponent', () => {
  let component: TestSaludMascotaComponent;
  let fixture: ComponentFixture<TestSaludMascotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestSaludMascotaComponent]
    });
    fixture = TestBed.createComponent(TestSaludMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
