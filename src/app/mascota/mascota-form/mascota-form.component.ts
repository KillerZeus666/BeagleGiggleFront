import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Mascota } from '../mascota';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent {
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

  clientes = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María González' },
    { id: 3, nombre: 'Carlos Ramírez' }
  ];

  addMascotaForm() {
    // Marcar todos los campos como touched para mostrar errores
    this.markAllAsTouched();
    
    if (this.mascotaForm.valid) {
      // Validación adicional para valores numéricos
      if (this.formMascota.edad <= 0 || this.formMascota.peso <= 0) {
        return;
      }

      this.addMascotaEvent.emit({...this.formMascota});
      this.resetForm();
    }
  }

  private markAllAsTouched() {
    Object.keys(this.mascotaForm.controls).forEach(field => {
      const control = this.mascotaForm.controls[field];
      control.markAsTouched();
    });
  }

  resetForm() {
    // Resetear el formulario y su estado
    this.mascotaForm.resetForm({
      idMascota: 0,
      estado: 1,
      clienteId: 0,
      edad: null,
      peso: null
    });
    
    // Resetear el modelo
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