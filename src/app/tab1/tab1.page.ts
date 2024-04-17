import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
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
}
