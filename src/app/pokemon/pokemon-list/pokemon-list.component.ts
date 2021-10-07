import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  data : any = [];
  displayedColumns: string[] = ['image','name'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private pokemonService: PokemonService,private router: Router) { }

   ngOnInit() {
   this.initPokemons();
  }

  private async initPokemons(){
    this.pokemonService.getPokemons().subscribe( async listPokemon => {
      for (let i = 0; i < listPokemon.results.length; i++) {
      const poke =  await this.pokemonService.getPokemonByName(listPokemon.results[i].name);
        const pokemonData = {
           image: poke.sprites.front_default,
           name: poke.name
         };
         this.data.push(pokemonData);
     }
       this.dataSource.data = this.data;
       this.dataSource.paginator = this.paginator;
     });
  }

  getPokemon(element: any){
    this.router.navigateByUrl(`/pokeDetail/${element.name}`);
  }

}
