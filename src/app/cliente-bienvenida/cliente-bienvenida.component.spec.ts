import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteBienvenidaComponent } from './cliente-bienvenida.component';

describe('ClienteBienvenidaComponent', () => {
  let component: ClienteBienvenidaComponent;
  let fixture: ComponentFixture<ClienteBienvenidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteBienvenidaComponent]
    });
    fixture = TestBed.createComponent(ClienteBienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
