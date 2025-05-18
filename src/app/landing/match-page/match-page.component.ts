import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MascotaService } from 'src/app/service/mascota.service';

interface Filtros {
  edadMin: number | null;
  edadMax: number | null;
  raza: string;
  pesoMax: number | null;
}

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css']
})
export class MatchPageComponent implements OnInit {
  mascotaList: MascotaCL[] = [];
  mascotasFiltradas: MascotaCL[] = [];
  indiceActual: number = 0;

  filtros: Filtros = {
    edadMin: null,
    edadMax: null,
    raza: '',
    pesoMax: null
  };

  listaOriginal: MascotaCL[] = [];

  constructor(
    private mascotaService: MascotaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.mascotaService.findAll().subscribe({
      next: (mascotas: MascotaCL[]) => {
        this.mascotaList = mascotas;
        this.listaOriginal = [...mascotas];  // guardamos la lista original
        this.mascotasFiltradas = [...mascotas];
        this.indiceActual = 0;
      },
      error: (err) => {
        console.error('Error al cargar las mascotas:', err);
      }
    });
  }

  aplicarFiltros(): void {
    this.mascotasFiltradas = this.listaOriginal.filter(mascota => {
      return (!this.filtros.raza || mascota.raza === this.filtros.raza) &&
             (!this.filtros.edadMin || mascota.edad >= this.filtros.edadMin) &&
             (!this.filtros.edadMax || mascota.edad <= this.filtros.edadMax) &&
             (!this.filtros.pesoMax || mascota.peso <= this.filtros.pesoMax);
    });
    this.indiceActual = 0;
  }

  limpiarFiltros(): void {
    this.filtros = {
      edadMin: null,
      edadMax: null,
      raza: '',
      pesoMax: null
    };
    this.mascotasFiltradas = [...this.listaOriginal];
    this.indiceActual = 0;
  }

  meGusta(): void {
    const mascota = this.mascotasFiltradas[this.indiceActual];
    console.log('Me gusta:', mascota);
    this.pasarSiguiente();
  }

  noMeGusta(): void {
    const mascota = this.mascotasFiltradas[this.indiceActual];
    console.log('No me gusta:', mascota);
    this.pasarSiguiente();
  }

  pasarSiguiente(): void {
    if (this.indiceActual < this.mascotasFiltradas.length - 1) {
      this.indiceActual++;
    } else {
      alert('No hay más mascotas.');
    }
  }

  mostrarMascota(id: number): void {
    this.router.navigate(['/detalles-mascota', id]);
  }

eliminarFiltro(campo: keyof Filtros): void {
  if (typeof this.filtros[campo] === 'string') {
    (this.filtros[campo] as string) = '';
  } else {
    (this.filtros[campo] as number | null) = null;
  }
  this.aplicarFiltros();
}


get mascotaActual() {
  return this.mascotasFiltradas[this.indiceActual];
}

darLike() {
  // Aquí puedes guardar en favoritos, por ejemplo
  console.log('Like a', this.mascotaActual.nombre);
  this.siguienteMascota();
}

darDislike() {
  console.log('Dislike a', this.mascotaActual.nombre);
  this.siguienteMascota();
}

siguienteMascota() {
  if (this.indiceActual < this.mascotasFiltradas.length - 1) {
    this.indiceActual++;
  } else {
    // Reinicias o haces algo especial
    console.log('Fin de la lista');
  }
}

}
