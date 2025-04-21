import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // cambia la ruta según tu estructura

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === '1234') {
      this.authService.login({ tipo: 'ADMINISTRADOR', nombre: 'Admin', foto: '' });
      this.router.navigate(['/admin']); // Página para el administrador
    } else if (this.username === 'cliente2' && this.password === '1234') {
      this.authService.login({
        tipo: 'CLIENTE',
        nombre: 'Luz Morales',
        foto: 'https://randomuser.me/api/portraits/women/2.jpg'
      });
      // Redirigir a la página principal del cliente
      this.router.navigate(['/cliente']); // Cambia la ruta a la página principal del cliente
    } else if (this.username === 'veterinario1' && this.password === '1234') {
      this.authService.login({
        tipo: 'VETERINARIO',
        nombre: 'Dr. Juan Pérez',
        foto: 'https://randomuser.me/api/portraits/men/1.jpg'
      });
      this.router.navigate(['/mascotas-veterinario', 1]);  // Página para el veterinario
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos.';
    }
  }
}
