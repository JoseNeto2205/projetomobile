import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { Senha } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(public senhasService: SenhasService) {}

  iconName(tipo: string): string {
    switch (tipo) {
      case 'SG':
        return 'accessibility';
      case 'SP':
        return 'bandage';
      case 'SE':
        return 'document';
      default:
        return '';
    }
  }

  iconColor(tipo: string): string {
    switch (tipo) {
      case 'SG':
        return 'primary';
      case 'SP':
        return 'success';
      case 'SE':
        return 'warning';
      default:
        return '';
    }
  }

  chamarProximaSenha() {
    if (this.senhasService.senhas.length > 0) {
      const senhaProxima = this.senhasService.senhas.shift(); // Remove a primeira senha da lista de senhas geradas
      if (senhaProxima) {
        this.senhasService.registrarSenhaChamada(senhaProxima); // Registra a senha chamada na lista de senhas atendidas
      }
    } else {
      this.senhasService.inputNovaSenha = 'Não há mais senhas';
      this.senhasService.senhaChamada = false;
    }
  }
}
