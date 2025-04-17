import { Injectable } from '@angular/core';
import { CitaCL } from '../model/cita-cl';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private baseUrl = 'http://localhost:8082/cita';

  constructor(private http: HttpClient) { }

  // Obtener todas las citas
  obtenerTodasCitas(): Observable<CitaCL[]> {
    return this.http.get<CitaCL[]>(`${this.baseUrl}`);
  }

  // Obtener una cita por ID
  obtenerCitaPorId(id: number): Observable<CitaCL> {
    return this.http.get<CitaCL>(`${this.baseUrl}/${id}`);
  }

  // Crear una nueva cita
  crearCita(cita: CitaCL): Observable<CitaCL> {
    return this.http.post<CitaCL>(`${this.baseUrl}/crear`, cita);
  }

  // Actualizar una cita existente
  actualizarCita(id: number, cita: CitaCL): Observable<CitaCL> {
    return this.http.put<CitaCL>(`${this.baseUrl}/actualizar/${id}`, cita);
  }

  // Eliminar una cita
  eliminarCita(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/eliminar/${id}`);
  }

  // Obtener citas por cliente
  obtenerCitasPorCliente(idCliente: number): Observable<CitaCL[]> {
    return this.http.get<CitaCL[]>(`${this.baseUrl}/cliente/${idCliente}`);
  }

  // Obtener citas por veterinario
  obtenerCitasPorVeterinario(idVeterinario: number): Observable<CitaCL[]> {
    return this.http.get<CitaCL[]>(`${this.baseUrl}/veterinario/${idVeterinario}`);
  }

  // Obtener citas por mascota
  obtenerCitasPorMascota(idMascota: number): Observable<CitaCL[]> {
    return this.http.get<CitaCL[]>(`${this.baseUrl}/mascota/${idMascota}`);
  }

  // Obtener citas por fecha
  obtenerCitasPorFecha(fecha: string): Observable<CitaCL[]> {
    return this.http.get<CitaCL[]>(`${this.baseUrl}/fecha`, {
      params: new HttpParams().set('fecha', fecha)
    });
  }

  // Obtener citas por estado
  obtenerCitasPorEstado(estado: string): Observable<CitaCL[]> {
    return this.http.get<CitaCL[]>(`${this.baseUrl}/estado`, {
      params: new HttpParams().set('estado', estado)
    });
  }
}