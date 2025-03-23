import { Component, Input } from '@angular/core';
import { Mascota } from '../mascota';

@Component({
  selector: 'app-mascota-detail',
  templateUrl: './mascota-detail.component.html',
  styleUrls: ['./mascota-detail.component.css']
})
export class MascotaDetailComponent {
  //Hacer que llegue la Mascota desde componente padre al
  selectedMascota: Mascota | null = null; // Debe estar definida
  @Input() mascota!:Mascota; 
}
