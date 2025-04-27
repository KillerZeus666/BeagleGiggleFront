import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/service/servicio.service';
import { ServicioCL } from 'src/app/model/servicio-cl';

@Component({
  selector: 'app-servicio-table',
  templateUrl: './servicio-table.component.html',
  styleUrls: ['./servicio-table.component.css']
})
export class ServicioTableComponent implements OnInit {
  servicios: ServicioCL[] = [];

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.servicioService.findAll().subscribe({
      next: (servicios: ServicioCL[]) => {
        this.servicios = servicios.sort((a, b) => a.idServicio - b.idServicio); // <- Aquí ordenamos
      },
      error: (err) => {
        console.error('Error al cargar los servicios', err);
      }
    });
  }
}
