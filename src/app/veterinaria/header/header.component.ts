import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userType: string | null = null; // 'CLIENTE', 'VETERINARIO', 'ADMINISTRADOR' o null
  userName: string = '';
  userPhoto: string = '';
  isMenuOpen: boolean = false;

  // Simulación de datos de usuario (en una app real vendrían de un servicio)
  constructor() {
    // Ejemplo: cambiar este valor para probar diferentes vistas
    this.userType = null; // Por defecto sin sesión
    // this.userType = 'CLIENTE';
    // this.userType = 'VETERINARIO';
    // this.userType = 'ADMINISTRADOR';
    
    // Datos de ejemplo para usuario logueado
    this.userName = 'Juan Pérez';
    this.userPhoto = 'https://randomuser.me/api/portraits/men/1.jpg';
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.userType = null;
    this.isMenuOpen = false;
    // En una app real aquí llamarías al servicio de autenticación
  }
}