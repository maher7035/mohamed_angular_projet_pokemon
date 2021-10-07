import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDetailsComponent } from './pokemon/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';



const routes: Routes = [
  {path: 'pokemons', component: PokemonListComponent},
  {path: 'pokeDetail/:name', component: PokemonDetailsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'pokemons' },
  {path: '**', pathMatch: 'full', redirectTo: 'pokemons'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
