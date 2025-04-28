import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { TratamientoCL } from 'src/app/model/tratamiento-cl';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-historial-tratamientos',
  templateUrl: './historial-tratamientos.component.html',
  styleUrls: ['./historial-tratamientos.component.css']
})
export class HistorialTratamientosComponent implements OnInit {
  tratamientos: TratamientoCL[] = [];

  constructor(private route: ActivatedRoute, private router:Router, private veterinarioService:VeterinarioService ){}
  ngOnInit(): void {
      const idVeterinario = Number(this.route.snapshot.paramMap.get('id'));
      this.veterinarioService.getAllTratamientosVeterinario(idVeterinario).subscribe({
        next: (data) =>{
          this.tratamientos = data;
        },
        error: (err) => {
          console.error('Error al obtener las tratamientos', err)
        }
      });
  }

  agregarTratamiento(){

  }

  mostrarDetallesTratamiento(idTratamiento:number){

  }

  eliminarTratamiento(idTratamiento:number){

  }

  editarTratamiento(idTratamiento:number){

  }
}
