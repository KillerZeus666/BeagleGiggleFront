import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Beagle Giggle';
  userType = 'Administrador';

  constructor() {
    console.log("User Type:", this.userType);
  }
}