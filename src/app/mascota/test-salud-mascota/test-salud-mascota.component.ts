import { Component } from '@angular/core';
@Component({
  selector: 'app-test-salud-mascota',
  templateUrl: './test-salud-mascota.component.html',
  styleUrls: ['./test-salud-mascota.component.css']
})
export class TestSaludMascotaComponent {
  preguntas = [
    { texto: '¿Tu mascota ha comido normalmente en los últimos días?', respuesta: null, alertaSi: 'no' },
    { texto: '¿Ha tenido vómitos o diarrea?', respuesta: null, alertaSi: 'si' },
    { texto: '¿Está más cansada o menos activa de lo normal?', respuesta: null, alertaSi: 'si' },
    { texto: '¿Tiene tos, estornudos o secreción nasal?', respuesta: null, alertaSi: 'si' },
    { texto: '¿Ha perdido peso recientemente?', respuesta: null, alertaSi: 'si' }
  ];

  resultado: string | null = null;

  calcularResultado() {
    const respuestasDeAlerta = this.preguntas.filter(p => p.respuesta === p.alertaSi).length;

    if (respuestasDeAlerta >= 3) {
      this.resultado = 'Te recomendamos agendar una cita con el veterinario lo antes posible.';
    } else if (respuestasDeAlerta === 2) {
      this.resultado = 'Observa a tu mascota y considera una revisión si los síntomas persisten.';
    } else {
      this.resultado = '¡Tu mascota parece estar en buen estado de salud!';
    }
  }

  reiniciar() {
    this.preguntas.forEach(p => p.respuesta = null);
    this.resultado = null;
  }
}
