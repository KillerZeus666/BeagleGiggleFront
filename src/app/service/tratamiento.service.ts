import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TratamientoCL } from '../model/tratamiento-cl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private baseUrl = 'http://localhost:8082/tratamiento';
  constructor(private http:HttpClient) { }

  findAll():Observable<TratamientoCL[]>{
    return this.http.get<TratamientoCL[]>(`${this.baseUrl}`);
  }

  getTratamiento(id:number): Observable<TratamientoCL>{
    return this.http.get<TratamientoCL>(`${this.baseUrl}/${id}`)
  }

  crearTratamiento( tratamiento: TratamientoCL,
    idMascota: number,
    idServicio: number,
    idVeterinario: number | null,
    idsMedicamentos: number[]
  ): Observable<TratamientoCL> {
    let params = new HttpParams()
      .set('idMascota', idMascota.toString())
      .set('idServicio', idServicio.toString());

    if (idVeterinario !== null) {
      params = params.set('idVeterinario', idVeterinario.toString());
    }

    idsMedicamentos.forEach(id => {
      params = params.append('idsMedicamentos', id.toString());
    });

    return this.http.post<TratamientoCL>(`${this.baseUrl}/crear`, tratamiento, { params });
  }

  actualizarTratamiento(
    id: number,
    tratamiento: TratamientoCL,
    idMascota: number,
    idServicio: number,
    idVeterinario: number | null,
    idsMedicamentos: number[]
  ): Observable<TratamientoCL> {
    let params = new HttpParams()
      .set('idMascota', idMascota.toString())
      .set('idServicio', idServicio.toString());

    if (idVeterinario !== null) {
      params = params.set('idVeterinario', idVeterinario.toString());
    }

    // Agregar cada ID de medicamento como parámetro
    idsMedicamentos.forEach(idMed => {
      params = params.append('idsMedicamentos', idMed.toString());
    });

    return this.http.put<TratamientoCL>(`${this.baseUrl}/editar/${id}`, tratamiento, { params });
  }

  eliminarTratamiento(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`, { responseType: 'text' });
  }

  // Obtener tratamientos por mascota
  obtenerTratamientosPorMascota(idMascota: number): Observable<TratamientoCL[]> {
    return this.http.get<TratamientoCL[]>(`${this.baseUrl}/por-mascota/${idMascota}`);
  }

  getCantidadTratamientosUltimos30Dias(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/cantidad-ultimos-30-dias`);
  }

  getTratamientosUltimos30Dias(): Observable<TratamientoCL[]> {
    return this.http.get<TratamientoCL[]>(`${this.baseUrl}/ultimos-30-dias`);
  }

  getMedicamentosMasUsados(): Observable<{medicamento: string, cantidad: number}[]> {
    return this.http.get<{[key: string]: number}>(`${this.baseUrl}/medicamentos-mas-usados`).pipe(
      map(data => {
        return Object.entries(data).map(([medicamento, cantidad]) => ({ 
          medicamento, 
          cantidad 
        }));
      })
    );
  }
  
  getTop3MedicamentosMasVendidos(): Observable<{nombre: string, cantidad: number}[]> {
    return this.http.get<{medicamento: string, total: number}[]>(`${this.baseUrl}/top3-medicamentos-vendidos`).pipe(
      map(data => data.map(item => ({
        nombre: item.medicamento,
        cantidad: item.total
      })))
    );
  }
}