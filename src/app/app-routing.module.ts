import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./character/character.module').then((m) => m.CharacterModule),
  },
  {
    path: 'planets',
    loadChildren: () =>
      import('./planet/planet.routes').then((m) => m.PLANET_ROUTES),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
