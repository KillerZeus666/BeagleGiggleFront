import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../mascota/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private baseUrl = 'http://localhost:8082/mascota';

  constructor(private http: HttpClient) {}

  // Obtener todas las mascotas
  findAll(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}/all`);
  }

  // Obtener una mascota por su ID
  findById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.baseUrl}/${id}`);
  }

  // Eliminar una mascota por su ID
  deleteMascota(id: number): Observable<void> {
    console.log('Eliminando mascota con ID:', id);
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${id}`);
  }

  // Agregar una nueva mascota asociada a un cliente
  agregarMascota(mascota: Mascota, idCliente: number): Observable<Mascota> {
    const url = `${this.baseUrl}/agregar?idCliente=${idCliente}`;
    return this.http.post<Mascota>(url, mascota);
  }

  // Editar una mascota existente
  actualizarMascota(id: number, mascota: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.baseUrl}/editar/${id}`, mascota);
  }

  // Cambiar el estado de una mascota
  cambiarEstadoMascota(id: number, mascota: Mascota): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/cambiarEstadoMascota/${id}`, mascota);
  }

  // Obtener mascotas por ID de cliente
  obtenerMascotasPorCliente(idCliente: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}/mascotas?idCliente=${idCliente}`);
  }

  getMascotaById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.baseUrl}/` + id);
  }

  getAllMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}/all`);
  }
  
 
  
}
