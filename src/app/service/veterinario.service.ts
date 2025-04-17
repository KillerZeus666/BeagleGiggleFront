import { Injectable } from '@angular/core';
import { VeterinarioCL } from '../model/veterinario-cl';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  private baseUrl = 'http://localhost:8082/veterinario';

  constructor(private http: HttpClient) {}

  // Obtener todos los veterinarios
  obtenerTodosVeterinarios(): Observable<VeterinarioCL[]> {
    return this.http.get<VeterinarioCL[]>(`${this.baseUrl}`);
  }

  // Obtener un veterinario por ID
  obtenerVeterinarioPorId(id: number): Observable<VeterinarioCL> {
    return this.http.get<VeterinarioCL>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo veterinario
  crearVeterinario(veterinario: VeterinarioCL, confirmPassword: string): Observable<VeterinarioCL> {
    const params = new HttpParams().set('confirm_password', confirmPassword);
    return this.http.post<VeterinarioCL>(`${this.baseUrl}/crear`, veterinario, { 
      params,
      responseType: 'text' as 'json' 
    });
  }

  // Actualizar un veterinario existente
  actualizarVeterinario(id: number, veterinario: VeterinarioCL): Observable<VeterinarioCL> {
    return this.http.put<VeterinarioCL>(`${this.baseUrl}/editar/${id}`, veterinario);
  }

  // Eliminar un veterinario
  eliminarVeterinario(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/eliminar/${id}`);
  }

  // Validar credenciales de veterinario (login)
  validarVeterinario(username: string, password: string): Observable<VeterinarioCL> {
    return this.http.get<VeterinarioCL>(`${this.baseUrl}/login`, {
      params: new HttpParams()
        .set('username', username)
        .set('password', password)
    });
  }

  // Obtener veterinarios por sede
  obtenerVeterinariosPorSede(sede: string): Observable<VeterinarioCL[]> {
    return this.http.get<VeterinarioCL[]>(`${this.baseUrl}/sede/${sede}`);
  }

  // Obtener veterinario con menor carga de trabajo por sede
  obtenerVeterinarioConMenorCarga(sede: string): Observable<VeterinarioCL> {
    return this.http.get<VeterinarioCL>(`${this.baseUrl}/menor-carga/${sede}`);
  }

  // Obtener mascotas atendidas por veterinario
  obtenerMascotasAtendidas(idVeterinario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${idVeterinario}/mascotas_atendidas`);
  }
}