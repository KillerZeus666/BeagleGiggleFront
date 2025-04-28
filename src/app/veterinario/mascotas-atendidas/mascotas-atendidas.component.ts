import { Component, OnInit } from '@angular/core';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MascotaService } from 'src/app/service/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';
@Component({
  selector: 'app-mascotas-atendidas',
  templateUrl: './mascotas-atendidas.component.html',
  styleUrls: ['./mascotas-atendidas.component.css']
})
export class MascotasAtendidasComponent implements OnInit {
  mascotaList: MascotaCL[] = [];

  constructor(private mascotaService: MascotaService, private router: Router, private veterinarioService: VeterinarioService, private route: ActivatedRoute){}

  ngOnInit(): void{
    const idVeterinario = Number(this.route.snapshot.paramMap.get('id'));
      this.veterinarioService.obtenerMascotasAtendidas(idVeterinario).subscribe({
        next: (mascotas: MascotaCL[]) => {
          this.mascotaList = mascotas;
        },
        error: (err) => {
          console.error('Error al cargar las mascotas:', err)
        }
      });
  }

  mostrarMascota(id: number) {
    this.router.navigate(['/detalles-mascota', id]);
  }
}
