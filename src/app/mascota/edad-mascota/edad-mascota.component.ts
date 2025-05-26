import { Component } from '@angular/core';

@Component({
  selector: 'app-edad-mascota',
  templateUrl: './edad-mascota.component.html',
  styleUrls: ['./edad-mascota.component.css']
})
export class EdadMascotaComponent {
  tipoMascota: string = 'perro';
  edadMascota: number = 0;
  edadHumana: number | null = null;

  calcularEdadHumana() {
    if (this.edadMascota <= 0) {
      this.edadHumana = null;
      return;
    }

    if (this.tipoMascota === 'perro') {
      this.edadHumana = this.edadMascota === 1 ? 15 :
                        this.edadMascota === 2 ? 24 :
                        24 + (this.edadMascota - 2) * 5;
    } else if (this.tipoMascota === 'gato') {
      this.edadHumana = this.edadMascota === 1 ? 15 :
                        this.edadMascota === 2 ? 24 :
                        24 + (this.edadMascota - 2) * 4;
    }
  }
}
