import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/service/servicio.service';
import { TestimonioService } from 'src/app/service/testimonio.service';
import { DatePipe } from '@angular/common';
import { TestimonioCL } from 'src/app/model/testimonio-cl';

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
  testimonios: TestimonioCL[] = [];
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
    this.testimonioService.obtenerTestimonios().subscribe({
      next: (data: TestimonioCL[]) => {
        this.testimonios = data;
        this.isLoadingTestimonios = false;
      },
      error: (err) => {
        console.error('Error al cargar testimonios:', err);
        this.errorTestimonios = 'Error al cargar los testimonios';
        this.isLoadingTestimonios = false;
      }
    });
  }

  getRatingStars(testimonio: TestimonioCL): string {
    return '⭐'.repeat(testimonio.calificacion);
  }

  formatDate(testimonio: TestimonioCL): string {
    return this.datePipe.transform(testimonio.fecha, 'dd/MM/yyyy') || '';
  }

  reintentarCarga(): void {
    this.isLoadingTestimonios = true;
    this.errorTestimonios = '';
    this.cargarTestimonios();
  }
}