import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-fundaciones',
  templateUrl: './fundaciones.component.html',
  styleUrls: ['./fundaciones.component.css']
})
export class FundacionesComponent implements OnInit, OnDestroy {

  carouselPosition: number = 0;
  carouselSpeed: number = 1;
  animationFrameId: number | null = null;
  totalWidth: number = 0;

  ngOnInit(): void {
    this.calculateCarouselWidth();
    this.initCarousel();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private calculateCarouselWidth(): void {
    const carouselElement = document.querySelector('.carousel') as HTMLElement;
    if (carouselElement) {
      this.totalWidth = carouselElement.scrollWidth / 2;
    }
  }

  private initCarousel(): void {
    const animate = () => {
      this.carouselPosition -= this.carouselSpeed;

      if (Math.abs(this.carouselPosition) >= this.totalWidth) {
        this.carouselPosition = 0;
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
}
