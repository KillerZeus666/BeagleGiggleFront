import { Injectable } from '@angular/core';
import { Mascota } from '../mascota/mascota';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  
  private baseUrl = 'http://localhost:8082/mascota';

  constructor(private http:HttpClient) {}

  findAll(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.baseUrl);
  }

  getMascota(id:number): Observable<Mascota>{
    return this.http.get<Mascota>(`${this.baseUrl}/${id}`);
  }

  getMascotasPorCliente(idCliente: number): Observable<Mascota[]> {
    const params = new HttpParams().set('idCliente', idCliente.toString());
    return this.http.get<Mascota[]>(`${this.baseUrl}/mascotas`, { params });
  }

  agregarMascota(mascota: Mascota, idCliente: number): Observable<Mascota> {
    const params = new HttpParams().set('idCliente', idCliente.toString());
    return this.http.post<Mascota>(`${this.baseUrl}/agregar`, mascota, { params });
  }

   editarMascota(id: number, mascota: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.baseUrl}/editar/${id}`, mascota);
  }

  eliminarMascota(id: number): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.baseUrl}/eliminar/${id}`,null);
  }

}
