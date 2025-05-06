import { Component, AfterViewInit, ViewEncapsulation, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavegacionComponent implements AfterViewInit, OnDestroy {
  userType: string | null = null;
  userName: string = '';
  userPhoto = 'https://example.com/path-to-your-image.jpg';

  private toggleClickListener: (() => void) | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    this.userName = this.authService.getUserName();
    this.userPhoto = this.authService.getUserPhoto();
  }

  ngAfterViewInit(): void {
    const listItems = document.querySelectorAll<HTMLLIElement>('.navigation li');
    const toggle = document.querySelector<HTMLElement>('.toggle');

    // Hover efecto
    const hoverLink = function (this: HTMLLIElement): void {
      listItems.forEach((item) => item.classList.remove('hovered'));
      this.classList.add('hovered');
    };

    // Click efecto (active)
    const activeLink = function (this: HTMLLIElement): void {
      listItems.forEach((item) => item.classList.remove('active'));
      this.classList.add('active');
    };

    listItems.forEach((item) => {
      item.addEventListener('mouseover', hoverLink);
      item.addEventListener('click', activeLink);
    });

    // Manejador del toggle (hamburguesa)
    const toggleHandler = () => {
      const navigation = document.querySelector<HTMLElement>('.navigation');
      const allMains = document.querySelectorAll<HTMLElement>('.main');

      // Toggle manual ya que Renderer2 no tiene toggleClass
      if (navigation?.classList.contains('active')) {
        this.renderer.removeClass(navigation, 'active');
      } else {
        this.renderer.addClass(navigation, 'active');
      }

      allMains.forEach((main) => {
        if (main.classList.contains('active')) {
          this.renderer.removeClass(main, 'active');
        } else {
          this.renderer.addClass(main, 'active');
        }
      });
    };

    // Asignar el listener
    if (toggle) {
      toggle.addEventListener('click', toggleHandler);
      this.toggleClickListener = toggleHandler;
    }
  }

  ngOnDestroy(): void {
    const toggle = document.querySelector<HTMLElement>('.toggle');
    if (toggle && this.toggleClickListener) {
      toggle.removeEventListener('click', this.toggleClickListener);
    }
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
