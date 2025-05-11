import { Component } from '@angular/core';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent {
  activeTab = 0;

  tabs = [
    {
      title: 'Misión',
      content: 'Nuestra misión es proporcionar atención veterinaria de calidad, comprometidos con el bienestar de las mascotas y la tranquilidad de sus dueños, ofreciendo soluciones innovadoras y un servicio personalizado para cada uno de nuestros pacientes.'
    },
    {
      title: 'Visión',
      content: 'Ser líderes en el sector veterinario, ofreciendo innovación, compromiso y responsabilidad social, garantizando el cuidado integral de las mascotas y fortaleciendo el vínculo entre los animales y sus familias.'
    },
    {
      title: 'Valores',
      content: 'Compromiso, integridad, excelencia, respeto y trabajo en equipo.'
    },
    {
      title: 'Tecnologías',
      content: 'En Beagle Giggle utilizamos tecnología avanzada para ofrecer un cuidado preciso y efectivo a tus mascotas, con equipos de diagnóstico de última generación y herramientas digitales para un seguimiento óptimo.'
    }
  ];
sedes = [
    {
      name: 'Los Pinos',
      image: 'https://www.ces.edu.co/wp-content/uploads/2021/06/nota-cvz-best-mini-300x300.jpg',
      description: 'Rodeada de naturaleza, perfecta para el bienestar de tus mascotas.',
      address: 'Calle 123 #45-67, Bogotá',
      flipped: false
    },
    {
      name: 'Patitas Felices',
      image: 'https://www.paxinasgalegas.es/imagenes/adsg-acivo_img552467t0.jpg',
      description: 'Un lugar lleno de amor, juegos y atención personalizada.',
      address: 'Avenida 7 #89-01, Bogotá',
      flipped: false
    },
    {
      name: 'Huellas',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV9gHpgK6rA-4QK_7jf62obGHv1HHgJjwBOg&s',
      description: 'Instalaciones modernas y cálidas para una atención de calidad.',
      address: 'Carrera 5 #23-45, Bogotá',
      flipped: false
    }
  ];

  toggleFlip(sede: any) {
    sede.flipped = !sede.flipped;
  }

  selectTab(index: number) {
    this.activeTab = index;
  }
}