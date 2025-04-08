import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from '../mascota';
import { MascotaService } from 'src/app/service/mascota.service';
@Component({
  selector: 'app-mascota-detail',
  templateUrl: './mascota-detail.component.html',
  styleUrls: ['./mascota-detail.component.css']
})
export class MascotaDetailComponent implements OnInit {
  mascota!: Mascota; // La mascota seleccionada

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService // Inyectar servicio para obtener datos
  ) {}

  ngOnInit(): void {
    console.log("ngOnInit de detail");
    
    // Obtener el ID desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Buscar la mascota por ID (simulado con un servicio)
    this.mascotaService.getMascota(id).subscribe(mascota => {
      this.mascota = mascota;
    });
  }
}
