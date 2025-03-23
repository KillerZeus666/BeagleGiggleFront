import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../mascota';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent {
  //Evento
  @Output()
  addMascotaEvent = new EventEmitter<Mascota> (); 
  //modelo
  formMascota: Mascota = {
      idMascota: 0,
      nombre: '',
      raza: '',
      edad: 0,
      peso: 0,
      enfermedad: '',
      foto: '',
      clienteId: 0
    };

    clientes = [
      { id: 1, nombre: 'Juan Pérez' },
      { id: 2, nombre: 'María González' },
      { id: 3, nombre: 'Carlos Ramírez' }
    ];
    
  

  //Agregar Mascota a parit del formulario
  addMascotaForm(form:any){
    console.log(this.formMascota);
    //para copiar
    //this.sendMascota = Object.assign({}, this.formMascota); 

    this.addMascotaEvent.emit(this.formMascota); 
  }

  registrarMascota() {
    console.log('Mascota registrada:', this.formMascota);
  }
  
}
