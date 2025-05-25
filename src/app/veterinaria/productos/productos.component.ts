import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/producto';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})export class ProductosComponent implements OnInit {
  productos: (Producto & { PriceCOP: number, images: string[], categoriaDetectada: string })[] = [];
  todosLosProductos: (Producto & { PriceCOP: number, images: string[], categoriaDetectada: string })[] = [];
  tasaCambio: number = 3900;
  favoritos: Producto[] = [];

  // Variables para filtros
  categoriaSeleccionada: string = '';
  precioMaximo: number | null = null;
  filtrarFavoritos: boolean = false;  // Nueva variable para filtro de favoritos
  categorias: string[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      const productosProcesados = data.map(p => {
        let imagenes: string[] = [];
        try {
          imagenes = typeof p.images === 'string'
            ? JSON.parse(p.images.replace(/'/g, '"'))
            : p.images;
        } catch (e) {
          console.error('Error al parsear imágenes', p.images);
        }

        const precioString = p.Price.toString().replace(/[^0-9.]/g, '');
        const precioNumero = parseFloat(precioString);

        let categoria = '';
        const breadcrumbLower = (p.breadcrumb || '').toLowerCase();
        if (breadcrumbLower.includes('dog')) {
          categoria = 'Perros';
        } else if (breadcrumbLower.includes('cat')) {
          categoria = 'Gatos';
        } else {
          categoria = 'Otros';
        }

        return {
          ...p,
          images: imagenes,
          PriceCOP: isNaN(precioNumero) ? 0 : precioNumero * this.tasaCambio,
          categoriaDetectada: categoria
        };
      });

      this.todosLosProductos = productosProcesados.filter(p => p.images.length > 0);
      this.productos = [...this.todosLosProductos];
      this.categorias = [...new Set(this.todosLosProductos.map(p => p.categoriaDetectada))];
    });
  }

  filtrarProductos() {
    this.productos = this.todosLosProductos.filter(p => {
      const coincideCategoria = this.categoriaSeleccionada ? p.categoriaDetectada === this.categoriaSeleccionada : true;
      const coincidePrecio = this.precioMaximo ? p.PriceCOP <= this.precioMaximo : true;
      const coincideFavorito = this.filtrarFavoritos ? this.esFavorito(p) : true;

      return coincideCategoria && coincidePrecio && coincideFavorito;
    });
  }

  resetFiltros() {
    this.categoriaSeleccionada = '';
    this.precioMaximo = null;
    this.filtrarFavoritos = false;
    this.productos = [...this.todosLosProductos];
  }

  esFavorito(producto: Producto): boolean {
    return this.favoritos.some(p => p.name === producto.name);
  }

  toggleFavorito(producto: Producto): void {
    if (this.esFavorito(producto)) {
      this.favoritos = this.favoritos.filter(p => p.uniq_id !== producto.uniq_id);
    } else {
      this.favoritos.push(producto);
    }
  }
}
