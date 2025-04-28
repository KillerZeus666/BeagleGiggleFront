import { Component, OnInit } from '@angular/core';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { TratamientoCL } from 'src/app/model/tratamiento-cl';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-tratamiento-table',
  templateUrl: './tratamiento-table.component.html',
  styleUrls: ['./tratamiento-table.component.css']
})
export class TratamientoTableComponent {
  tratamientos: TratamientoCL[] = [];
  
  constructor(
    private tratamientoService: TratamientoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  
  ngOnInit(): void {
    const idVeterinario = Number(this.route.snapshot.paramMap.get('id'));
    console.log('idVeterinario recibido:', idVeterinario); // 👈
  
    this.tratamientoService.getTratamientosPorVeterinario(idVeterinario).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // 👈
        this.tratamientos = data;
      },
      error: (err) => {
        console.error('Error al obtener las mascotas', err);
      }
    });
  }
  


}


