import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { PlanetApiService } from '../planet/planet-api.service';

export const routes: Routes = [
  {
    path: '',
    component: CharacterComponent,
    children: [
      {
        path: '',
        component: CharacterListComponent,
      },
      {
        path: ':uid',
        component: CharacterDetailComponent,
        resolve: {
          // enforce hot service
          planets: () => inject(PlanetApiService).getItemList(),
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterRoutingModule {}
