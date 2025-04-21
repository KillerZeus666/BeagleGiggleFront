import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePaginaPrincipalComponent } from './cliente-pagina-principal.component';

describe('ClientePaginaPrincipalComponent', () => {
  let component: ClientePaginaPrincipalComponent;
  let fixture: ComponentFixture<ClientePaginaPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientePaginaPrincipalComponent]
    });
    fixture = TestBed.createComponent(ClientePaginaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
