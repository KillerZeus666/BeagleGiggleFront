import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartasAdministradorComponent } from './cartas-administrador.component';

describe('CartasAdministradorComponent', () => {
  let component: CartasAdministradorComponent;
  let fixture: ComponentFixture<CartasAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartasAdministradorComponent]
    });
    fixture = TestBed.createComponent(CartasAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
