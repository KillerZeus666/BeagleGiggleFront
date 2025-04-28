import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { ServicioCL } from 'src/app/model/servicio-cl';
import { TratamientoCL } from 'src/app/model/tratamiento-cl';
import { MascotaService } from 'src/app/service/mascota.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-historial-tratamientos',
  templateUrl: './historial-tratamientos.component.html',
  styleUrls: ['./historial-tratamientos.component.css']
})
export class HistorialTratamientosComponent implements OnInit {
  tratamientos: TratamientoCL[] = [];
  idVeterinario:number = 0;
  mascota!: MascotaCL;
  servicio!: ServicioCL;
  constructor(private route: ActivatedRoute, private router:Router, private veterinarioService:VeterinarioService, private mascotaService: MascotaService, private servicioService: ServicioService ){}
  
  ngOnInit(): void {
    this.idVeterinario = Number(this.route.snapshot.paramMap.get('id'));
  
    this.veterinarioService.getAllTratamientosVeterinario(this.idVeterinario).subscribe({
      next: (data) => {
        this.tratamientos = data;
        if (this.tratamientos.length > 0) {
          const idTratamiento = this.tratamientos[0].idTratamiento; // ejemplo: tomamos el primer tratamiento
          this.mascotaService.getMascotaPorTratamiento(idTratamiento).subscribe({
            next: (mascotaData) => {
              this.mascota = mascotaData;
            },
            error: (err) => {
              console.error('Error al obtener la mascota', err);
            }
          });
          
          this.servicioService.getServicioPorTratamiento(idTratamiento).subscribe({
            next: (serviciodata) => {
              this.servicio = serviciodata;
            },
            error: (err) => {
              console.error('Error al obtener el servicio');
            }
          })
        }
      },
      error: (err) => {
        console.error('Error al obtener los tratamientos', err);
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
