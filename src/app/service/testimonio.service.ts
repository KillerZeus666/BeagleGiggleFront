import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestimonioCL } from '../model/testimonio-cl';
import { TestimonioCreateCL } from '../model/testimonio-create';
import { ClienteCL } from '../model/cliente-cl';
import { ServicioCL } from '../model/servicio-cl';

@Injectable({
  providedIn: 'root'
})
export class TestimonioService {
  private apiUrl = 'http://localhost:8082/api/testimonios';

  constructor(private http: HttpClient) { }

  obtenerTestimonios(): Observable<TestimonioCL[]> {
    return this.http.get<TestimonioCL[]>(this.apiUrl).pipe(
      map(data => data.map(item => TestimonioCL.fromBackendData(item)))
    );
  }

  crearTestimonio(testimonio: TestimonioCreateCL): Observable<TestimonioCL> {
    return this.http.post<TestimonioCL>(`${this.apiUrl}/crear`, testimonio).pipe(
      map(data => TestimonioCL.fromBackendData(data))
    );
  }
}