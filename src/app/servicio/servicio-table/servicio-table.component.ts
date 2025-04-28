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
  precioFiltro: number = 0; // precio mínimo para filtrar
serviciosOriginales: ServicioCL[] = []; // para guardar los servicios completos sin filtro

opcionOrdenamiento: string = 'id'; // Inicialmente ordenamos por ID

ordenarServicios(): void {
  if (this.opcionOrdenamiento === 'id') {
    this.servicios.sort((a, b) => a.idServicio - b.idServicio);
  } else if (this.opcionOrdenamiento === 'precioAsc') {
    this.servicios.sort((a, b) => a.precioBase - b.precioBase);
  } else if (this.opcionOrdenamiento === 'precioDesc') {
    this.servicios.sort((a, b) => b.precioBase - a.precioBase);
  }
}

}
