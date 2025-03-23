import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../mascota';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent {
  mascotas: Mascota[] = [];
  //Evento
  @Output()
  addMascotaEvent = new EventEmitter<Mascota> (); 
  sendMascota! : Mascota;

  //modelo
    formMascota: Mascota = {
      idMascota: 0,
      nombre: '',
      raza: '',
      edad: 0,
      peso: 0,
      enfermedad: '',
      foto: '',
      fechaNacimiento: undefined,  // Puede ser opcional
      fechaIngreso: undefined,     // Puede ser opcional
      fechaSalida: undefined,      // Puede ser opcional
      estado: 1,                   
      clienteId: 0
    };
    
    clientes = [
      { id: 1, nombre: 'Juan Pérez' },
      { id: 2, nombre: 'María González' },
      { id: 3, nombre: 'Carlos Ramírez' }
    ];
    
  

  //Agregar Mascota a parit del formulario
  addMascotaForm() {
    console.log('Enviando mascota:', this.formMascota);
    this.sendMascota = { ...this.formMascota };
    this.addMascotaEvent.emit(this.sendMascota);
  }
  

  registrarMascota() {
    console.log('Mascota registrada:', this.formMascota);
  }
  
    // Método para agregar una mascota a la tabla
    agregarMascota(nuevaMascota: Mascota) {
      console.log('Mascota recibida:', nuevaMascota);
      this.mascotas.push(nuevaMascota);
    }
}
