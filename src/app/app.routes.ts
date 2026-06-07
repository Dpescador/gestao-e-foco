import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login'; // ajuste os caminhos se necessário
import { HomeComponent } from './Pages/home/home';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth';

// Criando o Guard diretamente aqui (padrão funcional do Angular moderno)
const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Deixa passar se estiver logado
  } else {
    router.navigate(['/login']); // Redireciona para o login se não estiver
    return false;
  }
};

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] }, // Rota Protegida aqui
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
