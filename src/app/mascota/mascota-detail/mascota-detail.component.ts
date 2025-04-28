import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota-detail',
  templateUrl: './mascota-detail.component.html',
  styleUrls: ['./mascota-detail.component.css']
})
export class MascotaDetailComponent implements OnInit {
  mascota!: MascotaCL; // La mascota seleccionada

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  mostrarCliente(event: Event, idCliente: number) {
    event.stopPropagation(); // 👉 Esto evita que también se dispare el click de la fila
    this.router.navigate(['/detalles-cliente', idCliente]);
  }
}
