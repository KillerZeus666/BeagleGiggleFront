import { Component, OnInit } from '@angular/core';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-mascotas-cliente',
  templateUrl: './ver-mascotas-cliente.component.html',
  styleUrls: ['./ver-mascotas-cliente.component.css']
})
export class VerMascotasClienteComponent implements OnInit{
  mascotas: MascotaCL[] = [];

  constructor(private mascotaService: MascotaService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void{
    const idCliente = Number(this.route.snapshot.paramMap.get('id'));
    this.mascotaService.getMascotasPorCliente(idCliente).subscribe({
      next: (data) => {
        this.mascotas = data;
      },
      error: (err) => {
        console.error('Error al obtener las mascotas', err);
      }
    });
  }

  mostrarMascota(id: number) {
    this.router.navigate(['/detalles-mascota', id]);
  }
}

