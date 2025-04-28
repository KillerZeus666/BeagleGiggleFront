import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicamentoCL } from '../model/medicamento-cl';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private baseUrl = 'http://localhost:8082/medicamento';
  constructor(private http: HttpClient) { }

  findAll(): Observable<MedicamentoCL[]> {
    return this.http.get<MedicamentoCL[]>(`${this.baseUrl}`);
  }

  getMedicamento(id: number): Observable<MedicamentoCL> {
    return this.http.get<MedicamentoCL>(`${this.baseUrl}/${id}`);
  }

  buscarPorNombre(nombre: string): Observable<MedicamentoCL[]> {
    return this.http.get<MedicamentoCL[]>(`${this.baseUrl}/buscar`, {
      params: { nombre }
    });
  }

  getPorTratamiento(id:number): Observable<MedicamentoCL[]>{
    return this.http.get<MedicamentoCL[]>(`${this.baseUrl}/por-tratamiento/${id}`);
  }
}
