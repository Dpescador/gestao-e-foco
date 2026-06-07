import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  logout() {
    // Aqui você limparia tokens de autenticação (localStorage/sessionStorage) no futuro
    this.router.navigate(['/login']);
  }
}
