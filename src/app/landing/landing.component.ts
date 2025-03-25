import { Component, OnInit, HostListener } from '@angular/core';

interface ITestimonial {
  text: string;
  name: string;
  image: string;
  rating: string;
  service: string;
  date: string;
}

class Testimonial implements ITestimonial {
  public rating: string;
  public date: string; 

  constructor(
    public text: string,
    public name: string,
    public image: string,
    ratingValue: number,
    public service: string,
    date: string
  ) {
    this.text = this.formatText(text);
    this.image = image || "https://via.placeholder.com/60";
    this.rating = "⭐".repeat(ratingValue);
    this.date = date || new Date().toLocaleDateString();
  }

  private formatText(text: string): string {
    return text.replace(/(\S{15,})/g, "$1- ");
  }
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  testimonials: Testimonial[] = [
    new Testimonial(
      "¡Excelente servicio, muy atentos con mi mascota!",
      "Peter Parker",
      "https://randomuser.me/api/portraits/men/10.jpg", // URL temporal válida
      5,
      "Consulta General",
      "15 de enero de 2024"
    ),
    new Testimonial(
      "¡La cirugía salió perfectamente y mi perro se recuperó rápido!",
      "Walter White",
      "https://randomuser.me/api/portraits/men/20.jpg", // URL temporal válida
      4,
      "Cirugía",
      "10 de febrero de 2024"
    ),
    new Testimonial(
      "¡Increíble servicio de peluquería! Mi gato luce fabuloso.",
      "Mary Jane",
      "https://randomuser.me/api/portraits/women/30.jpg", // URL temporal válida
      3,
      "Peluquería",
      "5 de marzo de 2024"
    )
  ];

  // Form model
  appointmentForm = {
    name: '',
    details: '',
    service: '',
    image: '',
    vet: ''
  };

  selectedVet: string = '';
  carouselPosition: number = 0;
  carouselSpeed: number = 0.5;
  isMenuActive: boolean = false;
  animationFrameId: number | null = null;

  // Vet images - commented temporary URLs
  vetImages = [
    { id: 'vet1', name: 'Los Pinos', image: 'https://i.postimg.cc/431p87Bz/vet1.png' }, // URL temporal
    { id: 'vet2', name: 'Patitas Felices', image: 'https://i.postimg.cc/nzcBNFPN/vet2.png' }, // URL temporal
    { id: 'vet3', name: 'Huellas', image: 'https://i.postimg.cc/gJS8p99j/vet3.png' } // URL temporal
  ];
  
  ngOnInit(): void {
    // this.initCarousel();
  }
  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  checkFormValidity(): boolean {
    return !!(
      this.appointmentForm.name &&
      this.appointmentForm.details &&
      this.appointmentForm.service &&
      this.appointmentForm.image &&
      this.selectedVet
    );
  }

  selectVet(vet: string): void {
    this.selectedVet = vet;
    this.appointmentForm.vet = vet;
  }

  private initCarousel(): void {
    const animate = () => {
      this.carouselPosition -= this.carouselSpeed;
      
      if (this.carouselPosition <= -window.innerWidth) {
        this.carouselPosition = 0;
      }
      
      this.animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  toggleMenu(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isMenuActive = !this.isMenuActive;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutsideMenu(event: MouseEvent): void {
    const menuElement = document.querySelector('.user-menu');
    const target = event.target as HTMLElement;
    
    if (menuElement && !menuElement.contains(target) && !target.closest('.user-menu-toggle')) {
      this.isMenuActive = false;
    }
  }

  onSubmit(): void {
    if (!this.selectedVet) {
      alert("Debes seleccionar una veterinaria.");
      return;
    }
    
    // Form submission logic
    console.log('Form submitted:', this.appointmentForm);
    // Reset form
    this.appointmentForm = {
      name: '',
      details: '',
      service: '',
      image: '',
      vet: ''
    };
    this.selectedVet = '';
  }
}