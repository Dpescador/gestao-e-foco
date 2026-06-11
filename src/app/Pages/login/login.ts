import { Component, ElementRef, ViewChild, inject, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

/**
 * Componente responsável pelo gerenciamento da tela de login do usuário.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  encapsulation: ViewEncapsulation.None 
})
export class LoginComponent {
  // Injeta os serviços utilizando o padrão funcional moderno do Angular
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // Força a atualização da tela
  
  /** Referência ao elemento de input do e-mail no template HTML. */
  @ViewChild('emailInput') emailInput!: ElementRef;
  
  /** Referência ao elemento de input da senha no template HTML. */
  @ViewChild('senhaInput') senhaInput!: ElementRef;
  
  /** Controla o estado de visibilidade do texto da senha (oculto ou visível). */
  esconderSenha: boolean = true; 
  
  /** Controla a exibição do modal de alerta para credenciais inválidas. */
  exibirModalErro: boolean = false;

  /** Controla o estado de carregamento (spinner) durante a tentativa de autenticação. */
  carregando: boolean = false;

  /**
   * Processa a tentativa de autenticação do usuário.
   */
  fazerLogin(event: Event) {
    event.preventDefault();

    // Bloqueia novas execuções se uma requisição já estiver em andamento
    if (this.carregando) {
      return;
    }

    // Reseta o estado do modal antes de iniciar uma nova tentativa
    this.exibirModalErro = false;
    this.carregando = true;
    this.cdr.detectChanges(); // Avisa o HTML para mostrar o "Aguarde..." imediatamente

    const email = this.emailInput.nativeElement.value;
    const senha = this.senhaInput.nativeElement.value;

    // Simula o tempo de resposta de uma API externa (1.5 segundos)
    setTimeout(() => {
      try {
        // Executa a validação de credenciais através do serviço de autenticação
        const loginSucesso = this.authService.validarAcesso(email, senha);

        if (loginSucesso) {
          this.router.navigate(['/home']); 
        } else {
          // Desativa o carregamento e abre o modal em caso de dados incorretos
          this.carregando = false;
          this.exibirModalErro = true; 
        }
      } catch (error) {
        // Se houver qualquer falha ou quebra no AuthService, destrava a tela com segurança
        console.error('Erro inesperado no processo de login:', error);
        this.carregando = false;
        this.exibirModalErro = true;
      } finally {
        // Força o Angular 17+ a renderizar as diretivas @if na tela agora mesmo
        this.cdr.detectChanges();
      }
    }, 1500);
  }
}
