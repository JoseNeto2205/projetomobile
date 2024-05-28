import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/pokeapi.service';
import { Tab1Page } from '../tab1/tab1.page';
import { PhotoService } from '../services/photo.service';
import { CapturedPokemonsService } from '../services/captured-pokemons.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window);

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  pokemonData: any;
  pokemonTitleColor: string = 'black';
  pokemonBackgroundColor: string = 'white';
  pokemonStatus: string = '';
  static pokemonAbilities: number = 0;

  constructor(
    private pokeAPIService: PokeAPIService,
    private photoService: PhotoService,
    private capturedPokemonsService: CapturedPokemonsService
  ) {}

  ngOnInit() {
    this.loadRandomPokemon();
  }

  public loadRandomPokemon() {
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

    if (tab2AbilitiesCount === tab1AbilitiesCount) {
      this.setPokemonStatus('yellow', 'Empate', 'black');
      result = 'Empate';
    } else if (tab2AbilitiesCount > tab1AbilitiesCount) {
      this.setPokemonStatus('green', 'Ganhou', 'white');
      result = 'Ganhou';
    } else {
      this.setPokemonStatus('red', 'Perdeu', 'white');
      result = 'Perdeu';
    }

    this.updateCapturedPokemonResult(result);
  }

  private setPokemonStatus(backgroundColor: string, status: string, textColor: string) {
    this.pokemonBackgroundColor = backgroundColor;
    this.pokemonTitleColor = textColor;
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

  public addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  static getAbilitiesCount(): number {
    return Tab2Page.pokemonAbilities;
  }
}
