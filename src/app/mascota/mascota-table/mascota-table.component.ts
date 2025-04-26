import { Component, OnInit } from '@angular/core';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css']
})
export class MascotaTableComponent implements OnInit {
  userType: string | null = null;
  userName: string = '';
  userPhoto = 'https://example.com/path-to-your-image.jpg';
  selectedMascota: MascotaCL | null = null;
  mascotaList: MascotaCL[] = [];
  nombreABuscar: string = '';
  listaMascotas: MascotaCL[] = [];
  User: any; // Variable para almacenar el usuario actual
  todasLasMascotas: any[] = []; // copia original



  constructor(private authService: AuthService, private mascotaService: MascotaService, private router: Router) {}



  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    this.userName = this.authService.getUserName();
    this.userPhoto = this.authService.getUserPhoto();
    this.User = this.authService.getUser(); // Este método debe devolver el objeto completo del usuario


    this.mascotaService.findAll().subscribe({
      next: (mascotas: MascotaCL[]) => {
        this.mascotaList = mascotas;
      },
      error: (err) => {
        console.error('Error al cargar las mascotas:', err);
      }
    });
  }
  
  mostrarMascota(id: number) {
    this.router.navigate(['/detalles-mascota', id]);
  }

  eliminarMascota(mascota: MascotaCL) {
    this.mascotaService.eliminarMascota(mascota.idMascota).subscribe({
      next: (respuesta) => {
        console.log('Mascota eliminada:', respuesta);
        // Recargar la lista de mascotas después de eliminar
        this.mascotaService.findAll().subscribe({
          next: (mascotas: MascotaCL[]) => {
            this.mascotaList = mascotas;
          },
          error: (err) => {
            console.error('Error al recargar las mascotas:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al eliminar la mascota:', err);
      }
    });
  }
  
  abrirFormularioMascota(){
    this.router.navigate(['/crear-mascota']);
  }

  abrirFormularioMascotaEdicion(id:number){
    this.router.navigate(['/editar-mascota',id]);
  }

  buscar() {
    const nombre = this.nombreABuscar.trim();
    
    if (nombre === '') {
      // Si el campo está vacío, muestra todo de nuevo
      this.mascotaService.findAll().subscribe({
        next: (mascotas: MascotaCL[]) => {
          this.mascotaList = mascotas;
        },
        error: (err) => {
          console.error('Error al recargar las mascotas:', err);
        }
      });
    } else {
      this.mascotaService.buscarPorNombre(nombre).subscribe((resultados) => {
        this.mascotaList = resultados;
      });
    }
  }
  
  esAdmin(): boolean {
    return this.User && this.User.tipo === 'Admin'; // Verifica si el usuario es un admin
  }
  
}
