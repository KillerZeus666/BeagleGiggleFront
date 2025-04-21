import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

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

  constructor(private authService: AuthService) {}

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
    location.reload(); // o navegar al login
  }
}
