import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  articulos = [
       {
      id: 'Spotify',
      titulo: 'PlayList para relajar a tu mascota',
      descripcion: `La música también es parte del bienestar de tu mascota. Descubre una playlist pensada especialmente para relajar y estimular a tu perro o gato. ¡Haz clic y escúchala ahora!`,
      fecha: new Date(2025, 7, 20),
      autor: 'Por Dra. Angela Beltrán',
      imagenes: [
        'https://www.aon.es/personales/seguro-perro-gato/wp-content/uploads/sites/2/2023/06/afecta_la_musica_a_las_mascotas.png',
        'https://www.zooplus.es/magazine/wp-content/uploads/2021/03/ejercicio-para-perros.jpeg'
      ],
      ruta: '/playlist'
    },
    {
      id: 'test-salud-mascota',
      titulo: 'Evalúa el estado de salud de tu mascota en 1 minuto',
      descripcion: `¿Notas que tu mascota no se comporta como siempre? Con nuestro test rápido podrás detectar señales comunes de alerta como fatiga, pérdida de apetito o síntomas respiratorios.

Este test no reemplaza una consulta veterinaria, pero puede ayudarte a decidir cuándo es momento de actuar. ¡Hazlo ahora y cuida a quien más te quiere!`,
      fecha: new Date(2025, 8, 1),
      autor: 'Dra. Lina Rodríguez',
      imagenes: [
        'https://cdn.nubika.es/wp-content/uploads/2024/02/14153319/test-inteligencia-perros.png',
        'https://cdn.nubika.es/wp-content/uploads/2024/02/14153319/test-inteligencia-perros.png'
      ],
      ruta: '/test-salud-mascota'
    },
    {
    id: 'edad-humana-mascota',
    titulo: 'Conoce la edad humana de tu mascota',
    descripcion: `
      ¿Sabías que la edad de tu mascota no se calcula igual que la humana? 
      Aquí te ayudamos a conocer cuántos años "humanos" tiene tu perro o gato.
    `,
    fecha: new Date(2025, 1, 26),
    autor: 'MVZ Ana Gómez',
    imagenes: [
      'https://urgenciesveterinaries.com/wp-content/uploads/2021/03/perros-braquicefalos-survet-01.jpg'
    ],
    ruta: '/edad-humana-mascota',

    // Propiedad para indicar que este artículo debe mostrar la calculadora
    incluyeCalculadoraEdad: true
     },
    {
      id: 'cumpleanios-mascota',
      titulo: '¡Tu mascota está de cumpleaños!',
      descripcion: `
        ¿Hoy es el cumpleaños de tu peludo? 🎉 
        Descubre las sorpresas que BeagleGiggle tiene preparadas para celebrar su día especial. 
        Desde premios hasta recomendaciones personalizadas.
      `,
      fecha: new Date(2025, 2, 30),
      autor: 'MVZ Ana Gómez',
      imagenes: [
        'https://www.wasky.es/wp-content/uploads/cabecera-60.jpg'
      ],
      ruta: '/cumpleanios-mascota',

      // Propiedad personalizada que podrías usar para mostrar contenido especial de cumpleaños
      incluyeSorpresasCumple: true
    }


  ];

  constructor(private router: Router) {}

  verArticulo(id: string) {
    this.router.navigate(['/articulo', id]);
  }

  navegar(ruta: string) {
  this.router.navigate([ruta]);
}

}
