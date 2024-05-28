import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/pokeapi.service';
import { CapturedPokemonsService } from '../services/captured-pokemons.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  capturedPokemons: any[] = [];
  pokemon: any = {
    name: '',
    abilities: [],
    height: 0,
    weight: 0,
    front_default: '',
  };

  constructor(
    private pokeAPIService: PokeAPIService,
    private capturedPokemonsService: CapturedPokemonsService
  ) {}

  ngOnInit() {
    this.loadCapturedPokemons();
  }

  loadCapturedPokemons() {
    this.capturedPokemons = this.capturedPokemonsService.getPokemons();
  }

  loadPokemon() {
    this.pokeAPIService.getPokeAPIService().subscribe((value: any) => {
      this.pokemon.name = value.name;
      this.pokemon.abilities = value.abilities;
      this.pokemon.height = value.height;
      this.pokemon.weight = value.weight;
      this.pokemon.front_default = JSON.parse(
        JSON.stringify(value)
      ).sprites.front_default;
    });
  }
}
