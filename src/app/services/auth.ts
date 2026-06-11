import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Serviço responsável pelo controle de autenticação e gerenciamento da sessão do usuário.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** Identificador da plataforma para garantir compatibilidade com SSR. */
  private platformId = inject(PLATFORM_ID);

  /** Dados do usuário de testes cadastrado no sistema. */
  private usuarioTeste = {
    nome: 'Diego Pescador', // Adicionado para alimentar a tela Home
    email: 'dpescador@gmail.com',
    senha: '123'
  };

  /**
   * Realiza a validação das credenciais digitadas pelo usuário.
   * @param emailDigitado E-mail inserido no formulário.
   * @param senhaDigitada Senha inserida no formulário.
   * @returns {boolean} true se as credenciais forem válidas; caso contrário, false.
   */
  validarAcesso(emailDigitado: string, senhaDigitada: string): boolean {
    if (emailDigitado === this.usuarioTeste.email && senhaDigitada === this.usuarioTeste.senha) {
      this.login(); // Salva o token no localStorage
      return true;
    }
    return false;
  }

  /**
   * Verifica se o usuário possui um token de sessão válido armazenado no navegador.
   * @returns {boolean} true se estiver autenticado; caso contrário, false.
   */
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('user_token');
    }
    return false;
  }

  /**
   * Retorna os dados do usuário atualmente logado na sessão caso ele esteja autenticado.
   * @returns Objeto com os dados do usuário ou null se não houver sessão ativa.
   */
  getUsuarioLogado() {
    if (this.isLoggedIn()) {
      // Como é um teste fixo, retornamos o objeto de teste. 
      // Em uma API real, você salvaria e buscaria os dados do usuário no localStorage ou State.
      return { nome: this.usuarioTeste.nome, email: this.usuarioTeste.email };
    }
    return null;
  }

  /**
   * Cria a sessão do usuário persistindo o token de segurança no localStorage.
   */
  private login() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user_token', 'token-teste-gestao-em-foco');
    }
  }

  /**
   * Encerra a sessão do usuário removendo o token de segurança do localStorage.
   */
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user_token');
    }
  }
}
