import { Injectable } from '@angular/core';
import { MascotaCL } from '../model/mascota-cl';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  
  // Base URL para las peticiones HTTP a la API de mascotas
  private baseUrl = 'http://localhost:8082/mascota';

  // Constructor que inyecta HttpClient para hacer solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener todas las mascotas
  findAll(): Observable<MascotaCL[]> {
    return this.http.get<MascotaCL[]>(this.baseUrl);  // Realiza una solicitud GET para obtener todas las mascotas
  }

  // Método para obtener una mascota específica por su ID
  getMascota(id: number): Observable<MascotaCL> {
    return this.http.get<MascotaCL>(`${this.baseUrl}/${id}`);  // Realiza una solicitud GET con el ID de la mascota
  }

  // Método para obtener las mascotas de un cliente específico
  getMascotasPorCliente(idCliente: number): Observable<MascotaCL[]> {
    const params = new HttpParams().set('idCliente', idCliente.toString());  // Crea parámetros HTTP con el ID del cliente
    return this.http.get<MascotaCL[]>(`${this.baseUrl}/mascotas`, { params });  // Realiza una solicitud GET pasando los parámetros
  }

  // Método para agregar una nueva mascota para un cliente específico
  agregarMascota(mascota: MascotaCL, idCliente: number): Observable<MascotaCL> {
    const params = new HttpParams().set('idCliente', idCliente.toString());  // Crea parámetros HTTP con el ID del cliente
    return this.http.post<MascotaCL>(`${this.baseUrl}/agregar`, mascota, { params });  // Realiza una solicitud POST para agregar una mascota
  }

  // Método para editar los detalles de una mascota específica
  editarMascota(id: number, mascota: MascotaCL): Observable<MascotaCL> {
    return this.http.put<MascotaCL>(`${this.baseUrl}/editar/${id}`, mascota);  // Realiza una solicitud PUT para editar una mascota específica
  }

  // Método para eliminar una mascota específica
  eliminarMascota(id: number): Observable<MascotaCL> {
    return this.http.put<MascotaCL>(`${this.baseUrl}/eliminar/${id}`, null);  // Realiza una solicitud PUT para eliminar una mascota por su ID
  }

  // Método para buscar mascotas por su nombre
  buscarPorNombre(nombre: string): Observable<MascotaCL[]> {
    return this.http.get<MascotaCL[]>(`http://localhost:8082/mascota/buscar`, {
      params: { nombre }  // Pasa el nombre como parámetro de búsqueda
    });
  }

  // Método para obtener las mascotas que están en tratamiento de un cliente específico
  getMascotasEnTratamientoPorCliente(idCliente: number): Observable<MascotaCL[]> {
    return this.http.get<MascotaCL[]>(`${this.baseUrl}/mascotas-en-tratamiento/${idCliente}`);  // Realiza una solicitud GET para obtener mascotas en tratamiento de un cliente
  }

  // Método para obtener la cantidad total de mascotas
  getCantidadMascotas(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/cantidadMascotas`);  // Realiza una solicitud GET para obtener el número total de mascotas
  }

// Método para obtener la cantidad total de mascotas dado el id de un Usuario
  getCantidadMascotasPorUsuario(idCliente: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/cantidadMascotasPorCliente/${idCliente}`);
  }
  
    // Método para obtener la cantidad total de mascotas en tratamiento
    getCantidadMascotasEnTratamiento(): Observable<number> {
      return this.http.get<number>(`${this.baseUrl}/cantidadMascotasEnTratamiento`);  // Realiza una solicitud GET para obtener el número total de mascotas en tratamiento
    }
}
