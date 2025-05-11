import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesDestacadosComponent } from './clientes-destacados.component';

describe('ClientesDestacadosComponent', () => {
  let component: ClientesDestacadosComponent;
  let fixture: ComponentFixture<ClientesDestacadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesDestacadosComponent]
    });
    fixture = TestBed.createComponent(ClientesDestacadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
