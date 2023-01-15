import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {PlanetDetailItem} from '../model';
import {PlanetApiService} from "../planet-api.service";

@Component({
  selector: 'app-planet-detail',
  styleUrls: ['./planet-detail.component.scss'],
  templateUrl: 'planet-detail.component.html'
})
export class PlanetDetailComponent {
  public planet$: Observable<PlanetDetailItem>;

  private planetApiService = inject(PlanetApiService);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.planet$ = this.route.params.pipe(switchMap(params => {
      return this.planetApiService.getItem(+params['uid']);
    }));
  }
}
