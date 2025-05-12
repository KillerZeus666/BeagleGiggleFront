import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TestimonioCL } from '../model/testimonio-cl';
import { ClienteCL } from '../model/cliente-cl';
import { ServicioCL } from '../model/servicio-cl';

@Injectable({
  providedIn: 'root'
})
export class TestimonioService {
  private apiUrl = 'http://localhost:8082/api/testimonios';

  constructor(private http: HttpClient) { }

  obtenerTestimonios(): Observable<TestimonioCL[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => this.convertToTestimonioCL(item))),
      catchError(error => {
        console.error('Error fetching testimonios:', error);
        return throwError(() => new Error('Error al cargar testimonios'));
      })
    );
  }

  private convertToTestimonioCL(data: any): TestimonioCL {
    return new TestimonioCL(
      data.idTestimonio,
      data.texto,
      data.calificacion,
      new Date(data.fecha),
      new ClienteCL(0, data.nombreCliente, data.imagenCliente),
      new ServicioCL(0, data.nombreServicio)
    );
  }
}