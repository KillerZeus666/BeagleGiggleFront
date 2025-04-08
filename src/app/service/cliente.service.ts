import { Injectable } from '@angular/core';
import { ClienteCL } from '../model/cliente-cl';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = 'http://localhost:8082/cliente';
  constructor(private http:HttpClient) {}

  findAll(): Observable<ClienteCL[]>{
    return this.http.get<ClienteCL[]>(`${this.baseUrl}`);
  }

  getCliente(id:number): Observable<ClienteCL>{
    return this.http.get<ClienteCL>(`${this.baseUrl}/${id}`);
  }

  agregarCliente(cliente: ClienteCL, confirmPassword: string): Observable<ClienteCL> {
    const params = new HttpParams().set('confirm_password', confirmPassword);
    return this.http.post<ClienteCL>(`${this.baseUrl}/crear`, cliente, { params,responseType: 'text' as 'json' });
  }  

  actualizarCliente(id:number, cliente:ClienteCL): Observable<ClienteCL>{
    return this.http.put<ClienteCL>(`${this.baseUrl}/actualizar/${id}`,cliente);
  }

  eliminarCliente(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/eliminar/${id}`);
  }
}
