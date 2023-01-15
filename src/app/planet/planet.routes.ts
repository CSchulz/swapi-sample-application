import {Routes} from '@angular/router';
import {PlanetComponent} from './planet.component';
import {PlanetListComponent} from './planet-list/planet-list.component';
import {PlanetDetailComponent} from './planet-detail/planet-detail.component';

export const PLANET_ROUTES: Routes = [
  {
    path: '',
    component: PlanetComponent,
    children: [
      {
        path: '',
        component: PlanetListComponent,
      },
      {
        path: ':uid',
        component: PlanetDetailComponent,
      },
    ],
  },
];
