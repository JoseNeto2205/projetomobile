import { Injectable } from '@angular/core';

interface Senha {
  tipo: string;
  numero: string;
}

@Injectable({
  providedIn: 'root',
})
export class SenhasService {
  public inputNovaSenha: string = '';
  public senhas: Senha[] = [];

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;

  public senhaChamada: boolean = false;
  public senhasChamadas: Senha[] = [];

  somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
  }
  somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
  }
  somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
  }

  novaSenha(tipoSenha: string = '') {
    const data = new Date();
    let senha: Senha = { tipo: '', numero: '' };
    if (tipoSenha == 'SG') {
      this.somaGeral();
      senha = {
        tipo: 'SG',
        numero:
          data.getFullYear().toString().substring(2, 4) +
          (data.getMonth() + 1).toString().padStart(2, '0') +
          data.getDate().toString().padStart(2, '0') +
          '-' +
          tipoSenha +
          this.senhasGeral.toString().padStart(2, '0'),
      };
    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      senha = {
        tipo: 'SP',
        numero:
          data.getFullYear().toString().substring(2, 4) +
          (data.getMonth() + 1).toString().padStart(2, '0') +
          data.getDate().toString().padStart(2, '0') +
          '-' +
          tipoSenha +
          this.senhasPrior.toString().padStart(2, '0'),
      };
    } else if (tipoSenha == 'SE') {
      this.somaExame();
      senha = {
        tipo: 'SE',
        numero:
          data.getFullYear().toString().substring(2, 4) +
          (data.getMonth() + 1).toString().padStart(2, '0') +
          data.getDate().toString().padStart(2, '0') +
          '-' +
          tipoSenha +
          this.senhasExame.toString().padStart(2, '0'),
      };
    }
    this.senhas.push(senha);
    console.log(this.senhas);
  }

  chamarSenha() {
    if (this.senhas.length > 0) {
      for (let i = 0; i < this.senhas.length; i++) {
        const senha = this.senhas[i];
        if (senha.tipo == 'SP') {
          this.inputNovaSenha = senha.numero;
          this.senhas.splice(i, 1); // Remove a senha do array original
          this.senhasChamadas.push(senha); // Adiciona a senha chamada ao array de senhas chamadas
          this.senhaChamada = true;
          return;
        }
      }
      for (let i = 0; i < this.senhas.length; i++) {
        const senha = this.senhas[i];
        if (senha.tipo == 'SE') {
          this.inputNovaSenha = senha.numero;
          this.senhas.splice(i, 1); // Remove a senha do array original
          this.senhasChamadas.push(senha); // Adiciona a senha chamada ao array de senhas chamadas
          this.senhaChamada = true;
          return;
        }
      }
      if (this.senhas.length > 0) {
        const senha = this.senhas[0]; // A próxima senha é uma senha geral
        this.inputNovaSenha = senha.numero;
        this.senhas.shift(); // Remove a senha do array original
        this.senhasChamadas.push(senha); // Adiciona a senha chamada ao array de senhas chamadas
        this.senhaChamada = true;
      } else {
        this.inputNovaSenha = 'Não há mais senhas';
        this.senhaChamada = false;
      }
    } else {
      this.inputNovaSenha = 'Não há mais senhas';
      this.senhaChamada = false;
    }
  }
}
