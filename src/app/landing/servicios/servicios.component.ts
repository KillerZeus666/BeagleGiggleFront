import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit, AfterViewInit {
  public servicios: any[] = [];
  public isLoading = true;
  public errorMessage = '';

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  constructor(private servicioService: ServicioService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  ngOnInit(): void {
    this.cargarServicios();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkScroll(), 500);
  }

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
    // Método para mostrar el precio y mensaje cuando se hace clic en la tarjeta
    mostrarPrecio(servicio: any): void {
      servicio.mostrarPrecio = true; // Actualiza el servicio para mostrar el precio
    }
}
