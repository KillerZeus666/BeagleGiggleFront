import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router'; // <--- importa el Router

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userType: string | null = null;
  userName: string = '';
  userPhoto: string = '';
  isMenuOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router // <--- inyecta el Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userType = user.tipo;
    this.userName = user.nombre;
    this.userPhoto = user.foto || 'https://w7.pngwing.com/pngs/946/556/png-transparent-computer-icons-login-user-profile-client-smiley-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B8-windows-10-thumbnail.png';  
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => {
      window.location.reload(); 
    });
  }
  
}
