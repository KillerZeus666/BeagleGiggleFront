import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fundaciones',
  templateUrl: './fundaciones.component.html',
  styleUrls: ['./fundaciones.component.css']
})
export class FundacionesComponent implements AfterViewInit {
  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef<HTMLElement>;
  private animationId: number | null = null;
  private isPaused = false;

  fundaciones = [
    {
      imagen: 'https://img.lalr.co/cms/2019/09/04155109/2016112523195825802.jpg?size=xl',
      nombre: 'Fundación Animal Save',
      descripcion: 'Rescatamos y cuidamos animales en situación de calle, dándoles una segunda oportunidad de vida.'
    },
    {
      imagen: 'https://blog.oxfamintermon.org/wp-content/uploads/2018/06/voluntariado-con-animales-1.jpg',
      nombre: 'Fundación Protectora de Animales Sucre',
      descripcion: 'Brindamos refugio, alimentación y atención veterinaria a mascotas abandonadas hasta que encuentren un hogar.'
    },
    {
      imagen: 'https://www.fundacionperroamor.com/urongeec/elementor/thumbs/Fundacion-pmamwc5jrxnbx4mf3m7znwm0hnua1ulv0gcd7xbthk.jpeg',
      nombre: 'Patrulla Animal',
      descripcion: 'Luchamos contra el maltrato animal y promovemos la adopción responsable de perros y gatos.'
    },
    {
      imagen: 'https://oem.com.mx/elsoldetlaxcala/img/16371591/1672780987/BASE_LANDSCAPE/1200/Colitas%20felices.jpg',
      nombre: 'Fundación de Ayuda a los Animales',
      descripcion: 'Nos enfocamos en rescatar animales en peligro, rehabilitarlos y encontrarles familias amorosas.'
    },
    {
      imagen: 'https://miredvista.co/wp-content/uploads/2022/11/liliana-morales-26.jpg',
      nombre: 'Vida Animal',
      descripcion: 'Organizamos campañas de esterilización y educación sobre el respeto y cuidado de los animales.'
    },
    {
      imagen: 'https://stakeholders.com.pe/wp-content/uploads/2023/04/trained-dogs-2022-11-10-18-03-18-utc-scaled.jpg',
      nombre: 'Peluditos en Apuros',
      descripcion: 'Nos dedicamos a la protección de animales vulnerables y la promoción de la tenencia responsable.'
    },
    {
      imagen: 'https://elcomercio.pe/resizer/sYS7edz0yuMj1-10gQgnZVftjrY=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/UWCUD6LJS5FQXLQTAASALWYALA.jpg',
      nombre: 'Ayúdame',
      descripcion: 'Rescatamos, curamos y rehabilitamos animales que han sufrido abandono o maltrato.'
    },
    {
      imagen: 'https://estaticos-cdn.prensaiberica.es/clip/97046842-7a83-496a-b573-35c1e9b4d53e_mobile-ep-aspect-ratio_640w_0.jpg',
      nombre: 'Patitas al Rescate',
      descripcion: 'Conectamos animales sin hogar con familias responsables y brindamos apoyo veterinario a quienes lo necesitan.'
    }
  ];

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  initializeCarousel(): void {
    const track = this.carouselTrack.nativeElement;
    const cards = Array.from(track.children) as HTMLElement[];
    
    cards.forEach(card => {
      const clone = card.cloneNode(true) as HTMLElement;
      track.appendChild(clone);
    });

    const cardWidth = cards[0].offsetWidth;
    const gap = 20;
    const totalWidth = (cardWidth + gap) * cards.length;
    
    let position = 0;
    const speed = 1;

    track.addEventListener('mouseenter', () => this.isPaused = true);
    track.addEventListener('mouseleave', () => this.isPaused = false);

    const animate = () => {
      if (!this.isPaused) {
        position -= speed;
        
        if (Math.abs(position) >= (cardWidth + gap) * cards.length) {
          position = 0;
        }
        
        track.style.transform = `translateX(${position}px)`;
      }
      
      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}