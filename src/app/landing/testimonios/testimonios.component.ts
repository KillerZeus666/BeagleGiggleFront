import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TestimonioCL } from 'src/app/model/testimonio-cl';
import { TestimonioService } from 'src/app/service/testimonio.service';

@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})
export class TestimoniosComponent implements OnInit {
  testimonios: TestimonioCL[] = [];
  isLoadingTestimonios = true;
  errorTestimonios = '';

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  constructor(private testimonioService: TestimonioService) {}

  ngOnInit(): void {
    this.cargarTestimonios();
  }

  cargarTestimonios(): void {
    this.testimonioService.obtenerTestimonios().subscribe({
      next: (data: TestimonioCL[]) => {
        this.testimonios = data;
        this.isLoadingTestimonios = false;
        setTimeout(() => this.checkScroll(), 100);
      },
      error: (err) => {
        console.error('Error al cargar testimonios:', err);
        this.errorTestimonios = 'Error al cargar los testimonios';
        this.isLoadingTestimonios = false;
      }
    });
  }

  reintentarCarga(): void {
    this.errorTestimonios = '';
    this.isLoadingTestimonios = true;
    this.cargarTestimonios();
  }

  checkScroll(): void {
    const windowHeight = window.innerHeight;

    this.sections?.forEach(section => {
      const sectionElement = section.nativeElement;
      const sectionTop = sectionElement.getBoundingClientRect().top;

      if (sectionTop < windowHeight * 0.75) {
        sectionElement.classList.add('in-view');
      }
    });
  }

  getRatingStars(calificacion: number): string {
    return '★'.repeat(calificacion) + '☆'.repeat(5 - calificacion);
  }

  formatDate(fecha: Date | string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}
