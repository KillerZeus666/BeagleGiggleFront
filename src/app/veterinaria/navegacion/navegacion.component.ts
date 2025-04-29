// navegacion.component.ts
import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavegacionComponent implements AfterViewInit {
  userType: string | null = null;
  userName: string = '';
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

    // Efecto hover
    const hoverLink = function (this: HTMLLIElement): void {
      listItems.forEach((item) => item.classList.remove('hovered'));
      this.classList.add('hovered');
    };

    // Efecto active
    const activeLink = function (this: HTMLLIElement): void {
      listItems.forEach((item) => item.classList.remove('active'));
      this.classList.add('active');
    };

    // Asignar eventos a los items
    listItems.forEach((item) => {
      item.addEventListener('mouseover', hoverLink);
      item.addEventListener('click', activeLink);
    });

    // Evento del toggle (botón hamburguesa)
    toggle?.addEventListener('click', () => {
      navigation?.classList.toggle('active');
      main?.classList.toggle('active');
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  getPerfilLink(): string[] {
    if (this.userType === 'Admin') {
      return ['/detalles-admin/1'];
    } else if (this.userType === 'Veterinario') {
      return ['/detalles-veterinario/2'];
    } else if (this.userType === 'Cliente') {
      return ['/detalles-cliente/2'];
    }
    return ['/'];
  }

  navegarCitasVeterinario(): void {
    this.router.navigate(['/citas-veterinario/2']);
  }

  navegarTratamientosVeterinario(): void {
    this.router.navigate(['/tratamiento/veterinario/1']);
  }
}
