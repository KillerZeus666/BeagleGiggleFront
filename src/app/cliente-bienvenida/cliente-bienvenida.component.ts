import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service'; // Ajusta la ruta si es diferente

@Component({
  selector: 'app-cliente-bienvenida',
  templateUrl: './cliente-bienvenida.component.html',
  styleUrls: ['./cliente-bienvenida.component.css']
})
export class ClienteBienvenidaComponent implements OnInit {
  nombreCliente: string = '';
  edadMascota: number = 0;
  edadHumana: number | null = null;

  // Galería de imágenes (puedes agregar más o cambiar las URLs)
  imagenes: string[] = [
    'https://content.nationalgeographic.com.es/medio/2024/07/23/perro-jugando-con-palo-istock-tetiana-garkusha_46d0ac5d_240723190448_800x800.jpg',
    'https://images.unsplash.com/photo-1568572933382-74d440642117',
    'https://elcomercio.pe/resizer/v2/KA35MX3YBBCZVPMXOU5RCENPVI.jpg?auth=e93626d83b4af1418706ec8c3d9f1a529a0f7184ac5987eda6bf9f8c8070eb81&width=1200&height=810&quality=90&smart=true',
    'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVycm9zJTIweSUyMGdhdG9zfGVufDB8fDB8fHww'
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.nombreCliente = this.authService.getUserName();
  }

  irAMascotas(): void {
    this.router.navigate(['/cliente/mascotas']);
  }

  irACitas(): void {
    this.router.navigate(['/cliente/citas']);
  }

  irATratamientos(): void {
    this.router.navigate(['/cliente/mascotas/tratamiento']);
  }

  calcularEdadHumana(): void {
    if (this.edadMascota <= 0) {
      this.edadHumana = null;
    } else if (this.edadMascota === 1) {
      this.edadHumana = 15;
    } else if (this.edadMascota === 2) {
      this.edadHumana = 24;
    } else {
      this.edadHumana = 24 + (this.edadMascota - 2) * 4;
    }
  }

  toggleGaleria(): void {
    alert('¡Abrir galería completa!'); // Aquí podrías mostrar un modal, por ejemplo
  }

  verMascotasCliente(): void {
    const idCliente = 4; // Aquí pondrías el ID real del cliente si lo tienes
    this.router.navigate(['/ver-mascotas-cliente', idCliente]);
  }
}
