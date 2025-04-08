import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteTableComponent } from './cliente-table.component';

describe('ClienteTableComponent', () => {
  let component: ClienteTableComponent;
  let fixture: ComponentFixture<ClienteTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteTableComponent]
    });
    fixture = TestBed.createComponent(ClienteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
