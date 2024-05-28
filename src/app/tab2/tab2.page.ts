import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/pokeapi.service';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  pokemonData: any;
  pokemonTitleColor: string = 'black';
  pokemonStatus: string = '';

  constructor(private pokeAPIService: PokeAPIService) {}

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

    if (tab2AbilitiesCount === tab1AbilitiesCount) {
      this.setPokemonStatus('yellow', 'Empate');
    } else if (tab2AbilitiesCount > tab1AbilitiesCount) {
      this.setPokemonStatus('green', 'Ganhou');
    } else {
      this.setPokemonStatus('red', 'Perdeu');
    }
  }

  private setPokemonStatus(color: string, status: string) {
    this.pokemonTitleColor = color;
    this.pokemonStatus = status;
  }
}
