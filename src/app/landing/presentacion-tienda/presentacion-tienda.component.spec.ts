import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionTiendaComponent } from './presentacion-tienda.component';

describe('PresentacionTiendaComponent', () => {
  let component: PresentacionTiendaComponent;
  let fixture: ComponentFixture<PresentacionTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentacionTiendaComponent]
    });
    fixture = TestBed.createComponent(PresentacionTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
