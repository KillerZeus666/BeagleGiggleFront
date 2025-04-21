import { Component } from '@angular/core';

@Component({
  selector: 'app-calcular-edad',
  templateUrl: './calcular-edad.component.html',
  styleUrls: ['./calcular-edad.component.css']
})
export class CalcularEdadComponent {
  imagenes: string[] = [
    'assets/imagenes/perro1.jpg',
    'assets/imagenes/perro2.jpg',
    'assets/imagenes/perro3.jpg',
    'assets/imagenes/perro4.jpg',
    'assets/imagenes/perro5.jpg',
    'assets/imagenes/perro6.jpg'
  ];

  edadMascota: number = 0;
  edadHumana: number | null = null;

  toggleGaleria(): void {
    // Alterna entre mostrar 4 imágenes o todas
    if (this.imagenes.length > 4) {
      this.imagenes = this.imagenes.slice(0, 4);
    } else {
      this.imagenes = [
        'assets/imagenes/perro1.jpg',
        'assets/imagenes/perro2.jpg',
        'assets/imagenes/perro3.jpg',
        'assets/imagenes/perro4.jpg',
        'assets/imagenes/perro5.jpg',
        'assets/imagenes/perro6.jpg'
      ];
    }
  }

  calcularEdadHumana(): void {
    if (this.edadMascota && this.edadMascota > 0) {
      this.edadHumana = this.edadMascota * 7; // Suponiendo multiplicar por 7 como conversión básica
    } else {
      this.edadHumana = null;
    }
  }
}
