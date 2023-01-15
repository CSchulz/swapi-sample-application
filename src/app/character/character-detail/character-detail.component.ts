import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CharacterDetailItem} from '../model';
import {CharacterApiService} from "../character-api.service";

@Component({
  selector: 'app-character-detail',
  styleUrls: ['./character-detail.component.scss'],
  templateUrl: 'character-detail.component.html'
})
export class CharacterDetailComponent {
  public character$: Observable<CharacterDetailItem>;

  private characterApiService = inject(CharacterApiService);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.character$ = this.route.params.pipe(switchMap(params => {
      return this.characterApiService.getCharacter(+params['uid']);
    }));
  }
}
