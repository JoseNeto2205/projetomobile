import { Component } from '@angular/core';
import { PokeAPIService } from '../services/pokeapi.service';
import { ViaCepService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };
  pokemon: any = {
    name: '',
    abilities: [],
    height: 0,
    weight: 0,
  };
  static pokemonAbilities: number = 2;

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCepService
  ) {}

  buscarPokemon() {
    this.viaCEPService
      .getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))[
          'logradouro'
        ];
        this.areaBusca.bairro =
          ', ' + JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade =
          ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];
      });

    this.pokeAPIService.getPokeAPIService().subscribe((data: any) => {
      this.pokemon.name = data.name;
      this.pokemon.abilities = data.abilities;
      this.pokemon.height = this.pokeAPIService.getPokemonHeight(data);
      this.pokemon.weight = this.pokeAPIService.getPokemonWeight(data);
      this.pokemon.sprite = data.sprites.other['dream_world'].front_default;
    });
  }

  static getAbilitiesCount(): number {
    return Tab1Page.pokemonAbilities;
  }
}
