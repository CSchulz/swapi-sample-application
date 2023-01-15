import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CharacterDetailItem} from '../model';
import {CharacterApiService} from "../character-api.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-character-detail',
  styleUrls: ['./character-detail.component.scss'],
  templateUrl: 'character-detail.component.html'
})
export class CharacterDetailComponent {
  public character$: Observable<CharacterDetailItem>;

  protected location = inject(Location);

  private characterApiService = inject(CharacterApiService);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.character$ = this.route.params.pipe(switchMap(params => {
      return this.characterApiService.getItem(+params['uid']);
    }));
  }
}
