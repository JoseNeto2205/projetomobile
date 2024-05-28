import { Component } from '@angular/core';
import { PokeAPIService } from '../services/pokeapi.service';
import { ViaCepService } from '../services/via-cep.service';
import { CapturedPokemonsService } from '../services/captured-pokemons.service';
import { Tab2Page } from '../tab2/tab2.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  areaBuscarPokemon: string = '';
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
    sprite: '',
    victories: 0,
    defeats: 0,
    draws: 0,
  };
  static pokemonAbilities: number = 0;

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCepService,
    private capturedPokemonsService: CapturedPokemonsService
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
      this.pokemon.height = data.height;
      this.pokemon.weight = data.weight;
      this.pokemon.sprite = data.sprites.other['dream_world'].front_default;

      Tab1Page.pokemonAbilities = this.pokemon.abilities.length;

      const newPokemon = {
        name: this.pokemon.name,
        abilities: this.pokemon.abilities.length,
        height: this.pokemon.height,
        weight: this.pokemon.weight,
        sprite: this.pokemon.sprite,
        victories: this.pokemon.victories,
        defeats: this.pokemon.defeats,
        draws: this.pokemon.draws,
      };

      this.capturedPokemonsService.addPokemon(newPokemon);
    });
  }

  static getAbilitiesCount(): number {
    return Tab1Page.pokemonAbilities;
  }
}
