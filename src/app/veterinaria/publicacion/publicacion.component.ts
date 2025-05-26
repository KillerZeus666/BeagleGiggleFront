import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/model/publicacion';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  publicaciones: Publicacion[] = [];
  nuevaPublicacion: Partial<Publicacion> = {};
  imagenBase64: string = '';
  modoPublicacion: 'perdida' | 'encontrada' = 'perdida';
  filtro: 'todas' | 'perdidas' | 'encontradas' = 'todas';

  ngOnInit() {
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    const data = localStorage.getItem('publicaciones');
    if (data) {
      this.publicaciones = JSON.parse(data);
    }
  }

  guardarPublicacion() {
    const nueva: Publicacion = {
      id: Date.now(),
      nombreMascota: this.nuevaPublicacion.nombreMascota || '',
      descripcion: this.nuevaPublicacion.descripcion || '',
      ultimaVezVisto: this.nuevaPublicacion.ultimaVezVisto || '',
      foto: this.imagenBase64,
      tipo: this.modoPublicacion === 'perdida' ? 'busqueda' : 'hallazgo', // ← aquí
      encontrado: false
    };

    this.publicaciones.push(nueva);
    localStorage.setItem('publicaciones', JSON.stringify(this.publicaciones));
    this.nuevaPublicacion = {};
    this.imagenBase64 = '';
    this.modoPublicacion = 'perdida';
  }


  marcarComoEncontrado(id: number) {
    const pub = this.publicaciones.find(p => p.id === id);
    if (pub) {
      pub.encontrado = true;
      localStorage.setItem('publicaciones', JSON.stringify(this.publicaciones));
    }
  }

  convertirImagen(event: any) {
    const archivo = event.target.files[0];
    const lector = new FileReader();
    lector.onload = () => {
      this.imagenBase64 = lector.result as string;
    };
    lector.readAsDataURL(archivo);
  }

  publicacionesFiltradas() {
    return this.publicaciones.filter(pub => {
      if (this.filtro === 'todas') return true;
      if (this.filtro === 'perdidas') return !pub.encontrado;
      if (this.filtro === 'encontradas') return pub.encontrado;
      return true;
    });
  }

  cambiarModo(modo: 'perdida' | 'encontrada') {
    this.modoPublicacion = modo;
  }

  cambiarFiltro(f: 'todas' | 'perdidas' | 'encontradas') {
    this.filtro = f;
  }
}
