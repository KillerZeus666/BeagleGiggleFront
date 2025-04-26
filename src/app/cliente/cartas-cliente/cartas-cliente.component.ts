import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cartas-cliente',
  templateUrl: './cartas-cliente.component.html',
  styleUrls: ['./cartas-cliente.component.css']
})
export class CartasClienteComponent {
  @Input() cantidadMascotas: number = 0; // <- Recibir cantidad por input
}
