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


  //Inyectas dependencias
  constructor(){}
  
  //Se llama una unica vez cuando el componente se renderiza en Pantalla
  ngOnInit():void{
    console.log("ngOnInit de detail"); 
    //Llamar una api
  }
  ngOnChanges():void{
    console.log("ngOnChanges de detail"); 
  }

}
