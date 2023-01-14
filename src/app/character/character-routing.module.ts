import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharacterComponent} from './character.component';
import {CharacterListComponent} from "./character-list/character-list.component";
import {CharacterDetailComponent} from "./character-detail/character-detail.component";

export const routes: Routes = [
  {
    path: '',
    component: CharacterComponent,
    children: [
      {
        path: '',
        component: CharacterListComponent
      },
      {
        path: ':uid',
        component: CharacterDetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule {}
