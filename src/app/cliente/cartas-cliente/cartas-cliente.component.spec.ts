import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartasClienteComponent } from './cartas-cliente.component';

describe('CartasClienteComponent', () => {
  let component: CartasClienteComponent;
  let fixture: ComponentFixture<CartasClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartasClienteComponent]
    });
    fixture = TestBed.createComponent(CartasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
