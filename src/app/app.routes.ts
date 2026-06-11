import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login';
import { HomeComponent } from './Pages/home/home';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth';

/**
 * Guarda de Rotas Funcional (AuthGuard).
 * 
 * Utiliza o padrão moderno do Angular (injetores de dependência funcionais) 
 * para interceptar a navegação e validar se o usuário possui uma sessão ativa.
 * 
 * @returns {boolean} 'true' se o acesso for autorizado; caso contrário, redireciona e retorna 'false'.
 */
const authGuard = () => {
  // Injeta de forma funcional os serviços necessários (substitui a necessidade de classes e construtores)
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica se o usuário possui autenticação válida no sistema
  if (authService.isLoggedIn()) {
    return true; // Acesso permitido, o ciclo de navegação continua para a rota alvo
  } else {
    // Usuário não autenticado: força o redirecionamento imediato para a tela de login
    router.navigate(['/login']); 
    return false; // Bloqueia a ativação da rota atual
  }
};

/**
 * Matriz de Configuração de Rotas da Aplicação.
 * 
 * Mapeia os caminhos de URL (URIs) aos seus respectivos componentes visuais,
 * aplicando regras de proteção de acesso e redirecionamento inicial.
 */
export const routes: Routes = [
  // Rota Pública: Tela de acesso ao sistema
  { 
    path: 'login', 
    component: LoginComponent 
  },
  
  // Rota Protegida: Painel principal, exige validação prévia do authGuard
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [authGuard] 
  },
  
  // Rota Raiz (Padrão): Redireciona o acesso inicial (`/`) para a tela de login
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  }
];
