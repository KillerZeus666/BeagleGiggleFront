import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioCL } from 'src/app/model/servicio-cl';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-servicio-table',
  templateUrl: './servicio-table.component.html',
  styleUrls: ['./servicio-table.component.css']
})
export class ServicioTableComponent implements OnInit {
  servicios: ServicioCL[] = [];

  constructor(
    private servicioService: ServicioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.servicioService.findAll().subscribe({
      next: (servicios: ServicioCL[]) => {
        this.servicios = servicios;
      },
      error: (err) => {
        console.error('Error al cargar los servicios', err);
      }
    });
  }
}
