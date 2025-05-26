import { Component } from '@angular/core';

@Component({
  selector: 'app-generador-nombres',
  templateUrl: './generador-nombres.component.html',
  styleUrls: ['./generador-nombres.component.css']
})
export class GeneradorNombresComponent {
    generoMascota: 'macho' | 'hembra' | null = null;
    nombreGenerado: string | null = null;

    nombresMacho: string[] = ['Max', 'Rocky', 'Toby', 'Simba', 'Thor', 'Coco', 'Leo', 'Duke'];
    nombresHembra: string[] = ['Luna', 'Nala', 'Maya', 'Bella', 'Kiara', 'Daisy', 'Lola', 'Canela'];

    generarNombre() {
      if (!this.generoMascota) {
        alert('Por favor selecciona si tu mascota es macho o hembra.');
        return;
      }

      const lista = this.generoMascota === 'macho' ? this.nombresMacho : this.nombresHembra;
      const nombre = lista[Math.floor(Math.random() * lista.length)];
      this.nombreGenerado = nombre;
    }

}
