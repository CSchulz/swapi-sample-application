import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CharacterDetailItem } from '../model';
import { CharacterApiService } from '../character-api.service';
import { Location } from '@angular/common';
import { PlanetListItem } from '../../planet/model';

@Component({
  selector: 'app-character-detail',
  styleUrls: ['./character-detail.component.scss'],
  templateUrl: 'character-detail.component.html',
})
export class CharacterDetailComponent {
  protected character$: Observable<CharacterDetailItem>;
  protected planet: PlanetListItem | undefined;

  protected location = inject(Location);

  private characterApiService = inject(CharacterApiService);
  constructor(private router: Router, private route: ActivatedRoute) {
    this.character$ = this.route.params.pipe(
      switchMap((params) => {
        return this.characterApiService.getItem(+params['uid']);
      }),
      tap((item) => {
        if (item?.properties?.homeworld) {
          const elements = item.properties.homeworld.split('/');
          const planetID = elements[elements.length - 1];

          if (planetID) {
            const planets: PlanetListItem[] =
              this.route.snapshot.data['planets'];
            this.planet = planets.find((planet) => planet.uid === planetID);
          }
        }

        return 'unknown';
      })
    );
  }
}
