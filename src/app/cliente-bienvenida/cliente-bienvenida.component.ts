import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service'; // ajusta la ruta si es diferente


@Component({
  selector: 'app-cliente-bienvenida',
  templateUrl: './cliente-bienvenida.component.html',
  styleUrls: ['./cliente-bienvenida.component.css']
})
export class ClienteBienvenidaComponent {
  nombreCliente: string = '';

  constructor(private router: Router, private authService: AuthService) {}
  

  ngOnInit() {
    this.nombreCliente = this.authService.getUserName();
  }
  

  irAMascotas() {
    this.router.navigate(['/cliente/mascotas']);
  }

  irACitas() {
    this.router.navigate(['/cliente/citas']);
  }

  irATratamientos() {
    this.router.navigate(['/cliente/mascotas/tratamiento']);
  }
}
