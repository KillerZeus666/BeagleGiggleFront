import { Injectable } from '@angular/core';
import { VeterinarioCL } from '../model/veterinario-cl';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MascotaCL } from '../model/mascota-cl';
@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  private baseUrl = 'http://localhost:8082/veterinario';
  constructor(private http:HttpClient) { }

  findAll(): Observable<VeterinarioCL[]>{
    return this.http.get<VeterinarioCL[]>(`${this.baseUrl}`);
  }

  getCliente(id:number): Observable<VeterinarioCL>{
    return this.http.get<VeterinarioCL>(`${this.baseUrl}/${id}`)
  }

  agregarCliente(veterinario:VeterinarioCL,confirmPassword: string): Observable<VeterinarioCL>{
    const params = new HttpParams().set('confirm_password', confirmPassword);
    return  this.http.post<VeterinarioCL>(`${this.baseUrl}/crear`, veterinario, { params });
  }

  actualizarCliente(id:number, veterinario:VeterinarioCL): Observable<VeterinarioCL>{
      return this.http.put<VeterinarioCL>(`${this.baseUrl}/actualizar/{id}`,veterinario);
    }

    obtenerMascotasAtendidas(): Observable<MascotaCL[]> {
      return this.http.get<MascotaCL[]>(`${this.baseUrl}/mascotas_atendidas`, { withCredentials: true });
    }  
}
