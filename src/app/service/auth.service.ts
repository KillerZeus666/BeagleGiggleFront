import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteCL } from '../model/cliente-cl';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any = null;
  private apiUrl = 'http://localhost:8082'; // Cambia esto si tu API tiene otro puerto o URL base

  constructor(private http: HttpClient) {}

  login(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }

  getUser() {
    if (!this.user) {
      const stored = localStorage.getItem('user');
      this.user = stored ? JSON.parse(stored) : null;
    }
    return this.user;
  }

  getUserId(): number | null {
    return this.getUser()?.id || null;
  }

  getUserType(): string | null {
    return this.getUser()?.tipo || null;
  }

  getUserName(): string {
    return this.getUser()?.nombre || '';
  }

  getUserPhoto(): string {
    return this.getUser()?.foto || 'https://w7.pngwing.com/pngs/946/556/png-transparent-computer-icons-login-user-profile-client-smiley-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B8-windows-10-thumbnail.png';
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  /** Nuevo método para buscar el id del cliente por nombre de usuario */
  obtenerIdClientePorNombreUsuario(nombreUsuario: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/idClientePorNombreUsuario/${nombreUsuario}`);
  }


/** Nuevo método para iniciar sesión */
iniciarSesion(nombreUsuario: string, contrasena: string) {
  return this.http.post<any>('http://localhost:8082/api/inicio_sesion', {
    nombreUsuario,
    contrasena
  });
}

}
