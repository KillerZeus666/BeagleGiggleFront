import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private jsonUrl = 'assets/productos.json'; // Ruta a tu archivo JSON

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.jsonUrl);
  }
}
