import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MedicamentoCL } from 'src/app/model/medicamento-cl';
import { ServicioCL } from 'src/app/model/servicio-cl';
import { TratamientoCL } from 'src/app/model/tratamiento-cl';
import { MascotaService } from 'src/app/service/mascota.service';
import { MedicamentoService } from 'src/app/service/medicamento.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';

@Component({
  selector: 'app-tratamiento-detail',
  templateUrl: './tratamiento-detail.component.html',
  styleUrls: ['./tratamiento-detail.component.css']
})
export class TratamientoDetailComponent implements OnInit {
  tratamiento!: TratamientoCL;
  servicio!: ServicioCL;
  mascota!: MascotaCL;
  medicamentos: MedicamentoCL[] = [];
  idTratamiento: number = 0;
  constructor(private tratamientoService: TratamientoService ,private servicioService: ServicioService, private mascotaservice:MascotaService, private medicamentoService:MedicamentoService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.idTratamiento = Number(this.route.snapshot.paramMap.get('id'));
    this.tratamientoService.getTratamiento(this.idTratamiento).subscribe({
      next: (tratamientodata) =>{
        this.tratamiento = tratamientodata; 
      },
      error: (err) =>{
        console.error('Error al obtener el tratamiento',err);
      }
    });
    this.servicioService.getServicioPorTratamiento(this.idTratamiento).subscribe({
      next: (serviciodata) => {
        this.servicio = serviciodata;
      },
      error: (err)  =>{
        console.error('Error al obtener el servicio', err);
      }
    });

    this.mascotaservice.getMascotaPorTratamiento(this.idTratamiento).subscribe({
      next: (mascotadata) =>{
        this.mascota = mascotadata;
      },
      error: (err) =>{
        console.error('Error al obtener la mascota',err);
      }
    });

    this.medicamentoService.getPorTratamiento(this.idTratamiento).subscribe({
      next: (medicamentodata) =>{
        this.medicamentos = medicamentodata;
      },
      error: (err) =>{
        console.error('Error al obtener los medicamentos', err)
      }
    });
  }
}
