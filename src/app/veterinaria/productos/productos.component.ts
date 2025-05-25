import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/producto';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: (Producto & { PriceCOP: number, images: string[] })[] = [];
  tasaCambio: number = 3900;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      this.productos = data
        .map(p => {
          let imagenes: string[] = [];
          try {
            imagenes = typeof p.images === 'string'
              ? JSON.parse(p.images.replace(/'/g, '"'))
              : p.images;
          } catch (e) {
            console.error('Error al parsear imágenes', p.images);
          }

          // Limpiar el string para dejar solo números y punto decimal
          const precioString = p.Price.toString().replace(/[^0-9.]/g, '');
          const precioNumero = parseFloat(precioString);

          console.log('Precio original:', p.Price, 'Precio limpio:', precioString, 'Precio número:', precioNumero);

          return {
            ...p,
            images: imagenes,
            PriceCOP: isNaN(precioNumero) ? 0 : precioNumero * this.tasaCambio
          };
        })
        .filter(p => p.images && p.images.length > 0);
    });
  }
}
