// navegacion.component.ts
import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
  encapsulation: ViewEncapsulation.None, // 👈 Esto hace que los estilos no estén encapsulados
})
export class NavegacionComponent implements AfterViewInit {
  userType: string | null = null;
  userName: string = '';
  //idVeterinario:number;
  userPhoto = 'https://example.com/path-to-your-image.jpg';
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    this.userName = this.authService.getUserName();
    this.userPhoto = this.authService.getUserPhoto();
    
  }

  ngAfterViewInit(): void {
    const listItems = document.querySelectorAll<HTMLLIElement>('.navigation li');
    const toggle = document.querySelector<HTMLElement>('.toggle');
    const navigation = document.querySelector<HTMLElement>('.navigation');
    const main = document.querySelector<HTMLElement>('.main');
  
    // Para el efecto de hover (cuando pasas el mouse)
    const hoverLink = function (this: HTMLLIElement): void {
      listItems.forEach((item) => item.classList.remove('hovered'));
      this.classList.add('hovered');
    };
  
    // Para el efecto de selección (cuando haces click)
    const activeLink = function (this: HTMLLIElement): void {
      listItems.forEach((item) => item.classList.remove('active'));
      this.classList.add('active');
    };
  
    // Asignar eventos
    listItems.forEach((item) => {
      item.addEventListener('mouseover', hoverLink); // mouseover = hover
      item.addEventListener('click', activeLink);     // click = active
    });
  
    // Toggle del menú
    toggle?.addEventListener('click', () => {
      navigation?.classList.toggle('active');
      main?.classList.toggle('active');
    });
  }
  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => {
      window.location.reload(); // 🚀 Esto fuerza el refresco completo de la página
    });
  }

  getPerfilLink(): string[] {
    if (this.userType === 'Admin') {
      return ['/detalles-admin/ 1']; // Ruta para admin
    } else if (this.userType === 'Veterinario') {
      return ['/detalles-veterinario/2']; // Ruta para veterinario
    } else if (this.userType === 'Cliente') {
      return ['/detalles-cliente/2']; // Ruta para cliente
    }
    return ['/']; // Ruta por defecto en caso de no estar definido
  }

  navegarCitasVeterinario():void{
    this.router.navigate(['/citas-veterinario/2'])
  }
}
