import { Injectable } from '@angular/core';
import { VeterinarioCL } from '../model/veterinario-cl';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CitaCL } from '../model/cita-cl';
import { MascotaCL } from '../model/mascota-cl';
import { TratamientoCL } from '../model/tratamiento-cl';

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

  cambiarEstadoVeterinario(id: number): Observable<any> {
    const url = `${this.baseUrl}/cambiar-estado/${id}`;
    return this.http.put(url, null, { responseType: 'text' });  
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
    return this.http.get<any[]>(`${this.baseUrl}/mascotas_atendidas/${idVeterinario}`);
  }

  // Obtener citas agendadas
  obtenerCitasAgendadas(idVeterinario:number): Observable<CitaCL[]> {
    return this.http.get<CitaCL[]>(`${this.baseUrl}/citas_agendadas/${idVeterinario}`);
  }

  // Obtener historial de citas
  obtenerHistorialcitas(idVeterinario:number): Observable<CitaCL[]> {
    return this.http.get<CitaCL[]>(`${this.baseUrl}/historial-citas/${idVeterinario}`);
  }

  // Obtener historial de tratamientos de una mascota específica atendida por un veterinario
  getHistorialTratamientos(idVeterinario: number, idMascota: number): Observable<TratamientoCL[]> {
    return this.http.get<TratamientoCL[]>(`${this.baseUrl}/historial-tratamientos-Mascota/${idVeterinario}/${idMascota}`);
  }

  // Obtener todos los tratamientos realizados por un veterinario
  getAllTratamientosVeterinario(idVeterinario: number): Observable<TratamientoCL[]> {
    return this.http.get<TratamientoCL[]>(`${this.baseUrl}/historial-tratamientos/${idVeterinario}`);
  }

  getCantidadVeterinariosActivos(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/cantidadVeterinariosActivos`);
  }

  getCantidadVeterinariosInactivos(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/cantidadVeterinariosInactivos`);
  }

  getVeterinariosActivos(): Observable<VeterinarioCL[]> {
    return this.http.get<VeterinarioCL[]>(`${this.baseUrl}/activos`);
  }

  getVeterinariosInactivos(): Observable<VeterinarioCL[]> {
    return this.http.get<VeterinarioCL[]>(`${this.baseUrl}/inactivos`);
  }

  buscarPorNombre(nombre: string): Observable<VeterinarioCL[]> {
      return this.http.get<VeterinarioCL[]>(`${this.baseUrl}/buscar`, {
        params: { nombre }
      });
    }
}