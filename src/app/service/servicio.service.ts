import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioCL } from '../model/servicio-cl';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = 'http://localhost:8082/servicios';

  constructor(private http: HttpClient) { }

  findAll(): Observable<ServicioCL[]> {
    return this.http.get<ServicioCL[]>(this.apiUrl);
  }

  obtenerServicios(): Observable<ServicioCL[]> {
    return this.http.get<ServicioCL[]>(this.apiUrl);
  }
}
