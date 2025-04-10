import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === '1234') {
      this.router.navigate(['/admin']);
    } else if (this.username === 'cliente2' && this.password === '1234') {
      const clienteId = 2; // Este ID debería venir del backend idealmente
      this.router.navigate(['/mascotas-cliente', clienteId]);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos.';
    }
  }
  
}
