import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getPokemons(){
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=150&offset=0`);
  }
  async getPokemonByName(name: string){
    return await this.http.get<any>(`${this.baseUrl}/pokemon/${name}`).toPromise();
  }
  async getPokemonByForm(url: string){
    return await this.http.get<any>(url).toPromise();
  }
  async  getPokemonEvolutionById(id: string){
    return await this.http.get<any>(`${this.baseUrl}/evolution-chain/${id}/`).toPromise();
  }
}
