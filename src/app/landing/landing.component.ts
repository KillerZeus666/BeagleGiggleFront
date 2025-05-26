import { Component, OnInit, HostListener, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { ServicioService } from 'src/app/service/servicio.service';
import { TestimonioService } from 'src/app/service/testimonio.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [DatePipe]
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  servicios: any[] = [];
  isLoading = true;
  errorMessage = '';
  testimonios: any[] = [];
  isLoadingTestimonios = true;
  errorTestimonios = '';

  // Variables para el carrusel
  currentSlide = 0;
  carouselItems = [
    {
      title: "Bienvenido a Nuestra Plataforma",
      description: "Descubre un espacio diseñado para brindarte los mejores servicios en salud y bienestar.",
      background: "https://i.postimg.cc/KYgCr3Td/pexels-lum3n-44775-406014.jpg"
    },
    {
      title: "Cuidado Profesional",
      description: "Nuestro equipo veterinario está disponible las 24 horas para atender a tu mascota.",
      background: "https://universidadeuropea.com/resources/media/images/medicina-veterinaria-1200x630.original.jpg"
    },
    {
      title: "Tecnología de Vanguardia",
      description: "Contamos con equipos modernos para el mejor diagnóstico y tratamiento.",
      background: "https://www.ladogmami.com/wp-content/uploads/2021/01/5.-Perro-feliz-10-senales-para-identificarlo-scaled.jpg"
    }
  ];
  private carouselInterval: any;
  private imagesLoaded = 0;

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  constructor(
    private servicioService: ServicioService,
    private testimonioService: TestimonioService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.preloadImages().then(() => {
      this.startCarousel();
    });
    this.cargarServicios();
    this.cargarTestimonios();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkScroll(), 500);
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  // Precarga de imágenes
  preloadImages(): Promise<void> {
    return new Promise((resolve) => {
      const loadPromises = this.carouselItems.map(item => {
        return new Promise<void>((imgResolve) => {
          const img = new Image();
          img.onload = () => {
            this.imagesLoaded++;
            imgResolve();
          };
          img.onerror = () => {
            console.warn(`No se pudo cargar la imagen: ${item.background}`);
            imgResolve();
          };
          img.src = item.background;
        });
      });

      Promise.all(loadPromises).then(() => {
        console.log(`Todas las imágenes precargadas (${this.imagesLoaded}/${this.carouselItems.length})`);
        resolve();
      });
    });
  }

  // Manejo del carrusel
  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetCarouselInterval();
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
      next: (data: any[]) => {
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
  getRatingStars(testimonio: any): string {
    if (!testimonio || !testimonio.calificacion) return '⭐';
    return '⭐'.repeat(Math.min(Math.max(1, testimonio.calificacion), 5));
  }

  formatDate(testimonio: any): string {
    if (!testimonio || !testimonio.fecha) return '';
    try {
      return this.datePipe.transform(testimonio.fecha, 'dd/MM/yyyy') || '';
    } catch (e) {
      console.error('Error formateando fecha:', e);
      return '';
    }
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