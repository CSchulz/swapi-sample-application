import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {PlanetDetailItem} from '../model';
import {PlanetApiService} from "../planet-api.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-planet-detail',
  styleUrls: ['./planet-detail.component.scss'],
  templateUrl: 'planet-detail.component.html'
})
export class PlanetDetailComponent {
  public planet$: Observable<PlanetDetailItem>;

  protected location = inject(Location);

  private planetApiService = inject(PlanetApiService);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.planet$ = this.route.params.pipe(switchMap(params => {
      return this.planetApiService.getItem(+params['uid']);
    }));
  }
}
