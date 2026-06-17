import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Navbar } from "../../_components/navbar/navbar"; 
import { Footer } from '../../_components/footer/footer';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [Navbar, Footer]
})
export class HomeComponent implements OnInit {
  // Injeta os serviços necessários de forma funcional (padrão Angular moderno)
  private authService = inject(AuthService);
  private router = inject(Router);

  /** 
   * SOLUÇÃO DO ERRO: Declaração da propriedade que o HTML estava procurando.
   * Inicializa como uma string vazia.
   */
  nomeUsuario: string = '';

  ngOnInit() {
    // Busca os dados do usuário usando o método público do AuthService
    const usuario = this.authService.getUsuarioLogado();
    
    if (usuario) {
      // Alimenta a propriedade com o nome do usuário ('Diego Pescador')
      this.nomeUsuario = usuario.nome;
    }
  }

  /**
   * Encerra a sessão e limpa o token de autenticação.
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
