import {
  Component,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteCL } from 'src/app/model/cliente-cl';
import { ClienteService } from 'src/app/service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  @ViewChild('clienteForm') clienteForm!: NgForm;
  @Output() addClienteEvent = new EventEmitter<ClienteCL>();
  Formcliente: ClienteCL = new ClienteCL();

  editMode = false;
  confirmPassword: string = '';

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.clienteService.getCliente(+id).subscribe((cliente) => {
        if (cliente) {
          this.Formcliente = cliente;
          this.confirmPassword = cliente.contrasena;
        }
      });
    } else {
      this.editMode = false;
      this.confirmPassword = '';
    }
  }

  guardarCliente() {
    this.markAllAsTouched();

    if (this.clienteForm.valid) {
      if (this.Formcliente.contrasena !== this.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      if (this.editMode) {
        this.clienteService
          .actualizarCliente(this.Formcliente.idCliente, this.Formcliente)
          .subscribe(() => {
            this.router.navigate(['/clientes']);
          });
      } else {
        this.clienteService.agregarCliente(this.Formcliente.toBackendFormat(), this.confirmPassword).subscribe(
          (response) => {
            console.log('Cliente creado', response);
            this.router.navigate(['/clientes']);
          },
          (error) => {
            console.error('Error al crear cliente', error);
            alert('Error: ' + error.error);
          }
        );
      }
    }
  }

  markAllAsTouched() {
    if (this.clienteForm && this.clienteForm.controls) {
      Object.values(this.clienteForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}