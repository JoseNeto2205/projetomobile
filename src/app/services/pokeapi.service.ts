import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokeAPIService {
  constructor(private httpClient: HttpClient) {}

  getPokeAPIService() {
    const randomPokemonId = Math.floor(Math.random() * 100) + 1;
    return this.httpClient.get(
      `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`
    );
  }

  // Método para obter o número de habilidades de um Pokémon
  getAbilitiesCount(pokemon: any): number {
    return pokemon.abilities.length;
  }

  // Método para obter a altura de um Pokémon
  getPokemonHeight(pokemon: any): number {
    return pokemon.height;
  }

  // Método para obter o peso de um Pokémon
  getPokemonWeight(pokemon: any): number {
    return pokemon.weight;
  }
}
