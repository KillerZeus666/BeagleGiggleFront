import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaCL } from '../model/factura-cl';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private baseUrl = 'http://localhost:8082/factura';

  constructor(private http: HttpClient) { }

  findAll(): Observable<FacturaCL[]>{
    return this.http.get<FacturaCL[]>(this.baseUrl);
  }

  getFacturaPorId(id:number): Observable<FacturaCL> {
    return this.http.get<FacturaCL>(`${this.baseUrl}/${id}`);
  }

  getFacturaPorIdCLiente(idCliente:number): Observable<FacturaCL[]> {
    return this.http.get<FacturaCL[]>(`${this.baseUrl}/cliente/${idCliente}`);
  }

  crearFacturaPorTratamiento(idCliente: number, idTratamiento: number, factura: FacturaCL): Observable<FacturaCL> {
    const params = new HttpParams()
      .set('idCliente', idCliente)
      .set('idTratamiento', idTratamiento);

    return this.http.post<FacturaCL>(`${this.baseUrl}/crear/tratamiento`, factura, { params });
  }

  crearFacturaPorTratamientos(idCliente: number, idsTratamiento: number[], factura: FacturaCL): Observable<FacturaCL[]> {
    let params = new HttpParams().set('idCliente', idCliente);
    idsTratamiento.forEach(id => {
      params = params.append('idsTratamiento', id);
    });

    return this.http.post<FacturaCL[]>(`${this.baseUrl}/crear/tratamientos`, factura, { params });
  }

  crearFacturaPorServicio(idCliente: number, idServicio: number, factura: FacturaCL): Observable<FacturaCL> {
    const params = new HttpParams()
      .set('idCliente', idCliente)
      .set('idServicio', idServicio);
    return this.http.post<FacturaCL>(`${this.baseUrl}/crear/servicio`, factura, { params });
  }

  crearFacturaPorMedicamentos(idCliente: number, idMedicamentos: number[], factura: FacturaCL): Observable<FacturaCL> {
    let params = new HttpParams().set('idCliente', idCliente);
    idMedicamentos.forEach(id => {
      params = params.append('idMedicamentos', id);
    });
    return this.http.post<FacturaCL>(`${this.baseUrl}/crear/medicamentos`, factura, { params });
  }

  pagarFactura(id: number): Observable<FacturaCL> {
    return this.http.put<FacturaCL>(`${this.baseUrl}/pagar/${id}`, {});
  }

  pagarFacturas(idsFacturas: number[]): Observable<string> {
    let params = new HttpParams();
    idsFacturas.forEach(id => {
      params = params.append('idsFacturas', id);
    });
    return this.http.put(`${this.baseUrl}/pagar/facturas`, {}, {
    params,
    responseType: 'text'
});
  }

}
