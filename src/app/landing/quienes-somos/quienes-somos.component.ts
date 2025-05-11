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
      content: 'Nuestra misión es brindar un servicio de calidad que supere las expectativas de nuestros clientes...'
    },
    {
      title: 'Visión',
      content: 'Ser líderes en el sector ofreciendo innovación, compromiso y responsabilidad social...'
    },
    {
      title: 'Valores',
      content: 'Compromiso, integridad, excelencia, respeto y trabajo en equipo.'
    },
    {
      title: 'Historia',
      content: 'Fundados en 2010, comenzamos como una pequeña idea que ha crecido hasta convertirse en...'
    }
  ];

  selectTab(index: number) {
    this.activeTab = index;
  }
}
