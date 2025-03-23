import { Component } from '@angular/core';
import { Mascota } from '../mascota';
import { MascotaDetailComponent } from '../mascota-detail/mascota-detail.component';



@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css']
})

export class MascotaTableComponent {
  mascotaList: Mascota[] = [
    {
      idMascota: 1,
      nombre: "Rex",
      raza: "Pastor Alemán",
      edad: 4,
      peso: 30.5,
      enfermedad: "Ninguna",
      foto: "https://upload.wikimedia.org/wikipedia/commons/9/94/Cane_da_pastore_tedesco_adulto.jpg",
      fechaNacimiento: new Date("2020-03-10"),
      fechaIngreso: new Date("2023-08-15"),
      fechaSalida: new Date("2023-08-25"),
      estado: 1,
      clienteId: 101
    },
    {
      idMascota: 2,
      nombre: "Michi",
      raza: "Siames",
      edad: 3,
      peso: 4.2,
      enfermedad: "Alergia",
      foto: "https://picartpetcare.com/wp-content/uploads/2021/01/gato-siames.jpg",
      fechaNacimiento: new Date("2021-08-22"),
      fechaIngreso: new Date("2023-07-01"),
      fechaSalida: new Date("2023-07-15"),
      estado: 1,
      clienteId: 102
    },
    {
      idMascota: 3,
      nombre: "Firulais",
      raza: "Labrador Retriever",
      edad: 5,
      peso: 28.0,
      enfermedad: "Ninguna",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeaLlmNmIUsSC1KxgyDD37sF1M6PCDWEzjGw&s",
      fechaNacimiento: new Date("2019-06-15"),
      fechaIngreso: new Date("2023-06-10"),
      fechaSalida: new Date("2023-06-25"),
      estado: 1,
      clienteId: 103
    }
  ];
}


