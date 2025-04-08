import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Mascota } from '../mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { ClienteCL } from 'src/app/model/cliente-cl';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent implements OnInit {
  @ViewChild('mascotaForm') mascotaForm!: NgForm;
  @Output() addMascotaEvent = new EventEmitter<Mascota>();

  formMascota: Mascota = {
    idMascota: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: '',
    fechaNacimiento: undefined,
    fechaIngreso: undefined,
    fechaSalida: undefined,
    estado: 1,
    clienteId: 0
  };

  editMode = false;

  clientes: ClienteCL[] = [];

  constructor(
    private mascotaService: MascotaService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.mascotaService.getMascota(+id).subscribe(mascota => {
        if (mascota) {
          this.formMascota = mascota;
        }
      });
    }
    this.clienteService.findAll().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  guardarMascota() {
    this.markAllAsTouched();
  
    if (this.mascotaForm.valid) {
      if (this.editMode) {
        this.mascotaService.editarMascota(this.formMascota.idMascota, this.formMascota)
          .subscribe(() => {
            this.router.navigate(['/mascotas']);
          });
      } else {
        const idCliente = this.formMascota.clienteId;
  
        if (idCliente) {
          this.mascotaService.agregarMascota(this.formMascota, idCliente)
            .subscribe(() => {
              this.router.navigate(['/mascotas']);
            });
        } else {
          console.error("ID del cliente no definido.");
        }
      }
    }
  }
  

  private markAllAsTouched() {
    Object.keys(this.mascotaForm.controls).forEach(field => {
      const control = this.mascotaForm.controls[field];
      control.markAsTouched();
    });
  }

  resetForm() {
    this.mascotaForm.resetForm({
      idMascota: 0,
      estado: 1,
      clienteId: 0,
      edad: null,
      peso: null
    });

    this.formMascota = {
      idMascota: 0,
      nombre: '',
      raza: '',
      edad: 0,
      peso: 0,
      enfermedad: '',
      foto: '',
      fechaNacimiento: undefined,
      fechaIngreso: undefined,
      fechaSalida: undefined,
      estado: 1,
      clienteId: 0
    };
  }
}
