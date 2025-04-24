import { Injectable } from '@angular/core';
import { MascotaCL } from '../model/mascota-cl';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  
  private baseUrl = 'http://localhost:8082/mascota';

  constructor(private http:HttpClient) {}

  findAll(): Observable<MascotaCL[]> {
    return this.http.get<MascotaCL[]>(this.baseUrl);
  }

  getMascota(id:number): Observable<MascotaCL>{
    return this.http.get<MascotaCL>(`${this.baseUrl}/${id}`);
  }

  getMascotasPorCliente(idCliente: number): Observable<MascotaCL[]> {
    const params = new HttpParams().set('idCliente', idCliente.toString());
    return this.http.get<MascotaCL[]>(`${this.baseUrl}/mascotas`, { params });
  }

  agregarMascota(mascota: MascotaCL, idCliente: number): Observable<MascotaCL> {
    const params = new HttpParams().set('idCliente', idCliente.toString());
    return this.http.post<MascotaCL>(`${this.baseUrl}/agregar`, mascota, { params });
  }

   editarMascota(id: number, mascota: MascotaCL): Observable<MascotaCL> {
    return this.http.put<MascotaCL>(`${this.baseUrl}/editar/${id}`, mascota);
  }

  eliminarMascota(id: number): Observable<MascotaCL> {
    return this.http.put<MascotaCL>(`${this.baseUrl}/eliminar/${id}`,null);
  }

  buscarPorNombre(nombre: string): Observable<MascotaCL[]> {
    return this.http.get<MascotaCL[]>(`http://localhost:8082/mascota/buscar`, {
      params: { nombre }
    });
  }
  
  getMascotasEnTratamientoPorCliente(idCliente: number): Observable<MascotaCL[]> {
    return this.http.get<MascotaCL[]>(`${this.baseUrl}/mascotas-en-tratamiento/${idCliente}`);
  }
}
