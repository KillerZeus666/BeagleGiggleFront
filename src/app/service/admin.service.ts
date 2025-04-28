import { Injectable } from '@angular/core';
import { AdministradorCL } from '../model/administrador-cl';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8082/administrador';
  constructor(private http:HttpClient) { }

  findAll(): Observable<AdministradorCL[]>{
      return this.http.get<AdministradorCL[]>(`${this.baseUrl}`);
    }
  
    getAdmin(id:number): Observable<AdministradorCL>{
      return this.http.get<AdministradorCL>(`${this.baseUrl}/${id}`)
    }
  
    agregarAdministrador(veterinario:AdministradorCL,confirmPassword: string): Observable<AdministradorCL>{
      const params = new HttpParams().set('confirm_password', confirmPassword);
      return  this.http.post<AdministradorCL>(`${this.baseUrl}/crear`, veterinario, { params });
    }
  
    actualizarAdministrador(id:number, veterinario:AdministradorCL): Observable<AdministradorCL>{
        return this.http.put<AdministradorCL>(`${this.baseUrl}/actualizar/{id}`,veterinario);
      }
}
