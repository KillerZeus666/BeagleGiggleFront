import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/service/servicio.service';
import { TestimonioService } from 'src/app/service/testimonio.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [DatePipe]
})
export class LandingComponent implements OnInit {
  servicios: any[] = [];
  isLoading = true;
  errorMessage = '';
  testimonios: any[] = [];
  isLoadingTestimonios = true;
  errorTestimonios = '';
  constructor(private servicioService: ServicioService, private testimonioService: TestimonioService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.cargarServicios();
    this.cargarTestimonios();
  }

  cargarServicios(): void {
    this.servicioService.obtenerServicios().subscribe({
      next: (data) => {
        this.servicios = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
        this.errorMessage = 'Error al cargar los servicios';
        this.isLoading = false;
      }
    });
  }

  cargarTestimonios(): void {
    console.log('Iniciando carga de testimonios...');
    this.testimonioService.obtenerTestimonios().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // Agrega este log
        this.testimonios = data.map(t => ({
          ...t,
          rating: this.generarRating(t.calificacion),
          fechaFormateada: this.formatearFecha(t.fecha)
        }));
        this.isLoadingTestimonios = false;
      },
      error: (err) => {
        console.error('Error al cargar testimonios:', err);
        this.errorTestimonios = 'Error al cargar los testimonios';
        this.isLoadingTestimonios = false;
      },
      complete: () => {
        console.log('Carga de testimonios completada');
      }
    });
  }

  private generarRating(calificacion: number): string {
    return '⭐'.repeat(calificacion);
  }

  private formatearFecha(fecha: string): string {
    return this.datePipe.transform(fecha, 'dd/MM/yyyy') || '';
  }

  reintentarCarga(): void {
    this.isLoadingTestimonios = true;
    this.errorTestimonios = '';
    this.cargarTestimonios();
  }
}