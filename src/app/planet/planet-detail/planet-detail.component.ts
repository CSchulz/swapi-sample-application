import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PlanetDetailItem } from '../model';
import { PlanetApiService } from '../planet-api.service';
import {AsyncPipe, Location, NgIf} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "@angular/material/card";
import {MatList, MatListItem, MatListModule} from "@angular/material/list";

@Component({
  standalone: true,
  selector: 'app-planet-detail',
  styleUrls: ['./planet-detail.component.scss'],
  templateUrl: 'planet-detail.component.html',
  imports: [
    MatCardModule,
    MatListModule,
    NgIf,
    AsyncPipe,
  ]
})
export class PlanetDetailComponent {
  public planet$: Observable<PlanetDetailItem>;

  protected location = inject(Location);

  private planetApiService = inject(PlanetApiService);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.planet$ = this.route.params.pipe(
      switchMap((params) => {
        return this.planetApiService.getItem(+params['uid']);
      })
    );
  }
}
