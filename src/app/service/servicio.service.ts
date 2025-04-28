import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioCL } from '../model/servicio-cl';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  imagenFrontal: string;
  imagenTrasera: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = 'http://localhost:8082/api/servicios';

  constructor(private http: HttpClient) { }

  obtenerServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }

  getServicioPorTratamiento(id:number): Observable<ServicioCL>{
    return this.http.get<ServicioCL>(`${this.apiUrl}/por-tratamiento/${id}`);
  }
}