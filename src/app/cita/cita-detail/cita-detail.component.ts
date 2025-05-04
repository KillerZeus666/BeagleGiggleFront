import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitaCL } from 'src/app/model/cita-cl';
import { CitaService } from 'src/app/service/cita.service';

@Component({
  selector: 'app-cita-detail',
  templateUrl: './cita-detail.component.html',
  styleUrls: ['./cita-detail.component.css']
})
export class CitaDetailComponent implements OnInit{
  cita!: CitaCL;

  constructor(private citaService: CitaService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const idCitas = Number(this.route.snapshot.paramMap.get('id'));
    this.citaService.obtenerCitaPorId(idCitas).subscribe({
      next: (citadata) =>{
        console.log('Datos recibidos del backend:', citadata);
        this.cita = citadata;
      },
      error :(err) =>{
        console.error('Error al obtener la cita', err);
      }
    });
  }

  volver(){
    
  };
}
