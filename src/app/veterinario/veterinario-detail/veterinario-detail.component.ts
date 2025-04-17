import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VeterinarioCL } from 'src/app/model/veterinario-cl';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario-detail',
  templateUrl: './veterinario-detail.component.html',
  styleUrls: ['./veterinario-detail.component.css']
})
export class VeterinarioDetailComponent implements OnInit {
  veterinario!: VeterinarioCL;

  constructor(
    private route: ActivatedRoute, 
    private veterinarioService: VeterinarioService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.veterinarioService.obtenerVeterinarioPorId(id).subscribe(veterinario => {
      this.veterinario = veterinario;
    });
  }
}