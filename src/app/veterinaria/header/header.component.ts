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
    this.userType = this.authService.getUserType();
    this.userName = this.authService.getUserName();
    this.userPhoto = this.authService.getUserPhoto();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']); // <--- redirige elegantemente
  }
}
