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
  
        // Para cada tratamiento, buscar su mascota y servicio
        this.tratamientos.forEach(tratamiento => {
          this.mascotaService.getMascotaPorTratamiento(tratamiento.idTratamiento).subscribe({
            next: (mascotaData) => {
              tratamiento.mascota = mascotaData;
            },
            error: (err) => {
              console.error(`Error al obtener la mascota del tratamiento ${tratamiento.idTratamiento}`, err);
            }
          });
  
          this.servicioService.getServicioPorTratamiento(tratamiento.idTratamiento).subscribe({
            next: (servicioData) => {
              tratamiento.servicio = servicioData;
            },
            error: (err) => {
              console.error(`Error al obtener el servicio del tratamiento ${tratamiento.idTratamiento}`, err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Error al obtener los tratamientos', err);
      }
    });
  }
  

  navegarAgregarTratamiento() {
    const id = this.route.snapshot.paramMap.get('id'); // o donde tengas el id
    this.router.navigate(['/crear-tratamiento'], { state: { id: id } });
  }

  mostrarDetallesTratamiento(idTratamiento:number){
    this.router.navigate(['/detalles-tratamiento', idTratamiento]);
  }

  eliminarTratamiento(idTratamiento:number){

  }

  editarTratamiento(idTratamiento:number){

  }
}
