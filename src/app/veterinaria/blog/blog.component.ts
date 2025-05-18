import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  articulos = [
    {
      titulo: '¿Por qué es vital vacunar a tu mascota?',
      descripcion: `Las vacunas son fundamentales para proteger a tu mascota contra enfermedades graves como la rabia, parvovirus y moquillo. Vacunar a tiempo no solo cuida la salud de tu amigo peludo, sino que también previene brotes que pueden afectar a toda la comunidad. 
      
      Recuerda consultar con tu veterinario el calendario de vacunación adecuado según la edad y raza de tu mascota.`,
      fecha: new Date(2025, 8, 1), // Mes 8 = Septiembre (empieza en 0)
      autor: 'Dra. Lina Rodríguez',
      imagenes: [
        'https://media.istockphoto.com/id/966384466/es/foto/imagen-recortada-del-beagle-de-cartera-hombre-al-veterinario-hacer-inyecci%C3%B3n-jeringa-que.jpg?s=612x612&w=0&k=20&c=tDYz1Eq1XBlQ1-fsy9rohx_1iIzE-ijNqfzRby7C3x0=',
        'https://img.freepik.com/foto-gratis/cerca-veterinario-cuidando-mascota_23-2149143887.jpg'
      ]
    },
    {
      titulo: 'Alimentación saludable para perros adultos',
      descripcion: `Una dieta equilibrada es la base para una vida larga y saludable de tu perro adulto. Es importante incluir proteínas de calidad, grasas saludables, vitaminas y minerales. Evita alimentos procesados con altos niveles de conservantes y azúcares. 
      
      Además, siempre asegúrate de que tenga acceso a agua fresca y suficiente ejercicio diario.`,
      fecha: new Date(2025, 7, 28), // Agosto 28
      autor: 'MVZ Carlos Sánchez',
      imagenes: [
        'https://imagenes.eltiempo.com/files/image_1200_600/uploads/2017/02/12/58a04e1be0ec8.jpeg',
        'https://vivirenelpoblado.com/wp-content/uploads/2019/05/comida-naturlal-mascota.jpg'
      ]
    },
    {
      titulo: 'Ejercicio y estimulación mental para cachorros',
      descripcion: `Los cachorros necesitan más que cariño: requieren ejercicio físico y mental para crecer fuertes y felices. Juegos de búsqueda, caminatas cortas y juguetes interactivos ayudan a desarrollar su inteligencia y controlar la energía. 
      
      Esto previene comportamientos destructivos y favorece una mejor adaptación social.`,
      fecha: new Date(2025, 7, 20), // Agosto 20
      autor: 'Lic. Ana María Torres',
      imagenes: [
        'https://www.novecan.com/blog/wp-content/uploads/2023/08/golden-retriever-dog-exercising-2023-08-03-16-56-10-utc.webp',
        'https://www.zooplus.es/magazine/wp-content/uploads/2021/03/ejercicio-para-perros.jpeg'
      ]
    }
  ];
}
