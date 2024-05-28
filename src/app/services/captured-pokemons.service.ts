import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CapturedPokemonsService {
  private capturedPokemons: any[] = [];

  addPokemon(pokemon: any) {
    this.capturedPokemons.push(pokemon);
  }

  getPokemons() {
    return this.capturedPokemons;
  }
}
