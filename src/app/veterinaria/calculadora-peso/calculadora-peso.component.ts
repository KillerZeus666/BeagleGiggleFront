import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora-peso',
  templateUrl: './calculadora-peso.component.html',
  styleUrls: ['./calculadora-peso.component.css']
})
export class CalculadoraPesoComponent {
  pesoActual: number = 0;
especie: string = '';
tamano: string = '';
mensaje: string = '';
imagenResultado: string = '';

calcularPesoIdeal() {
  let pesoIdealMin = 0;
  let pesoIdealMax = 0;

  if (this.especie === 'perro') {
    if (this.tamano === 'pequeño') [pesoIdealMin, pesoIdealMax] = [3, 7];
    else if (this.tamano === 'mediano') [pesoIdealMin, pesoIdealMax] = [10, 20];
    else if (this.tamano === 'grande') [pesoIdealMin, pesoIdealMax] = [25, 40];
  } else if (this.especie === 'gato') {
    [pesoIdealMin, pesoIdealMax] = [3, 6];
  }

  if (this.pesoActual < pesoIdealMin) {
    this.mensaje = 'Tu mascota está por debajo del peso ideal.';
    this.imagenResultado = 'https://cdn-icons-png.flaticon.com/512/616/616408.png';
  } else if (this.pesoActual > pesoIdealMax) {
    this.mensaje = 'Tu mascota tiene sobrepeso.';
    this.imagenResultado = 'https://cdn-icons-png.flaticon.com/512/616/616408.png';
  } else {
    this.mensaje = '¡Tu mascota está en su peso ideal!';
    this.imagenResultado = 'https://cdn-icons-png.flaticon.com/512/616/616408.png';
  }
}

}
