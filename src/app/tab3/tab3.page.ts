import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/pokeapi.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  pokemon: any = {};
  capturedPokemons: any[] = [];

  constructor(private pokeAPIService: PokeAPIService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokeAPIService.getPokeAPIService().subscribe((value: any) => {
      const newPokemon = {
        name: value.name,
        front_default: value.sprites.front_default,
        abilities: value.abilities.length,
        height: value.height,
        weight: value.weight,
        victories: 12,
        defeats: 4,
        draws: 3,
      };

      this.capturedPokemons.push(newPokemon);
    });
  }

  captureAnotherPokemon() {
    this.loadPokemon();
  }
}
