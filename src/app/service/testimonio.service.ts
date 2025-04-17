import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      map(data => data.map(item => this.convertToTestimonioCL(item)))
    );
  }

  private convertToTestimonioCL(data: any): TestimonioCL {
    const testimonio = new TestimonioCL();
    testimonio.idTestimonio = data.idTestimonio;
    testimonio.texto = data.texto;
    testimonio.calificacion = data.calificacion;
    testimonio.fecha = new Date(data.fecha);
    
    testimonio.cliente = new ClienteCL();
    testimonio.cliente.nombre = data.nombreCliente;
    testimonio.cliente.foto = data.imagenCliente;
    
    testimonio.servicio = new ServicioCL();
    testimonio.servicio.nombre = data.nombreServicio;
    
    return testimonio;
  }
}