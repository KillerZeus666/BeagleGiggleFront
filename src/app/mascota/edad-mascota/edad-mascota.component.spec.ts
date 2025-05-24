import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdadMascotaComponent } from './edad-mascota.component';

describe('EdadMascotaComponent', () => {
  let component: EdadMascotaComponent;
  let fixture: ComponentFixture<EdadMascotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdadMascotaComponent]
    });
    fixture = TestBed.createComponent(EdadMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
