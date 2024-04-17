import { Injectable } from '@angular/core';

interface SenhasArray {
  SG: string[];
  SP: string[];
  SE: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  public inputNovaSenha: string = '';
  public senhasArray: SenhasArray = {
    SG:[],
    SP:[],
    SE:[]
  }

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;

  public senhaChamada: boolean = false;

  somaGeral(){this.senhasGeral++;this.senhasTotal++;};
  somaPrior(){this.senhasPrior++;this.senhasTotal++;};
  somaExame(){this.senhasExame++;this.senhasTotal++;};

  

  novaSenha(tipoSenha: string = ''){
    const data = new Date();
    if (tipoSenha == 'SG'){
      this.somaGeral();
      this.inputNovaSenha =
        data.getFullYear().toString().substring(2,4)+
        (data.getMonth()+1).toString().padStart(2,'0')+
        data.getDate().toString().padStart(2,'0')+
        '-'+
        tipoSenha +
        (this.senhasArray['SG'].length + 1).toString().padStart(2,'0');
      this.senhasArray.SG.push(this.inputNovaSenha);
      } else if(tipoSenha == 'SP'){
        this.somaPrior();
        this.inputNovaSenha =
          data.getFullYear().toString().substring(2,4)+
          (data.getMonth()+1).toString().padStart(2,'0')+
          data.getDate().toString().padStart(2,'0')+
          '-'+
          tipoSenha +
          (this.senhasArray['SP'].length + 1).toString().padStart(2,'0');
          this.senhasArray.SP.push(this.inputNovaSenha);
      } else if(tipoSenha == 'SE'){
        this.somaExame();
        this.inputNovaSenha =
          data.getFullYear().toString().substring(2,4)+
          (data.getMonth()+1).toString().padStart(2,'0')+
          data.getDate().toString().padStart(2,'0')+
          '-'+
          tipoSenha +
          (this.senhasArray['SE'].length + 1).toString().padStart(2,'0');
          this.senhasArray.SE.push(this.inputNovaSenha);
      }
      console.log(this.senhasArray);
    }

    chamarSenha() {
      if (this.senhasArray.SP.length > 0) {
        // Se houver senhas prioritárias, chama a próxima senha prioritária
        this.inputNovaSenha = this.senhasArray.SP.pop() ?? '';
      } else if (this.senhasArray.SE.length > 0) {
        // Se não houver senhas prioritárias, mas houver senhas de exame, chama a próxima senha de exame
        this.inputNovaSenha = this.senhasArray.SE.pop() ?? '';
      } else if (this.senhasArray.SG.length > 0) {
        // Se não houver senhas prioritárias nem de exame, chama a próxima senha geral
        this.inputNovaSenha = this.senhasArray.SG.pop() ?? '';
      } else {
        // Se não houver mais senhas em nenhuma fila
        this.inputNovaSenha = "Não há mais senhas";
      }

      // Defina senhaChamada como true após chamar a senha
      this.senhaChamada = this.inputNovaSenha !== "Não há mais senhas";
      return;
    }
  }

  



