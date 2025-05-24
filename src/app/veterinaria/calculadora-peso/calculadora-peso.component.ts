import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora-peso',
  templateUrl: './calculadora-peso.component.html',
  styleUrls: ['./calculadora-peso.component.css']
})
export class CalculadoraPesoComponent {
  especie = 'perro';
  raza = '';
  edad = 0;
  peso = 0;
  resultado = '';

  calcularPesoIdeal() {
    if (this.edad <= 0 || this.peso <= 0) {
      this.resultado = 'Por favor, completa todos los campos con datos válidos.';
      return;
    }

    let pesoIdealMin = 0;
    let pesoIdealMax = 0;

    if (this.especie === 'perro') {
      pesoIdealMin = this.edad * 2;
      pesoIdealMax = this.edad * 3;
    } else if (this.especie === 'gato') {
      pesoIdealMin = 3;
      pesoIdealMax = 5;
    }

    if (this.peso < pesoIdealMin) {
      this.resultado = 'Tu mascota podría estar por debajo de su peso ideal. 🐾 ¡Consulta a tu veterinario!';
    } else if (this.peso > pesoIdealMax) {
      this.resultado = 'Tu mascota podría tener sobrepeso. 💡 Considera una dieta o más actividad física.';
    } else {
      this.resultado = '¡Tu mascota está en su peso ideal! 🎉';
    }
  }
}
