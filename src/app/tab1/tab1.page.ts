import { Component } from '@angular/core';
import { PokeAPIService } from '../services/pokeapi.service';
import { ViaCepService } from '../services/via-cep.service';
import { CapturedPokemonsService } from '../services/captured-pokemons.service';

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
    sprite: '',
    victories: 0,
    defeats: 0,
    draws: 0,
  };
  static pokemonAbilities: number = 2;

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

      this.battleWithRandomPokemon();
    });
  }

  private battleWithRandomPokemon() {
    this.pokeAPIService.getPokeAPIService().subscribe((opponent: any) => {
      const opponentAbilitiesCount = opponent.abilities.length;
      const pokemonAbilitiesCount = this.pokemon.abilities.length;

      if (pokemonAbilitiesCount > opponentAbilitiesCount) {
        this.pokemon.victories++;
      } else if (pokemonAbilitiesCount < opponentAbilitiesCount) {
        this.pokemon.defeats++;
      } else {
        this.pokemon.draws++;
      }

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
