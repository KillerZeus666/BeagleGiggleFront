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

  selectTab(index: number) {
    this.activeTab = index;
  }
}
