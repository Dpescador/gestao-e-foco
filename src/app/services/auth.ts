import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  // Usuário e senha de teste fixos
  private usuarioTeste = {
    email: 'dpescador@gmail.com',
    senha: '123'
  };

  // Realiza a validação das credenciais digitadas pelo usuário
  validarAcesso(emailDigitado: string, senhaDigitada: string): boolean {
    if (emailDigitado === this.usuarioTeste.email && senhaDigitada === this.usuarioTeste.senha) {
      this.login(); // Salva o token no localStorage
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('user_token');
    }
    return false;
  }

  private login() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user_token', 'token-teste-gestao-em-foco');
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user_token');
    }
  }
}
