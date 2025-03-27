import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-fundaciones',
  templateUrl: './fundaciones.component.html',
  styleUrls: ['./fundaciones.component.css']
})
export class FundacionesComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  
  carouselSpeed: number = 1;  // Velocidad del carrusel (ajústala si es necesario)
  animationFrameId: number | null = null;

  ngOnInit(): void {
    this.startCarousel();
  }

  ngAfterViewInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private startCarousel(): void {
    const carouselElement = this.carousel.nativeElement;
    
    const animate = () => {
      carouselElement.scrollLeft += this.carouselSpeed;

      // Si llega al final, regresa al inicio para un bucle infinito
      if (carouselElement.scrollLeft >= carouselElement.scrollWidth - carouselElement.clientWidth) {
        carouselElement.scrollLeft = 0;
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
}
