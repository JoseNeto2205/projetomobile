import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/pokeapi.service';
import { Tab1Page } from '../tab1/tab1.page';
import { CapturedPokemonsService } from '../services/captured-pokemons.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  pokemonData: any;
  pokemonTitleColor: string = 'black';
  pokemonStatus: string = '';
  static pokemonAbilities: number = 0;

  constructor(
    private pokeAPIService: PokeAPIService,
    private capturedPokemonsService: CapturedPokemonsService
  ) {}

  ngOnInit() {
    this.loadRandomPokemon();
  }

  loadRandomPokemon() {
    this.pokeAPIService.getPokeAPIService().subscribe(
      (pokemonData: any) => {
        this.pokemonData = pokemonData;
        this.compareAbilities();
      },
      (error) => {
        console.error('Error loading random Pokemon:', error);
      }
    );
  }

  private compareAbilities() {
    const tab1AbilitiesCount = Tab1Page.getAbilitiesCount();
    const tab2AbilitiesCount = this.pokemonData.abilities.length;

    let result = '';

    switch (true) {
      case tab2AbilitiesCount === tab1AbilitiesCount:
        this.setPokemonStatus('yellow', 'Empate');
        result = 'Empate';
        break;
      case tab2AbilitiesCount > tab1AbilitiesCount:
        this.setPokemonStatus('green', 'Ganhou');
        result = 'Ganhou';
        break;
      case tab2AbilitiesCount < tab1AbilitiesCount:
        this.setPokemonStatus('red', 'Perdeu');
        result = 'Perdeu';
        break;
    }

    this.updateCapturedPokemonResult(result);
  }

  private setPokemonStatus(color: string, status: string) {
    this.pokemonTitleColor = color;
    this.pokemonStatus = status;
  }

  private updateCapturedPokemonResult(result: string) {
    const capturedPokemons = this.capturedPokemonsService.getPokemons();
    const lastCapturedPokemon = capturedPokemons[capturedPokemons.length - 1];

    switch (result) {
      case 'Ganhou':
        lastCapturedPokemon.defeats++;
        break;
      case 'Perdeu':
        lastCapturedPokemon.victories++;
        break;
      case 'Empate':
        lastCapturedPokemon.draws++;
        break;
    }
  }

  static getAbilitiesCount(): number {
    return Tab2Page.pokemonAbilities;
  }
}
