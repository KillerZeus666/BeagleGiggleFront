import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/producto';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      this.productos = data.map(p => {
        let imagenes = [];
        try {
          imagenes = typeof p.images === 'string'
            ? JSON.parse(p.images.replace(/'/g, '"'))
            : p.images;
        } catch (e) {
          console.error('Error al parsear imágenes', p.images);
        }

        return {
          ...p,
          images: imagenes
        };
      });
    });
  }

}