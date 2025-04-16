import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Testimonio {
  idTestimonio: number;
  texto: string;
  calificacion: number;
  fecha: string;
  nombreCliente: string;
  imagenCliente: string;
  nombreServicio: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonioService {
  private apiUrl = 'http://localhost:8082/api/testimonios';

  constructor(private http: HttpClient) { }

  obtenerTestimonios(): Observable<Testimonio[]> {
    console.log('Realizando solicitud a:', this.apiUrl);
    return this.http.get<Testimonio[]>(this.apiUrl);
  }
}