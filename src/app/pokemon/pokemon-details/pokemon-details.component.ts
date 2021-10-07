import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  urlImg : string = '' 
  pokemonType: string = '';
  pokemonName: string = '';
  pokemonEvolutionName: any[] = [];
  evoChain:any = [];
  evoData: any= null;
  

  constructor(private activatedRouter: ActivatedRoute, private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      async params => {
       await this.getPokemonByName(params['name']);
      }
    )
  }

  getPokemonEvolution(chaine: any){
    if(chaine[0] && chaine[0].evolves_to[0]){
      this.getPokemonEvolution(chaine[0].evolves_to[0])
     }
     else{
     return chaine[0].species.name;
     }
   }

private async getPokemonByName(name: string){
 const pokemonDetails = await this.pokemonService.getPokemonByName(name);
 this.pokemonName = name;
 this.urlImg = pokemonDetails.sprites.front_default;
 this.pokemonType = pokemonDetails.types[0].type.name;
 const pokemonEvolution = await this.pokemonService.getPokemonEvolutionById(pokemonDetails.order);
 this.pokemonEvolutionName = this.getEvolution(pokemonEvolution);

}

private getEvolution(pokemonEvolution: any){
 let evoChain = [];
 let evoData = pokemonEvolution.chain;

  do {
  let numberOfEvolutions = evoData['evolves_to'].length;  
  evoChain.push({
    name: evoData.species.name
  });

  if(numberOfEvolutions > 1) {
    for (let i = 1;i < numberOfEvolutions; i++) { 
      evoChain.push({
        name: evoData.evolves_to[i].species.name
     });
    }
  }        

  evoData = evoData['evolves_to'][0];
} while (evoData != undefined && evoData.hasOwnProperty('evolves_to'));

return evoChain;
 
}

goToPokemonEvolution(name:string){
  this.router.navigateByUrl(`/pokeDetail/${name}`);
}

}
