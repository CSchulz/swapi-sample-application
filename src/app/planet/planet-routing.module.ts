import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlanetComponent} from './planet.component';
import {PlanetListComponent} from "./planet-list/planet-list.component";
import {PlanetDetailComponent} from "./planet-detail/planet-detail.component";

export const routes: Routes = [
  {
    path: '',
    component: PlanetComponent,
    children: [
      {
        path: '',
        component: PlanetListComponent
      },
      {
        path: ':uid',
        component: PlanetDetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetRoutingModule {}
