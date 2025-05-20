import { Injectable } from '@angular/core';
import { ClienteCL } from '../model/cliente-cl';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserCl } from '../model/user-cl';

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

  agregarCliente(cliente: ClienteCL, confirmPassword: string): Observable<string> {
    const params = new HttpParams().set('confirm_password', confirmPassword);
    return this.http.post<string>(`${this.baseUrl}/crear`, cliente, { params });
  }
     

  actualizarCliente(id:number, cliente:ClienteCL): Observable<ClienteCL>{
    return this.http.put<ClienteCL>(`${this.baseUrl}/actualizar/${id}`,cliente);
  }

  eliminarCliente(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/eliminar/${id}`);
  }

   // Método para buscar mascotas por su nombre
    buscarPorNombre(nombre: string): Observable<ClienteCL[]> {
      return this.http.get<ClienteCL[]>(`http://localhost:8082/cliente/buscar`, {
        params: { nombre }  // Pasa el nombre como parámetro de búsqueda
      });
    }
  
  login(usuario:UserCl):Observable<String>{
    return this.http.post(`${this.baseUrl}/login`,usuario, {
      responseType :'text'
    });
  }

  clienteHome():Observable<ClienteCL>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

    return this.http.get<ClienteCL>(`${this.baseUrl}/details`);
  }

  loginSencillo(username: string, password: string): Observable<ClienteCL> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.get<ClienteCL>(`${this.baseUrl}/login-sencillo`, { params });
  }
}
