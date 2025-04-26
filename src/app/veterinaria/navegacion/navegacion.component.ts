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
  userPhoto = 'https://example.com/path-to-your-image.jpg';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    this.userName = this.authService.getUserName();
    this.userPhoto = this.authService.getUserPhoto();
  }

  ngAfterViewInit(): void {
    // Código de navegación (sin cambios)
    const listItems = document.querySelectorAll<HTMLLIElement>('.navigation li');
    const toggle = document.querySelector<HTMLElement>('.toggle');
    const navigation = document.querySelector<HTMLElement>('.navigation');
    const main = document.querySelector<HTMLElement>('.main');

    const activeLink = function (this: HTMLLIElement): void {
      listItems.forEach((item) => item.classList.remove('hovered'));
      this.classList.add('hovered');
    };

    listItems.forEach((item) =>
      item.addEventListener('mouseover', activeLink)
    );

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
}
