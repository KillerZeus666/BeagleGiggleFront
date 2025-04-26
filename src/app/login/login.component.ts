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
      this.authService.login({ tipo: 'Admin', nombre: 'Admin', foto: 'https://portal.unbosque.edu.co/sites/default/files/inline-images/en-que-puede-trabajar-un-administrador-de-empresas.jpg	' });
      this.router.navigate(['/admin']);
    } else if (this.username === 'cliente2' && this.password === '1234') {
      this.authService.login({
        id: 2,
        tipo: 'Cliente',
        nombre: 'Carlos Gomez',
        foto: 'https://www.donnamoderna.com/content/uploads/2022/07/Donna-sorridente-830x625.jpg'
      });
      this.router.navigate(['/cliente']);
    } else if (this.username === 'veterinario1' && this.password === '1234') {
      this.authService.login({
        id: 1,
        tipo: 'Veterinario',
        nombre: 'Dr. Juan Pérez',
        foto: 'https://randomuser.me/api/portraits/men/1.jpg'
      });
      this.router.navigate(['/navigation']);

      //this.router.navigate(['/veterinario', 1]);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos.';
    }
  }
  
}
