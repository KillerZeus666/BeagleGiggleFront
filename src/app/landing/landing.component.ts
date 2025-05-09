import { Component, OnInit, HostListener, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ServicioService } from 'src/app/service/servicio.service';
import { TestimonioService } from 'src/app/service/testimonio.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TestimonioCL } from 'src/app/model/testimonio-cl';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [DatePipe]
})
export class LandingComponent implements OnInit, AfterViewInit {
  servicios: any[] = [];
  isLoading = true;
  errorMessage = '';
  testimonios: TestimonioCL[] = [];
  isLoadingTestimonios = true;
  errorTestimonios = '';

  // Variables para el carrusel
  currentSlide = 0;
  carouselItems = [
    {
      title: "Bienvenido a Nuestra Plataforma",
      description: "Descubre un espacio diseñado para brindarte los mejores servicios en salud y bienestar.",
      background: "url('https://i.postimg.cc/KYgCr3Td/pexels-lum3n-44775-406014.jpg')"
    },
    {
      title: "Cuidado Profesional",
      description: "Nuestro equipo veterinario está disponible las 24 horas para atender a tu mascota.",
      background: "url('https://i.postimg.cc/g20RkYqL/Profesiones-con-m-s-futuro-en-veterinaria.jpg')"
    },
    {
      title: "Tecnología de Vanguardia",
      description: "Contamos con equipos modernos para el mejor diagnóstico y tratamiento.",
      background: "url('https://i.postimg.cc/htwNQXvM/La-medicina-veterinaria-clasificada-como-profesion-del-sector-salud.jpg')"
    }
  ];
  private carouselInterval: any;

  // Para animaciones al hacer scroll
  @ViewChildren('section') sections!: QueryList<ElementRef>;

  constructor(
    private servicioService: ServicioService,
    private testimonioService: TestimonioService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
    this.cargarTestimonios();
    this.startCarousel();
  }

  ngAfterViewInit(): void {
    // Verificar las secciones visibles al cargar
    setTimeout(() => this.checkScroll(), 500);
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo del carrusel al destruir el componente
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  // Manejo del carrusel
  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
    this.updateCarousel();
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.carouselItems.length) % this.carouselItems.length;
    this.updateCarousel();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateCarousel();
    // Reiniciar el intervalo al cambiar slide manualmente
    this.resetCarouselInterval();
  }

  updateCarousel(): void {
    const heroSection = document.querySelector('.description-section') as HTMLElement;
    if (heroSection) {
      heroSection.style.backgroundImage = this.carouselItems[this.currentSlide].background;
    }

    // Actualizar indicadores
    document.querySelectorAll('.indicator').forEach((ind, i) => {
      ind.classList.toggle('active', i === this.currentSlide);
    });
  }

  resetCarouselInterval(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    this.startCarousel();
  }

  // Carga de datos
  cargarServicios(): void {
    this.servicioService.obtenerServicios().subscribe({
      next: (data) => {
        this.servicios = data;
        this.isLoading = false;
        setTimeout(() => this.checkScroll(), 100);
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
        setTimeout(() => this.checkScroll(), 100);
      },
      error: (err) => {
        console.error('Error al cargar testimonios:', err);
        this.errorTestimonios = 'Error al cargar los testimonios';
        this.isLoadingTestimonios = false;
      }
    });
  }

  // Animaciones al hacer scroll
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const windowHeight = window.innerHeight;

    this.sections.forEach(section => {
      const sectionElement = section.nativeElement;
      const sectionTop = sectionElement.getBoundingClientRect().top;

      if (sectionTop < windowHeight * 0.75) {
        sectionElement.classList.add('in-view');
      }
    });
  }

  // Métodos auxiliares
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

  // Navegación a secciones
  scrollToSection(sectionId: string): void {
    this.viewportScroller.scrollToAnchor(sectionId);
  }
}
