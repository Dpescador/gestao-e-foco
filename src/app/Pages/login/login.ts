import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  // Captura os elementos de input do HTML
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('senhaInput') senhaInput!: ElementRef;
  esconderSenha: boolean = true; // Para controlar a visibilidade da senha
  exibirModalErro: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

fazerLogin(event: Event) {
  event.preventDefault();

  // Pega os valores reais digitados nos campos
  const email = this.emailInput.nativeElement.value;
  const senha = this.senhaInput.nativeElement.value;

  // Valida com o serviço de teste
  if (this.authService.validarAcesso(email, senha)) {
    this.router.navigate(['/home']); // Vai para o painel se estiver correto
  } else {
      this.exibirModalErro = true; 
  }
}

}
