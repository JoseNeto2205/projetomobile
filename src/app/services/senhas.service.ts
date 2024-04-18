import { Injectable } from '@angular/core';

export interface Senha {
  tipo: string;
  numero: string;
  dataHoraGeracao: Date; // Adicionando o campo de data e hora de geração
  tempoDecorrido?: string; // Adicionando o campo de tempo decorrido
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
    const dataHoraGeracao = new Date(); // Armazenar a data e hora de geração
    let senha: Senha = {
      tipo: '',
      numero: '',
      dataHoraGeracao: dataHoraGeracao,
    };
    if (tipoSenha == 'SG') {
      this.somaGeral();
      senha = {
        tipo: 'SG',
        numero:
          dataHoraGeracao.getFullYear().toString().substring(2, 4) +
          (dataHoraGeracao.getMonth() + 1).toString().padStart(2, '0') +
          dataHoraGeracao.getDate().toString().padStart(2, '0') +
          '-' +
          tipoSenha +
          this.senhasGeral.toString().padStart(2, '0'),
        dataHoraGeracao: dataHoraGeracao,
      };
    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      senha = {
        tipo: 'SP',
        numero:
          dataHoraGeracao.getFullYear().toString().substring(2, 4) +
          (dataHoraGeracao.getMonth() + 1).toString().padStart(2, '0') +
          dataHoraGeracao.getDate().toString().padStart(2, '0') +
          '-' +
          tipoSenha +
          this.senhasPrior.toString().padStart(2, '0'),
        dataHoraGeracao: dataHoraGeracao,
      };
    } else if (tipoSenha == 'SE') {
      this.somaExame();
      senha = {
        tipo: 'SE',
        numero:
          dataHoraGeracao.getFullYear().toString().substring(2, 4) +
          (dataHoraGeracao.getMonth() + 1).toString().padStart(2, '0') +
          dataHoraGeracao.getDate().toString().padStart(2, '0') +
          '-' +
          tipoSenha +
          this.senhasExame.toString().padStart(2, '0'),
        dataHoraGeracao: dataHoraGeracao,
      };
    }
    this.senhas.push(senha);
    console.log(this.senhas);
  }

  chamarSenha() {
    const tiposPrioritarios = ['SP', 'SE', 'SG'];

    for (const tipo of tiposPrioritarios) {
      const senhaIndex = this.senhas.findIndex((senha) => senha.tipo === tipo);
      if (senhaIndex !== -1) {
        const senha = this.senhas.splice(senhaIndex, 1)[0];
        this.registrarSenhaChamada(senha);
        return;
      }
    }

    this.inputNovaSenha = 'Não há mais senhas';
    this.senhaChamada = false;
  }

  registrarSenhaChamada(senha: Senha) {
    const dataHoraChamada = new Date();
    if (senha.dataHoraGeracao) {
      // Verifica se senha.dataHoraGeracao é definido
      const tempoDecorrido = this.calcularTempoDecorrido(
        senha.dataHoraGeracao,
        dataHoraChamada
      );
      senha.tempoDecorrido = tempoDecorrido;
    }
    this.senhasChamadas.push(senha);
    this.inputNovaSenha = senha.numero;
    this.senhaChamada = true;
  }

  calcularTempoDecorrido(dataHoraInicio: Date, dataHoraFim: Date): string {
    const diffMs = Math.abs(dataHoraFim.getTime() - dataHoraInicio.getTime());
    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    return `${diffMinutes} minutos`;
  }
}
